export interface Product {
  id: string;
  name: string;
  category: 'Bathroom Products' | 'Household Products' | 'Cleaning Products';
  categorySlug: 'bathroom' | 'household' | 'cleaning';
  price: number;
  originalPrice: number;
  image: string;
  gallery?: string[];
  description: string;
  longDescription?: string;
  badge?: 'Bestseller' | 'New' | 'Popular' | 'Eco Choice' | 'CSD Listed' | 'Featured';
  rating: number;
  reviewsCount: number;
  colors: string[];
  capacity?: string;
  material: string;
  dimensions?: string;
  features: string[];
  inStock: boolean;
  minOrderB2B?: number;
  notes?: string;
  csdStatus?: string;
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

