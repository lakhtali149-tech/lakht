import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { products, openQuickView, addToCart, formatPrice } = useStore();
  const heroProduct = products[0]; // Aura Sound Pro

  const scrollToCatalog = () => {
    const el = document.getElementById('product-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWheel = () => {
    const el = document.getElementById('wheel-showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-100 via-amber-50/30 to-white dark:from-zinc-900/60 dark:via-zinc-950 dark:to-zinc-950 pt-8 sm:pt-14 pb-14 border-b border-zinc-200 dark:border-zinc-800">
      {/* Subtle ambient blur glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/15 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800/80 text-amber-900 dark:text-amber-300 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 fill-amber-500" />
              <span>THE 2026 LUXURY EDITIONS</span>
              <span className="w-1 h-1 rounded-full bg-amber-500" />
              <span className="font-bold">UP TO 40% OFF</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-display leading-[1.12]">
              Elevate Your Everyday <br className="hidden sm:inline" />
              With <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Curated Luxury</span>.
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
              Discover flagship audio, automatic timepieces, handcrafted leather, and aesthetic home living essentials. Certified genuine and delivered in pristine unboxing packaging.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToCatalog}
                className="px-6 sm:px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:gap-3 cursor-pointer active:scale-95"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={scrollToWheel}
                className="px-5 sm:px-6 py-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold text-sm sm:text-base flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Explore 3D Wheel Showcase</span>
              </button>
            </div>

            {/* Micro stats & Social proof */}
            <div className="pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 font-display">50,000+</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Happy Customers</p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 font-display">4.9/5</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Store Rating</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 font-display">100%</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Genuine Guarantee</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Interactive Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-4 sm:p-5 shadow-2xl shadow-zinc-900/10 dark:shadow-black/50 group">
              {/* Product Badge */}
              <div className="absolute top-7 left-7 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 text-amber-400 text-xs font-bold tracking-wide backdrop-blur-md shadow-md">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>STORE FLAGSHIP</span>
              </div>

              {/* Main Image Container */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Discount Tag */}
                <div className="absolute bottom-4 right-4 bg-amber-500 text-zinc-950 text-xs font-black px-2.5 py-1 rounded-lg shadow-lg">
                  SAVE ₹6,000 (24% OFF)
                </div>
              </div>

              {/* Product Info & Quick Action */}
              <div className="pt-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50 line-clamp-1">
                      {heroProduct.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Spatial Audio · 45h Battery · Hybrid ANC
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-50">
                      {formatPrice(heroProduct.price)}
                    </p>
                    <p className="text-xs text-zinc-400 line-through">
                      {formatPrice(heroProduct.originalPrice)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => addToCart(heroProduct)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-95 text-center"
                  >
                    Add to Cart Now
                  </button>
                  <button
                    type="button"
                    onClick={() => openQuickView(heroProduct)}
                    className="py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 shadow-lg items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-zinc-900 dark:text-zinc-100">Free Express Delivery</p>
                <p className="text-zinc-500">Ships within 24 Hours</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
