'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProductStore } from '@/context/ProductContext';
import { Product } from '@/types';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Copy,
  Check,
  X,
  RefreshCw,
  Download,
  ExternalLink,
  Layers,
  ArrowUpDown,
  SlidersHorizontal,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Eye,
  AlertTriangle,
  LayoutGrid,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from 'lucide-react';

const CATALOG_IMAGES = [
  '/catalog/basin-01.png', '/catalog/basin-02.png', '/catalog/basin-03.png', '/catalog/basin-04.png', '/catalog/basin-05.png',
  '/catalog/bathroom-dustbin-01.png', '/catalog/bathroom-dustbin-02.png', '/catalog/bathroom-dustbin-03.png', '/catalog/bathroom-dustbin-04.png',
  '/catalog/broom-01.png', '/catalog/broom-02.png', '/catalog/broom-03.png', '/catalog/broom-04.png', '/catalog/broom-05.png',
  '/catalog/bucket-dual-bucket-01.png', '/catalog/bucket-dual-bucket-02.png', '/catalog/bucket-dual-bucket-03.png', '/catalog/bucket-dual-bucket-04.png',
  '/catalog/bucket-frosty-buckets-01.png', '/catalog/bucket-frosty-buckets-02.png', '/catalog/bucket-frosty-buckets-03.png', '/catalog/bucket-frosty-buckets-04.png', '/catalog/bucket-frosty-buckets-05.png',
  '/catalog/cloth-clip-01.png', '/catalog/cloth-clip-02.png',
  '/catalog/dustbin-01.png', '/catalog/dustbin-02.png', '/catalog/dustbin-03.png',
  '/catalog/dustpan-01.png', '/catalog/dustpan-02.png', '/catalog/dustpan-03.png',
  '/catalog/hanger-01.png', '/catalog/hanger-02.png', '/catalog/hanger-03.png',
  '/catalog/laundry-basket-01.png', '/catalog/laundry-basket-02.png', '/catalog/laundry-basket-03.png',
  '/catalog/mug-deluxe-01.png', '/catalog/mug-deluxe-02.png', '/catalog/mug-deluxe-03.png',
  '/catalog/mug-regular-01.png', '/catalog/mug-regular-02.png', '/catalog/mug-regular-03.png',
  '/catalog/planter-rectangle-01.png', '/catalog/planter-round-01.png', '/catalog/planter-round-premium-01.png', '/catalog/planter-square-01.png',
  '/catalog/rope-01.png', '/catalog/rope-02.png',
  '/catalog/soap-case-deluxe-01.png', '/catalog/soap-case-deluxe-02.png',
  '/catalog/soap-case-regular-01.png', '/catalog/soap-case-regular-02.png',
  '/catalog/soap-tray-01.png', '/catalog/soap-tray-02.png',
  '/catalog/stool-bathroom-stool-01.png', '/catalog/stool-bathroom-stool-02.png',
  '/catalog/stool-patla-01.png', '/catalog/stool-patla-02.png',
  '/catalog/toothbrush-holder-01.png', '/catalog/toothbrush-holder-02.png',
  '/catalog/wiper-01.png', '/catalog/wiper-02.png'
];

const PRESET_COLORS = [
  '#EC4899', '#F9FAFB', '#2563EB', '#10B981', '#F59E0B',
  '#7C1620', '#B8903F', '#1F2937', '#06B6D4', '#8B5CF6'
];

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct, toggleStock, resetToDefault } = useProductStore();

  // Filters & Search
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bathroom' | 'household' | 'cleaning'>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outOfStock' | 'csd'>('all');
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'price-low' | 'price-high' | 'id'>('id');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 15;

  // Modals
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3500);
  };

  // Metrics
  const metrics = useMemo(() => {
    const total = products.length;
    const bathroom = products.filter((p) => p.categorySlug === 'bathroom').length;
    const household = products.filter((p) => p.categorySlug === 'household').length;
    const cleaning = products.filter((p) => p.categorySlug === 'cleaning').length;
    const inStock = products.filter((p) => p.inStock).length;
    const csdCount = products.filter((p) => p.csdStatus || p.badge === 'CSD Listed' || (p.notes && p.notes.includes('CSD'))).length;
    const avgPrice = total > 0 ? Math.round(products.reduce((acc, p) => acc + p.price, 0) / total) : 0;
    return { total, bathroom, household, cleaning, inStock, csdCount, avgPrice };
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) return false;
        if (stockFilter === 'inStock' && !p.inStock) return false;
        if (stockFilter === 'outOfStock' && p.inStock) return false;
        if (stockFilter === 'csd' && !p.csdStatus && p.badge !== 'CSD Listed' && (!p.notes || !p.notes.includes('CSD'))) return false;
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchId = p.id.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchNotes = p.notes ? p.notes.toLowerCase().includes(q) : false;
          const matchCap = p.capacity ? p.capacity.toLowerCase().includes(q) : false;
          if (!matchName && !matchId && !matchCat && !matchNotes && !matchCap) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return a.id.localeCompare(b.id);
      });
  }, [products, selectedCategory, stockFilter, search, sortBy]);

  // Paginated Slice
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, page, pageSize]);

  // Form Handlers
  const handleOpenCreate = () => {
    const nextNum = products.length + 1;
    setEditingProduct({
      id: `roshan-item-${nextNum}`,
      name: '',
      category: 'Bathroom Products',
      categorySlug: 'bathroom',
      price: 299,
      originalPrice: 399,
      image: '/catalog/basin-01.png',
      capacity: 'Standard Capacity',
      material: '100% Virgin Grade Polypropylene',
      dimensions: '30 x 30 x 30 cm',
      badge: undefined,
      csdStatus: '',
      notes: '',
      description: 'Engineered with 100% virgin-grade polymer for durable everyday usage.',
      longDescription: 'Manufactured at our Vadodara injection moulding facility with high stress-crack resistance and smooth hygienic finish.',
      features: ['100% Virgin Grade Polymer', 'High impact strength', 'Ergonomic comfortable design'],
      colors: ['#EC4899', '#F9FAFB', '#2563EB', '#10B981', '#F59E0B'],
      inStock: true,
      minOrderB2B: 60,
    });
    setIsCreating(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsCreating(false);
  };

  const handleDuplicate = async (product: Product) => {
    const duplicateData: Partial<Product> = {
      ...product,
      id: `${product.id}-copy-${Date.now().toString().slice(-4)}`,
      name: `${product.name} (Copy)`,
    };
    const res = await addProduct(duplicateData);
    if (res.success) {
      showToast(`Duplicated "${product.name}" successfully`, 'success');
    } else {
      showToast(res.error || 'Failed to duplicate product', 'error');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name || !editingProduct.id) {
      showToast('Please provide product ID and Name', 'error');
      return;
    }

    if (isCreating) {
      const res = await addProduct(editingProduct);
      if (res.success) {
        showToast(`Created "${editingProduct.name}" successfully`, 'success');
        setEditingProduct(null);
      } else {
        showToast(res.error || 'Failed to create product', 'error');
      }
    } else {
      const res = await updateProduct(editingProduct.id, editingProduct);
      if (res.success) {
        showToast(`Updated "${editingProduct.name}" successfully`, 'success');
        setEditingProduct(null);
      } else {
        showToast(res.error || 'Failed to update product', 'error');
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    const target = products.find((p) => p.id === deletingId);
    const res = await deleteProduct(deletingId);
    if (res.success) {
      showToast(`Deleted ${target?.name || 'product'} successfully`, 'success');
      setDeletingId(null);
    } else {
      showToast(res.error || 'Failed to delete product', 'error');
    }
  };

  const handleResetCatalog = async () => {
    const res = await resetToDefault();
    if (res.success) {
      showToast('Catalog restored to default 134 products', 'success');
      setIsResetConfirmOpen(false);
    } else {
      showToast(res.error || 'Failed to reset catalog', 'error');
    }
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(products, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roshan-products-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Catalog JSON exported successfully', 'info');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#F7F5F0] text-roshan-obsidian">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-center gap-3 transition-all animate-in slide-in-from-bottom-5 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100'
              : toast.type === 'error'
              ? 'bg-rose-950/90 border-rose-500/50 text-rose-100'
              : 'bg-stone-900/90 border-stone-500/50 text-stone-100'
          }`}
        >
          {toast.type === 'success' && <Check className="w-5 h-5 text-emerald-400" />}
          {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
          {toast.type === 'info' && <Sparkles className="w-5 h-5 text-amber-400" />}
          <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-roshan-gold-champagne/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-roshan-gold-champagne/60 text-xs font-bold text-roshan-crimson uppercase tracking-wider mb-2 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-roshan-gold" />
              <span>Executive Admin Control</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-roshan-obsidian">
              Product Catalog Management
            </h1>
            <p className="text-xs sm:text-sm text-roshan-taupe mt-1">
              Add, modify, update pricing, manage stock, and maintain the live product catalog.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/products"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-white border border-roshan-gold-champagne/60 text-roshan-obsidian hover:border-roshan-crimson transition-all shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-roshan-gold" />
              <span>View Storefront</span>
            </Link>

            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-white border border-roshan-gold-champagne/60 text-roshan-obsidian hover:bg-stone-50 transition-all shadow-xs"
              title="Export complete catalog JSON"
            >
              <Download className="w-3.5 h-3.5 text-roshan-taupe" />
              <span>Export</span>
            </button>

            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 transition-all shadow-xs"
              title="Reset to factory catalog"
            >
              <RefreshCw className="w-3.5 h-3.5 text-rose-500" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-roshan-crimson via-roshan-crimson-light to-roshan-crimson shadow-liquid-crimson hover:shadow-lg transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 my-8">
          <div className="p-4 rounded-2xl bg-white border border-roshan-gold-champagne/50 shadow-xs">
            <div className="text-[11px] font-semibold text-roshan-taupe">Total Catalog</div>
            <div className="text-2xl font-bold font-serif text-roshan-obsidian mt-0.5">{metrics.total}</div>
            <div className="text-[10px] text-emerald-600 mt-1">Active items</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-roshan-gold-champagne/50 shadow-xs">
            <div className="text-[11px] font-semibold text-roshan-taupe">Bathroom Ware</div>
            <div className="text-2xl font-bold font-serif text-roshan-crimson mt-0.5">{metrics.bathroom}</div>
            <div className="text-[10px] text-roshan-taupe mt-1">Buckets, Mugs, Stools</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-roshan-gold-champagne/50 shadow-xs">
            <div className="text-[11px] font-semibold text-roshan-taupe">Household Essentials</div>
            <div className="text-2xl font-bold font-serif text-roshan-gold-deep mt-0.5">{metrics.household}</div>
            <div className="text-[10px] text-roshan-taupe mt-1">Baskets, Planters, Clips</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-roshan-gold-champagne/50 shadow-xs">
            <div className="text-[11px] font-semibold text-roshan-taupe">Cleaning Ranges</div>
            <div className="text-2xl font-bold font-serif text-blue-700 mt-0.5">{metrics.cleaning}</div>
            <div className="text-[10px] text-roshan-taupe mt-1">Brooms, Wipers, Pans</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-roshan-gold-champagne/50 shadow-xs">
            <div className="text-[11px] font-semibold text-roshan-taupe">CSD Defense Lines</div>
            <div className="text-2xl font-bold font-serif text-[#1E3A8A] mt-0.5">{metrics.csdCount}</div>
            <div className="text-[10px] text-blue-800 font-semibold mt-1">Armed Forces Listed</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-roshan-gold-champagne/50 shadow-xs">
            <div className="text-[11px] font-semibold text-roshan-taupe">In-Stock Rate</div>
            <div className="text-2xl font-bold font-serif text-emerald-700 mt-0.5">
              {metrics.total > 0 ? Math.round((metrics.inStock / metrics.total) * 100) : 0}%
            </div>
            <div className="text-[10px] text-emerald-600 mt-1">{metrics.inStock} Available</div>
          </div>
        </div>

        {/* Controls Toolbar: Search, Filters, Sorting, View Toggle */}
        <div className="p-4 rounded-2xl bg-white border border-roshan-gold-champagne/50 shadow-sm mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-roshan-taupe" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by title, ID, capacity, note..."
                className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 border border-roshan-gold-champagne/50 focus:outline-none focus:border-roshan-crimson focus:bg-white transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-roshan-taupe hover:text-roshan-obsidian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => { setSelectedCategory('all'); setPage(1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-roshan-crimson text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All ({products.length})
              </button>
              <button
                onClick={() => { setSelectedCategory('bathroom'); setPage(1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === 'bathroom'
                    ? 'bg-roshan-crimson text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Bathroom ({metrics.bathroom})
              </button>
              <button
                onClick={() => { setSelectedCategory('household'); setPage(1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === 'household'
                    ? 'bg-roshan-crimson text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Household ({metrics.household})
              </button>
              <button
                onClick={() => { setSelectedCategory('cleaning'); setPage(1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === 'cleaning'
                    ? 'bg-roshan-crimson text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Cleaning ({metrics.cleaning})
              </button>
            </div>

            {/* View Mode & Sort Dropdowns */}
            <div className="flex items-center gap-2 justify-end">
              <select
                value={stockFilter}
                onChange={(e) => { setStockFilter(e.target.value as any); setPage(1); }}
                className="text-xs font-medium rounded-xl bg-stone-50 px-3 py-2 border border-roshan-gold-champagne/50 text-roshan-obsidian focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="inStock">In Stock Only</option>
                <option value="outOfStock">Out of Stock</option>
                <option value="csd">CSD Listed Only</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-medium rounded-xl bg-stone-50 px-3 py-2 border border-roshan-gold-champagne/50 text-roshan-obsidian focus:outline-none"
              >
                <option value="id">Default Sort</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <div className="flex items-center rounded-xl bg-stone-100 p-1 border border-roshan-gold-champagne/40">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'table' ? 'bg-white shadow-xs text-roshan-crimson' : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="Table View"
                >
                  <TableIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-xs text-roshan-crimson' : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data View: Table or Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-roshan-gold-champagne/60 p-8 max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 text-roshan-taupe/40 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-roshan-obsidian">No products found</h3>
            <p className="text-xs text-roshan-taupe mt-1">Try resetting your search query or status filters.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('all'); setStockFilter('all'); }}
              className="mt-4 px-4 py-2 rounded-full text-xs font-semibold bg-roshan-crimson text-white shadow-xs"
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'table' ? (
          /* Table View */
          <div className="bg-white rounded-3xl border border-roshan-gold-champagne/50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50/80 border-b border-roshan-gold-champagne/40 text-[11px] font-bold text-roshan-taupe uppercase tracking-wider">
                    <th className="py-3.5 px-4">Product</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Capacity / Size</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Stock</th>
                    <th className="py-3.5 px-4">Badges / CSD</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-roshan-gold-champagne/30 text-xs">
                  {paginatedProducts.map((product) => {
                    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                    return (
                      <tr key={product.id} className="hover:bg-amber-50/20 transition-colors">
                        {/* Image & Title */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl bg-stone-100 overflow-hidden border border-roshan-gold-champagne/40 shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-roshan-obsidian truncate max-w-xs" title={product.name}>
                                {product.name}
                              </div>
                              <div className="text-[10px] text-roshan-taupe font-mono mt-0.5">
                                {product.id}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700">
                            {product.category}
                          </span>
                        </td>

                        {/* Capacity */}
                        <td className="py-3 px-4 whitespace-nowrap text-stone-600 font-medium">
                          {product.capacity || '—'}
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-bold text-roshan-obsidian">₹{product.price}</div>
                          {product.originalPrice > product.price && (
                            <div className="text-[10px] text-roshan-taupe line-through">
                              ₹{product.originalPrice} ({discount}% off)
                            </div>
                          )}
                        </td>

                        {/* Stock toggle */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleStock(product.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                              product.inStock
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                            <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                          </button>
                        </td>

                        {/* Badges / CSD */}
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {product.badge && (
                              <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold text-white ${
                                product.badge === 'CSD Listed' ? 'bg-[#1E3A8A]' : 'bg-roshan-crimson'
                              }`}>
                                {product.badge}
                              </span>
                            )}
                            {product.csdStatus && (
                              <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-[#1E3A8A]/10 text-[#1E3A8A] border border-[#1E3A8A]/30">
                                {product.csdStatus}
                              </span>
                            )}
                            {product.notes && (
                              <span className="px-2 py-0.5 rounded-md text-[9px] text-roshan-crimson bg-rose-50 border border-rose-200" title={product.notes}>
                                Note
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(product)}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-roshan-crimson hover:text-white text-stone-700 transition-colors"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDuplicate(product)}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-amber-600 hover:text-white text-stone-700 transition-colors"
                              title="Duplicate variant"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeletingId(product.id)}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-rose-600 hover:text-white text-rose-700 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 rounded-2xl bg-white border border-roshan-gold-champagne/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-xl bg-stone-100 overflow-hidden mb-3 border border-roshan-gold-champagne/30">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-roshan-crimson shadow-xs">
                          {product.badge}
                        </span>
                      )}
                      {product.csdStatus && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#1E3A8A] text-white shadow-xs">
                          CSD
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-[10px] uppercase tracking-wider text-roshan-crimson font-semibold">
                    {product.category}
                  </div>
                  <h3 className="font-serif text-sm font-bold text-roshan-obsidian truncate mt-0.5" title={product.name}>
                    {product.name}
                  </h3>
                  <div className="text-xs text-roshan-taupe mt-1">
                    {product.capacity || 'Standard Size'}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <div className="font-serif text-base font-bold text-roshan-obsidian">₹{product.price}</div>
                    <div className="text-[10px] text-roshan-taupe line-through">₹{product.originalPrice}</div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="p-1.5 rounded-lg bg-stone-100 hover:bg-roshan-crimson hover:text-white text-stone-700 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeletingId(product.id)}
                      className="p-1.5 rounded-lg bg-stone-100 hover:bg-rose-600 hover:text-white text-rose-700 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {filteredProducts.length > pageSize && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 p-4 rounded-2xl bg-white border border-roshan-gold-champagne/40 shadow-xs">
            <div className="text-xs text-roshan-taupe">
              Showing <strong className="text-roshan-obsidian">{(page - 1) * pageSize + 1}</strong> to{' '}
              <strong className="text-roshan-obsidian">{Math.min(page * pageSize, filteredProducts.length)}</strong> of{' '}
              <strong className="text-roshan-obsidian">{filteredProducts.length}</strong> items
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-stone-100 text-roshan-obsidian">
                Page {page} of {totalPages}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-roshan-obsidian/70 backdrop-blur-md transition-opacity"
            onClick={() => setEditingProduct(null)}
          />

          <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-roshan-gold-champagne/60 shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-roshan-crimson/10 text-roshan-crimson">
                  <Edit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-roshan-obsidian">
                    {isCreating ? 'Add New Product to Catalog' : `Edit: ${editingProduct.name}`}
                  </h3>
                  <div className="text-xs text-roshan-taupe font-mono mt-0.5">
                    ID: {editingProduct.id}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body (Scrollable) */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
              
              {/* Product ID & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Product ID *</label>
                  <input
                    type="text"
                    required
                    disabled={!isCreating}
                    value={editingProduct.id || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 font-mono focus:outline-none focus:border-roshan-crimson disabled:opacity-60"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Product Title / Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 font-semibold focus:outline-none focus:border-roshan-crimson"
                    placeholder="e.g. Roshan Frosty Bucket 20L - Blue"
                  />
                </div>
              </div>

              {/* Category & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category *</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      const slug = cat === 'Bathroom Products' ? 'bathroom' : cat === 'Cleaning Products' ? 'cleaning' : 'household';
                      setEditingProduct({ ...editingProduct, category: cat, categorySlug: slug });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 font-medium focus:outline-none focus:border-roshan-crimson"
                  >
                    <option value="Bathroom Products">Bathroom Products</option>
                    <option value="Household Products">Household Products</option>
                    <option value="Cleaning Products">Cleaning Products</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Capacity / Size Specification</label>
                  <input
                    type="text"
                    value={editingProduct.capacity || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, capacity: e.target.value })}
                    placeholder="e.g. 20L / 1L / Standard Height / Pack of 24"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:border-roshan-crimson"
                  />
                </div>
              </div>

              {/* Pricing & MOQ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 font-bold text-roshan-crimson focus:outline-none focus:border-roshan-crimson"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Original MRP Price (₹) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editingProduct.originalPrice || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-roshan-crimson"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Wholesale MOQ (Units)</label>
                  <input
                    type="number"
                    value={editingProduct.minOrderB2B || 50}
                    onChange={(e) => setEditingProduct({ ...editingProduct, minOrderB2B: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-roshan-crimson"
                  />
                </div>
              </div>

              {/* Image Selection with Visual Library Picker */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-stone-700">Product Image URL / Path</label>
                  <button
                    type="button"
                    onClick={() => setShowImagePicker(!showImagePicker)}
                    className="inline-flex items-center gap-1.5 text-xs text-roshan-crimson hover:underline font-semibold"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{showImagePicker ? 'Close Gallery' : 'Choose from 134 Catalog Images'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl bg-white border border-stone-300 overflow-hidden shrink-0">
                    {editingProduct.image ? (
                      <Image
                        src={editingProduct.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-stone-300 m-auto mt-4" />
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    value={editingProduct.image || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 font-mono text-[11px] focus:outline-none focus:border-roshan-crimson"
                    placeholder="/catalog/frosty-bucket-01.png"
                  />
                </div>

                {/* Visual Image Grid Picker */}
                {showImagePicker && (
                  <div className="mt-3 p-3 bg-white rounded-2xl border border-stone-200 max-h-48 overflow-y-auto">
                    <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                      Click any photo to select:
                    </div>
                    <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                      {CATALOG_IMAGES.map((img) => (
                        <div
                          key={img}
                          onClick={() => {
                            setEditingProduct({ ...editingProduct, image: img });
                            setShowImagePicker(false);
                          }}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer hover:scale-105 transition-all ${
                            editingProduct.image === img ? 'border-roshan-crimson ring-2 ring-roshan-crimson/30' : 'border-stone-200'
                          }`}
                        >
                          <Image src={img} alt="Catalog item" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Badges, CSD Status, Catalog Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Product Badge</label>
                  <select
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: (e.target.value || undefined) as any })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 font-medium focus:outline-none focus:border-roshan-crimson"
                  >
                    <option value="">No Badge</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="New">New</option>
                    <option value="Popular">Popular</option>
                    <option value="CSD Listed">CSD Listed</option>
                    <option value="Eco Choice">Eco Choice</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">CSD Status (Armed Forces)</label>
                  <input
                    type="text"
                    value={editingProduct.csdStatus || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, csdStatus: e.target.value })}
                    placeholder="e.g. CSD Listed Line / In CSD"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:border-roshan-crimson"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Catalog Special Notes</label>
                  <input
                    type="text"
                    value={editingProduct.notes || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, notes: e.target.value })}
                    placeholder="e.g. 18L & 20L to be introduced in CSD"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:border-roshan-crimson"
                  />
                </div>
              </div>

              {/* Material & Dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Material</label>
                  <input
                    type="text"
                    value={editingProduct.material || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:border-roshan-crimson"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={editingProduct.dimensions || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, dimensions: e.target.value })}
                    placeholder="e.g. 33 x 33 x 35 cm"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:border-roshan-crimson"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:border-roshan-crimson"
                />
              </div>

              {/* Stock Status Checkbox */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-stone-100">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={editingProduct.inStock !== false}
                  onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  className="w-4 h-4 text-roshan-crimson rounded border-stone-300"
                />
                <label htmlFor="inStockCheck" className="font-semibold text-stone-800 cursor-pointer">
                  Product is In-Stock and active on the website
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-full text-stone-600 hover:bg-stone-100 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-white bg-roshan-crimson hover:bg-roshan-crimson-dark shadow-md font-semibold transition-all"
                >
                  {isCreating ? 'Create Product' : 'Save Changes'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-roshan-obsidian/70 backdrop-blur-md" onClick={() => setDeletingId(null)} />
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-white border border-stone-200 shadow-2xl z-10 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-roshan-obsidian">Delete Product</h3>
            <p className="text-xs text-roshan-taupe mt-1.5">
              Are you sure you want to permanently remove <strong className="text-stone-800 font-mono">{deletingId}</strong> from the catalog?
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-5 py-2 rounded-full text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET TO FACTORY CONFIRMATION MODAL */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-roshan-obsidian/70 backdrop-blur-md" onClick={() => setIsResetConfirmOpen(false)} />
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-white border border-stone-200 shadow-2xl z-10 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-roshan-obsidian">Reset to Default Catalog?</h3>
            <p className="text-xs text-roshan-taupe mt-1.5">
              This will restore the catalog to the initial 134 factory products with all original images and specifications. Any custom additions will be reset.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-5 py-2 rounded-full text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetCatalog}
                className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 shadow-sm transition-all"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
