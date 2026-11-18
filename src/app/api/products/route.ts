import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '@/data/products';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { getDbPool } from '@/lib/supabase/db';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

function readLocalProducts(): Product[] {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading products.json:', err);
  }
  return DEFAULT_PRODUCTS;
}

function writeLocalProducts(products: Product[]): boolean {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing products.json:', err);
    return false;
  }
}

function getCategorySlug(categoryName: string): 'bathroom' | 'household' | 'cleaning' {
  const lower = (categoryName || '').toLowerCase();
  if (lower.includes('bath')) return 'bathroom';
  if (lower.includes('clean') || lower.includes('wiper') || lower.includes('broom')) return 'cleaning';
  return 'household';
}

function getCategoryDisplay(categoryName: string): 'Bathroom Products' | 'Household Products' | 'Cleaning Products' {
  const lower = (categoryName || '').toLowerCase();
  if (lower.includes('bath')) return 'Bathroom Products';
  if (lower.includes('clean') || lower.includes('wiper') || lower.includes('broom')) return 'Cleaning Products';
  return 'Household Products';
}

function mapRowToProduct(row: any): Product {
  const price = Number(row.discount_price) || 0;
  const originalPrice = row.original_price ? Number(row.original_price) : Math.round(price * 1.3);

  return {
    id: row.id,
    name: row.name,
    category: getCategoryDisplay(row.category),
    categorySlug: getCategorySlug(row.category),
    price,
    originalPrice,
    image: Array.isArray(row.images) && row.images.length > 0 ? row.images[0] : '/catalog/basin-01.png',
    gallery: Array.isArray(row.images) ? row.images.slice(1) : [],
    description: row.description || '',
    longDescription: row.specs || '',
    rating: Number(row.rating) || 4.8,
    reviewsCount: row.reviews_count || 50,
    colors: ['#EC4899', '#F9FAFB', '#2563EB', '#10B981', '#F59E0B'],
    capacity: 'Standard Capacity',
    material: row.material || '100% Virgin Grade Polymer',
    dimensions: row.dimensions || 'Standard',
    features: Array.isArray(row.features) ? row.features : [],
    inStock: Boolean(row.in_stock),
    minOrderB2B: 60,
  };
}

// GET all products (PostgreSQL -> Supabase REST -> Local File)
export async function GET() {
  // 1. Try Direct PostgreSQL Connection
  const pool = getDbPool();
  if (pool) {
    try {
      const res = await pool.query('SELECT * FROM public.products ORDER BY created_at DESC');
      if (res.rows && res.rows.length > 0) {
        const mapped = res.rows.map(mapRowToProduct);
        return NextResponse.json({
          success: true,
          source: 'supabase-postgresql',
          count: mapped.length,
          products: mapped,
        });
      }
    } catch (err) {
      console.warn('Direct PostgreSQL query error, trying fallback:', err);
    }
  }

  // 2. Try Supabase REST Client
  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map(mapRowToProduct);
          return NextResponse.json({
            success: true,
            source: 'supabase-rest',
            count: mapped.length,
            products: mapped,
          });
        }
      }
    } catch (err) {
      console.warn('Supabase REST query failed, falling back to local file:', err);
    }
  }

  // 3. Fallback to local json file
  const products = readLocalProducts();
  return NextResponse.json({
    success: true,
    source: 'local-file',
    count: products.length,
    products,
  });
}

// POST create new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Product name and category are required' },
        { status: 400 }
      );
    }

    const products = readLocalProducts();
    const id = body.id || `roshan-custom-${Date.now()}`;

    if (products.some((p) => p.id === id)) {
      return NextResponse.json(
        { success: false, error: 'A product with this ID already exists' },
        { status: 409 }
      );
    }

    const price = Number(body.price) || 0;
    const originalPrice = body.originalPrice ? Number(body.originalPrice) : Math.round(price * 1.3);

    const newProduct: Product = {
      id,
      name: body.name,
      category: getCategoryDisplay(body.category),
      categorySlug: getCategorySlug(body.categorySlug || body.category),
      price,
      originalPrice,
      image: body.image || '/catalog/basin-01.png',
      gallery: body.gallery || [],
      description: body.description || '',
      longDescription: body.longDescription || '',
      rating: Number(body.rating) || 4.8,
      reviewsCount: Number(body.reviewsCount) || 1,
      colors: body.colors || ['#2563EB', '#10B981', '#F59E0B'],
      capacity: body.capacity || 'Standard',
      material: body.material || '100% Virgin Grade Polymer',
      dimensions: body.dimensions || 'Standard',
      features: body.features || ['100% Virgin Grade Polymer', 'High stress-crack resistance'],
      inStock: body.inStock !== false,
      minOrderB2B: Number(body.minOrderB2B) || 60,
    };

    // If PostgreSQL pool available, insert to PostgreSQL
    const pool = getDbPool();
    if (pool) {
      try {
        await pool.query(
          `INSERT INTO public.products (
            id, name, category, sku, description, specs,
            original_price, discount_price, material, dimensions,
            images, features, in_stock, rating, reviews_count
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            discount_price = EXCLUDED.discount_price,
            in_stock = EXCLUDED.in_stock,
            updated_at = NOW();`,
          [
            newProduct.id,
            newProduct.name,
            newProduct.category,
            newProduct.id.toUpperCase(),
            newProduct.description,
            newProduct.longDescription,
            newProduct.originalPrice || null,
            newProduct.price,
            newProduct.material,
            newProduct.dimensions,
            JSON.stringify([newProduct.image, ...newProduct.gallery]),
            JSON.stringify(newProduct.features),
            newProduct.inStock,
            newProduct.rating,
            newProduct.reviewsCount,
          ]
        );
      } catch (err) {
        console.warn('Failed to insert product into PostgreSQL:', err);
      }
    }

    products.unshift(newProduct);
    writeLocalProducts(products);

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
