import React, { useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  RotateCcw, 
  Search, 
  Sparkles,
  Check,
  ChevronDown
} from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedTag,
    setSelectedTag,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly,
    searchQuery,
    setSearchQuery,
    resetFilters,
    formatPrice
  } = useStore();

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const categories = [
    'All',
    'Electronics',
    'Fashion',
    'Home & Living',
    'Audio & Wearables',
    'Footwear'
  ];

  const tags = [
    { label: 'All Items', value: 'all' },
    { label: 'Best Sellers', value: 'bestseller' },
    { label: 'Special Offers', value: 'sale' },
    { label: 'Trending', value: 'trending' },
    { label: 'New Arrivals', value: 'new' },
  ];

  // Filtering & Sorting logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Tag filter
        if (selectedTag !== 'all' && !p.tags.includes(selectedTag as any)) {
          return false;
        }
        // Price filter
        if (p.price < priceRange[0] || p.price > priceRange[1]) {
          return false;
        }
        // In-stock filter
        if (inStockOnly && p.inStock <= 0) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchCat = p.category.toLowerCase().includes(query);
          const matchDesc = p.description.toLowerCase().includes(query);
          if (!matchName && !matchCat && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0);
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedTag, priceRange, inStockOnly, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedTag !== 'all' ||
    priceRange[0] > 0 ||
    priceRange[1] < 35000 ||
    inStockOnly ||
    searchQuery.trim().length > 0;

  return (
    <section id="product-catalog" className="py-14 sm:py-20 bg-zinc-50 dark:bg-zinc-950/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Suresh Store Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
              {selectedCategory === 'All' ? 'Curated Luxury Collection' : `${selectedCategory} Collection`}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Showing {filteredProducts.length} of {products.length} products
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </p>
          </div>

          {/* Quick Category Buttons for Desktop */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-zinc-950 shadow-sm'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 sm:p-4 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Tag Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
              {tags.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setSelectedTag(t.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedTag === t.value
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Right side: Sort by dropdown + Mobile Filter Toggle */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 rounded-xl px-2.5 py-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-xs text-zinc-400 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              {/* Advanced Filter Drawer/Accordion Toggle */}
              <button
                type="button"
                onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  isFilterPanelOpen || priceRange[1] < 35000 || inStockOnly
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400'
                    : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
                {(priceRange[1] < 35000 || inStockOnly) && (
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                )}
                <ChevronDown className={`w-3 h-3 transition-transform ${isFilterPanelOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Reset button if filters active */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  title="Reset all filters"
                  className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Expandable Advanced Filter Panel */}
          {isFilterPanelOpen && (
            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in slide-in-from-top-1 duration-200">
              
              {/* Price Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  <span>Max Price Filter</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold font-mono">
                    Up to {formatPrice(priceRange[1])}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="35000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>{formatPrice(2000)}</span>
                  <span>{formatPrice(35000)}</span>
                </div>
              </div>

              {/* In-Stock Only Toggle */}
              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="instock-filter"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 text-amber-500 focus:ring-amber-500 accent-amber-500 cursor-pointer"
                />
                <label htmlFor="instock-filter" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  In-Stock Items Only (Fast Dispatch)
                </label>
              </div>

              {/* Quick Reset Action */}
              <div className="flex items-center sm:justify-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All Filter Constraints</span>
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search/Filter State */
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              No matching products found
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Try adjusting your search keyword, category, or price range filter to explore more items.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
