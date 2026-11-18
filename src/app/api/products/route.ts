import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '@/data/products';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/client';

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

// GET all products (Supabase with automatic local fallback)
export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped: Product[] = data.map((row: any) => ({
            id: row.id,
            name: row.name,
            category: row.category,
            categorySlug: row.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            price: Number(row.discount_price),
            originalPrice: row.original_price ? Number(row.original_price) : undefined,
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
          }));

          return NextResponse.json({
            success: true,
            source: 'supabase',
            count: mapped.length,
            products: mapped,
          });
        }
      }
    } catch (err) {
      console.warn('Supabase query failed, falling back to local file:', err);
    }
  }

  // Fallback to local json file
  const products = readLocalProducts();
  return NextResponse.json({
    success: true,
    source: 'local',
    count: products.length,
    products,
  });
}

// POST create new product (Writes to both Supabase and local file)
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

    const newProduct: Product = {
      id,
      name: body.name,
      category: body.category,
      categorySlug: body.categorySlug || body.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: Number(body.price) || 0,
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
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

    // If Supabase is configured, insert to Supabase too
    if (isSupabaseConfigured()) {
      try {
        const supabase = createServerSupabaseClient();
        if (supabase) {
          await supabase.from('products').insert({
            id: newProduct.id,
            name: newProduct.name,
            category: newProduct.category,
            sku: newProduct.id.toUpperCase(),
            description: newProduct.description,
            specs: newProduct.longDescription,
            original_price: newProduct.originalPrice || null,
            discount_price: newProduct.price,
            material: newProduct.material,
            dimensions: newProduct.dimensions,
            images: [newProduct.image, ...newProduct.gallery],
            features: newProduct.features,
            in_stock: newProduct.inStock,
            rating: newProduct.rating,
            reviews_count: newProduct.reviewsCount,
          });
        }
      } catch (err) {
        console.warn('Failed to insert product into Supabase:', err);
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
