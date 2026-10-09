import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    openQuickView,
    toggleWishlist,
    isInWishlist,
    formatPrice
  } = useStore();

  const isLiked = isInWishlist(product.id);
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setIsAddedRecently(true);
    setTimeout(() => {
      setIsAddedRecently(false);
    }, 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      id={`prod-${product.id}`}
      onClick={() => openQuickView(product)}
      className="group relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-800/60 overflow-hidden">
        <img
          src={product.images[activeImageIdx] || product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-zinc-950 text-amber-400 shadow-md">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-rose-600 text-white shadow-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Top-Right Action Buttons: Wishlist & Quick View */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            type="button"
            onClick={handleWishlist}
            aria-label="Add to wishlist"
            className="w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:text-rose-600 dark:hover:text-rose-400 shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isLiked ? 'text-rose-600 fill-rose-600' : ''
              }`}
            />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            aria-label="Quick View"
            className="w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:text-amber-500 shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery preview dots if multiple images */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIdx(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  activeImageIdx === idx ? 'w-4 bg-amber-400' : 'bg-white/60 hover:bg-white'
                }`}
                aria-label={`Show image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Info */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span>{product.rating}</span>
              <span className="text-zinc-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>

          {/* Color preview swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="w-3 h-3 rounded-full border border-zinc-300 dark:border-zinc-700 shadow-xs"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.colors.length > 1 && (
                <span className="text-[10px] text-zinc-400 font-medium ml-1">
                  {product.colors.length} colors
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-base sm:text-lg text-zinc-900 dark:text-zinc-100">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-zinc-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              In Stock ({product.inStock} left)
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 shadow-sm'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
