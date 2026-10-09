import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Sun, 
  Moon, 
  Truck, 
  Menu, 
  X, 
  Sparkles, 
  ChevronRight,
  IndianRupee,
  DollarSign
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    products,
    cartCount,
    wishlist,
    openCart,
    openWishlist,
    openTrackingModal,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    theme,
    toggleTheme,
    currency,
    toggleCurrency,
    formatPrice,
    openQuickView
  } = useStore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const navCategories = [
    { label: 'All Products', value: 'All' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Home & Living', value: 'Home & Living' },
    { label: 'Audio & Wearables', value: 'Audio & Wearables' },
    { label: 'Footwear', value: 'Footwear' },
  ];

  const handleNavCategoryClick = (categoryValue: string) => {
    setSelectedCategory(categoryValue);
    setIsMobileMenuOpen(false);
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-zinc-950/90 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      {/* Top promotional announcement bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-zinc-950 text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2 tracking-wide">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>FESTIVE SALE: Use coupon <span className="bg-zinc-950 text-amber-400 px-1.5 py-0.5 rounded font-mono font-bold tracking-wider">SURESH20</span> for 20% OFF!</span>
        <span className="hidden md:inline text-zinc-900/80">· Free Express Delivery on orders above ₹999</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* Mobile menu hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-zinc-950 font-black text-lg tracking-tighter font-display">SS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-zinc-50 font-display flex items-center gap-1">
                Suresh<span className="text-amber-500">Store</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-zinc-400 -mt-1 hidden sm:block">
                Luxury Retail · est. 2026
              </span>
            </div>
          </a>

          {/* Search Bar (Desktop & Tablet) */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search premium headphones, watches, sneakers, tech..."
                className="w-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 pl-10 pr-10 py-2.5 rounded-full text-sm border border-zinc-200/80 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder:text-zinc-400"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Results Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-500 font-medium">
                  <span>Found {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'}</span>
                  <span>Press Esc to close</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-zinc-100 dark:divide-zinc-800 max-h-80 overflow-y-auto">
                    {searchResults.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          openQuickView(item);
                          setIsSearchFocused(false);
                        }}
                        className="w-full text-left p-3 flex items-center gap-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/70 transition-colors group cursor-pointer"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover bg-zinc-100 dark:bg-zinc-800 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-amber-500 transition-colors">
                            {item.name}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {item.category} · ★ {item.rating}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                            {formatPrice(item.price)}
                          </p>
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                            Quick View →
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-zinc-500">
                    No products matching "{searchQuery}". Try browsing categories below.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Tools & Badges */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Currency toggle */}
            <button
              type="button"
              onClick={toggleCurrency}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1"
              title="Switch Currency (INR / USD)"
            >
              {currency === 'INR' ? (
                <>
                  <IndianRupee className="w-3.5 h-3.5 text-amber-500" />
                  <span>INR</span>
                </>
              ) : (
                <>
                  <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                  <span>USD</span>
                </>
              )}
            </button>

            {/* Dark/Light mode toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark/Light Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-zinc-600" />
              )}
            </button>

            {/* Order Tracking trigger */}
            <button
              type="button"
              onClick={() => openTrackingModal()}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors hidden sm:flex items-center"
              title="Track Order Status"
              aria-label="Track Order"
            >
              <Truck className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={openWishlist}
              className="relative p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm shadow-sm transition-transform active:scale-95 cursor-pointer"
              aria-label="Shopping Cart Drawer"
            >
              <ShoppingBag className="w-4 h-4 text-zinc-950" />
              <span className="hidden sm:inline">Cart</span>
              <span className="w-5 h-5 bg-zinc-950 text-amber-400 text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products in Suresh Store..."
              className="w-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 pl-9 pr-8 py-2 rounded-xl text-sm border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center gap-1 py-2 border-t border-zinc-100 dark:border-zinc-800/80 text-sm font-medium overflow-x-auto">
          {navCategories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => handleNavCategoryClick(cat.value)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
          
          <div className="ml-auto flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <a
              href="#wheel-showcase"
              className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold hover:underline"
            >
              <span>Featured 3D Wheel</span>
              <ChevronRight className="w-3 h-3" />
            </a>
            <a
              href="#special-offer"
              className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold hover:underline"
            >
              <span>Flash Sale -40%</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-3 animate-in slide-in-from-top-2">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Categories</p>
          <div className="grid grid-cols-2 gap-2">
            {navCategories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => handleNavCategoryClick(cat.value)}
                className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-amber-500 text-zinc-950 font-bold'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openTrackingModal();
              }}
              className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 py-2 font-medium"
            >
              <Truck className="w-4 h-4 text-amber-500" />
              <span>Track Your Order</span>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 py-2 font-medium"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
