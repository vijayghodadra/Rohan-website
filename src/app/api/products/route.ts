import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '@/data/products';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

function readProducts(): Product[] {
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

function writeProducts(products: Product[]): boolean {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing products.json:', err);
    return false;
  }
}

// GET all products
export async function GET() {
  const products = readProducts();
  return NextResponse.json({
    success: true,
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

    const products = readProducts();
    const id = body.id || `roshan-custom-${Date.now()}`;

    // Check if ID already exists
    if (products.some((p) => p.id === id)) {
      return NextResponse.json(
        { success: false, error: 'A product with this ID already exists' },
        { status: 409 }
      );
    }

    const newProduct: Product = {
      id,
      name: body.name.trim(),
      category: body.category,
      categorySlug: body.categorySlug || (body.category === 'Bathroom Products' ? 'bathroom' : body.category === 'Cleaning Products' ? 'cleaning' : 'household'),
      price: Number(body.price) || 199,
      originalPrice: Number(body.originalPrice) || Number(body.price) || 299,
      image: body.image || '/catalog/basin-01.png',
      gallery: body.gallery || [],
      description: body.description || '',
      longDescription: body.longDescription || body.description || '',
      badge: body.badge || undefined,
      rating: Number(body.rating) || 4.8,
      reviewsCount: Number(body.reviewsCount) || 100,
      colors: Array.isArray(body.colors) && body.colors.length > 0 ? body.colors : ['#EC4899', '#F9FAFB', '#2563EB', '#10B981', '#F59E0B'],
      capacity: body.capacity || '',
      material: body.material || '100% Virgin Grade Polymer (BPA Free)',
      dimensions: body.dimensions || '',
      features: Array.isArray(body.features) ? body.features : ['100% Virgin Grade Polymer', 'High durability'],
      inStock: body.inStock !== false,
      minOrderB2B: Number(body.minOrderB2B) || 50,
      notes: body.notes || undefined,
      csdStatus: body.csdStatus || undefined,
    };

    products.unshift(newProduct);
    writeProducts(products);

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: newProduct,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update existing product
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required for update' },
        { status: 400 }
      );
    }

    const products = readProducts();
    const index = products.findIndex((p) => p.id === body.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const existing = products[index];
    const updatedProduct: Product = {
      ...existing,
      ...body,
      price: Number(body.price) !== undefined ? Number(body.price) : existing.price,
      originalPrice: Number(body.originalPrice) !== undefined ? Number(body.originalPrice) : existing.originalPrice,
      rating: Number(body.rating) !== undefined ? Number(body.rating) : existing.rating,
      reviewsCount: Number(body.reviewsCount) !== undefined ? Number(body.reviewsCount) : existing.reviewsCount,
      minOrderB2B: Number(body.minOrderB2B) !== undefined ? Number(body.minOrderB2B) : existing.minOrderB2B,
      inStock: body.inStock !== undefined ? Boolean(body.inStock) : existing.inStock,
    };

    products[index] = updatedProduct;
    writeProducts(products);

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE a product
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const products = readProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const removed = products.splice(index, 1)[0];
    writeProducts(products);

    return NextResponse.json({
      success: true,
      message: `Product ${removed.name} deleted successfully`,
      deletedId: id,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH for resetting catalog or bulk actions
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.action === 'reset') {
      writeProducts(DEFAULT_PRODUCTS);
      return NextResponse.json({
        success: true,
        message: 'Product catalog reset to default factory specifications',
        count: DEFAULT_PRODUCTS.length,
        products: DEFAULT_PRODUCTS,
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
