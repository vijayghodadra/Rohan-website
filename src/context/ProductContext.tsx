'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';
import { PRODUCTS as FALLBACK_PRODUCTS } from '@/data/products';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  addProduct: (newProduct: Partial<Product>) => Promise<{ success: boolean; error?: string; product?: Product }>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<{ success: boolean; error?: string; product?: Product }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; error?: string }>;
  toggleStock: (id: string) => Promise<{ success: boolean; error?: string }>;
  resetToDefault: () => Promise<{ success: boolean; error?: string }>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from server API
  const refreshProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
        try {
          localStorage.setItem('roshan_products_cache', JSON.stringify(data.products));
        } catch (_) {}
      }
    } catch (err: any) {
      console.warn('Could not sync with server /api/products, using local cache:', err.message);
      // Fallback to localStorage if available
      try {
        const cached = localStorage.getItem('roshan_products_cache');
        if (cached) {
          setProducts(JSON.parse(cached));
        }
      } catch (_) {}
    } finally {
      setLoading(false);
    }
  }, []);

  // On mount, load from cache and refresh in background
  useEffect(() => {
    try {
      const cached = localStorage.getItem('roshan_products_cache');
      if (cached) {
        setProducts(JSON.parse(cached));
      }
    } catch (_) {}
    refreshProducts();
  }, [refreshProducts]);

  // Add a new product
  const addProduct = async (newProductData: Partial<Product>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProductData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to add product' };
      }
      setProducts((prev) => [data.product, ...prev]);
      try {
        localStorage.setItem('roshan_products_cache', JSON.stringify([data.product, ...products]));
      } catch (_) {}
      return { success: true, product: data.product };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  // Update a product
  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to update product' };
      }
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data.product } : p))
      );
      return { success: true, product: data.product };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  // Delete a product
  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to delete product' };
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  // Toggle stock status
  const toggleStock = async (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return { success: false, error: 'Product not found' };
    return updateProduct(id, { inStock: !target.inStock });
  };

  // Reset to factory defaults
  const resetToDefault = async () => {
    try {
      const res = await fetch('/api/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to reset catalog' };
      }
      setProducts(data.products || FALLBACK_PRODUCTS);
      try {
        localStorage.removeItem('roshan_products_cache');
      } catch (_) {}
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        resetToDefault,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductStore() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductStore must be used within a ProductProvider');
  }
  return context;
}
