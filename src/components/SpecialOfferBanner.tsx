import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Timer, Zap, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const SpecialOfferBanner: React.FC = () => {
  const { products, addToCart, openCheckout, formatPrice } = useStore();
  
  // Flash deal item: Chronos Watch
  const flashItem = products[1]; 

  // Countdown timer: 14 hours 28 mins remaining
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 27,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // loop if finished
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaimDeal = () => {
    addToCart(flashItem);
    openCheckout();
  };

  return (
    <section id="special-offer" className="py-12 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-zinc-950 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Offer details and live timer */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
                <span>LIMITED TIME FLASH SALE</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
                Grab The Chronos Sapphire Watch <br className="hidden sm:inline" />
                At Extra <span className="text-amber-400 font-black">₹4,500 OFF</span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 max-w-lg">
                Automatic precision movement, double-domed anti-scratch sapphire crystal, and premium saddle Italian leather. Available while current stock allocation lasts.
              </p>

              {/* Countdown Timer Display */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-semibold mr-2">
                  <Timer className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>ENDS IN:</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl text-center min-w-[54px]">
                    <span className="block text-xl sm:text-2xl font-black text-amber-400 font-mono">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase font-medium">Hours</span>
                  </div>
                  <span className="text-amber-400 font-bold text-lg">:</span>
                  <div className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl text-center min-w-[54px]">
                    <span className="block text-xl sm:text-2xl font-black text-amber-400 font-mono">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase font-medium">Mins</span>
                  </div>
                  <span className="text-amber-400 font-bold text-lg">:</span>
                  <div className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl text-center min-w-[54px]">
                    <span className="block text-xl sm:text-2xl font-black text-amber-400 font-mono">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase font-medium">Secs</span>
                  </div>
                </div>
              </div>

              {/* Instant Claim Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleClaimDeal}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95 transition-all"
                >
                  <Tag className="w-4 h-4" />
                  <span>Claim Flash Deal ({formatPrice(flashItem.price)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>2-Year Warranty & Free Express Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Col: Product Photo Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-[4/3] group">
                <img
                  src={flashItem.images[0]}
                  alt={flashItem.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                  HOT DEAL · 26% SAVING
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-md p-3 rounded-xl border border-zinc-800 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-zinc-400">Regular Price</p>
                    <p className="text-sm text-zinc-400 line-through">{formatPrice(flashItem.originalPrice)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-amber-400 font-semibold">Special Flash Price</p>
                    <p className="text-lg font-black text-amber-400">{formatPrice(flashItem.price)}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
