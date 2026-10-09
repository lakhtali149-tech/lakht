import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Laptop, 
  Shirt, 
  Home, 
  Headphones, 
  Footprints, 
  Flame,
  ArrowUpRight
} from 'lucide-react';

interface CategoryCard {
  title: string;
  categoryValue: string;
  isTag?: boolean;
  tagValue?: string;
  itemCount: number;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const FeaturedCategories: React.FC = () => {
  const { setSelectedCategory, setSelectedTag } = useStore();

  const categories: CategoryCard[] = [
    {
      title: 'Audio & Wearables',
      categoryValue: 'Audio & Wearables',
      itemCount: 4,
      description: 'Spatial ANC & Studio Gear',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
      icon: Headphones
    },
    {
      title: 'Precision Electronics',
      categoryValue: 'Electronics',
      itemCount: 5,
      description: 'Mechanical keys, power & cameras',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
      icon: Laptop
    },
    {
      title: 'Fashion & Luxury',
      categoryValue: 'Fashion',
      itemCount: 6,
      description: 'Watches, cashmere & sunglasses',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      icon: Shirt
    },
    {
      title: 'Home & Living',
      categoryValue: 'Home & Living',
      itemCount: 4,
      description: 'Smart lighting & artisan coffee',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
      icon: Home
    },
    {
      title: 'Designer Footwear',
      categoryValue: 'Footwear',
      itemCount: 3,
      description: 'Italian leather & memory foam',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
      icon: Footprints
    },
    {
      title: 'Flash Sale & Offers',
      categoryValue: 'All',
      isTag: true,
      tagValue: 'sale',
      itemCount: 6,
      description: 'Up to 40% limited price cuts',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80',
      icon: Flame
    }
  ];

  const handleSelect = (cat: CategoryCard) => {
    if (cat.isTag && cat.tagValue) {
      setSelectedCategory('All');
      setSelectedTag(cat.tagValue);
    } else {
      setSelectedCategory(cat.categoryValue);
      setSelectedTag('all');
    }

    const el = document.getElementById('product-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-14 sm:py-18 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">
              Curated Collections
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Browse hand-picked categories or filter straight to special offers.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSelectedTag('all');
              const el = document.getElementById('product-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>View All Products</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.title}
                type="button"
                onClick={() => handleSelect(cat)}
                className="group relative flex flex-col h-56 sm:h-64 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/80 bg-zinc-900 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                {/* Background image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-85"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Content */}
                <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-medium text-zinc-300 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      {cat.itemCount} items
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-zinc-300 line-clamp-1 mt-0.5">
                      {cat.description}
                    </p>
                    <span className="mt-2 inline-flex items-center text-[11px] font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                      Explore →
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
