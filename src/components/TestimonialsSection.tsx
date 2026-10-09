import React, { useState } from 'react';
import { REVIEWS } from '../data/products';
import { Star, CheckCircle, MessageSquarePlus, ThumbsUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TestimonialsSection: React.FC = () => {
  const { addToast } = useStore();
  const [likes, setLikes] = useState<Record<string, number>>({
    'rev-1': 24,
    'rev-2': 19,
    'rev-3': 38,
    'rev-4': 15,
  });

  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    if (hasLiked[id]) return;
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setHasLiked(prev => ({ ...prev, [id]: true }));
    addToast('Helpful vote recorded', 'Thank you for your feedback!', 'success');
  };

  return (
    <section className="py-16 sm:py-20 bg-zinc-50 dark:bg-zinc-950/40 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with aggregate rating */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800/80 text-amber-900 dark:text-amber-300 text-xs font-semibold mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>COMMUNITY FEEDBACK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
              Loved by 50,000+ Discerning Customers
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-lg">
              Read uncensored reviews from verified purchasers across India.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="text-center pr-4 border-r border-zinc-200 dark:border-zinc-800">
              <span className="text-3xl font-black text-zinc-900 dark:text-zinc-50 font-display">4.9</span>
              <div className="flex items-center gap-0.5 text-amber-500 mt-0.5 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              <p className="font-bold text-zinc-900 dark:text-zinc-100">Based on 1,280+ Reviews</p>
              <p className="text-[11px] mt-0.5">99.4% Recommended by shoppers</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Rating & Verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                {/* Product Name */}
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1.5 line-clamp-1">
                  {rev.productName}
                </p>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Helpful vote */}
              <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-8 h-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                  />
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{rev.author}</p>
                    <p className="text-[10px] text-zinc-400">{rev.date}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleLike(rev.id)}
                  className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg border transition-colors cursor-pointer ${
                    hasLiked[rev.id]
                      ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 text-amber-600 font-bold'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                  }`}
                  title="Mark as helpful"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{likes[rev.id] || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
