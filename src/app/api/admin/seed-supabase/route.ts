import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export async function POST() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error: 'Supabase credentials are not configured in .env.local yet. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
      },
      { status: 400 }
    );
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ success: false, error: 'Could not initialize Supabase client.' }, { status: 500 });
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const rawProducts = JSON.parse(fileData);

    const formattedProducts = rawProducts.map((p: any) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      sku: p.id.toUpperCase(),
      description: p.description || '',
      specs: p.longDescription || '',
      original_price: p.originalPrice || null,
      discount_price: p.price || 0,
      material: p.material || '100% Virgin Grade Polymer',
      finish: 'Smooth Hygienic Gloss',
      dimensions: p.dimensions || '',
      warranty: '1 Year Vadodara Plant Warranty',
      features: p.features || [],
      images: p.image ? [p.image, ...(p.gallery || [])] : [],
      in_stock: p.inStock ?? true,
      rating: p.rating || 4.8,
      reviews_count: p.reviewsCount || 50,
      featured: Boolean(p.featured),
    }));

    // Upsert products in chunks of 50 to avoid payload limits
    const chunkSize = 50;
    let insertedCount = 0;

    for (let i = 0; i < formattedProducts.length; i += chunkSize) {
      const chunk = formattedProducts.slice(i, i + chunkSize);
      const { error } = await supabase.from('products').upsert(chunk, { onConflict: 'id' });
      if (error) {
        return NextResponse.json(
          {
            success: false,
            error: `Failed to insert batch ${i} - ${i + chunk.length}: ${error.message}`,
          },
          { status: 500 }
        );
      }
      insertedCount += chunk.length;
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${insertedCount} products into Supabase products table!`,
      total: insertedCount,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
