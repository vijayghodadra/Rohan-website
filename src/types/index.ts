export interface Product {
  id: string;
  name: string;
  category: 'Bathroom Products' | 'Household Products' | 'Cleaning Products';
  categorySlug: 'bathroom' | 'household' | 'cleaning';
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  longDescription?: string;
  badge?: 'Bestseller' | 'New' | 'Popular' | 'Eco Choice';
  rating: number;
  reviewsCount: number;
  colors: string[];
  capacity?: string;
  material: string;
  dimensions?: string;
  features: string[];
  inStock: boolean;
  minOrderB2B?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Director {
  name: string;
  title: string;
  role: string;
  bio: string;
  image?: string;
  highlights: string[];
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

