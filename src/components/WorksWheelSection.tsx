import React from 'react';
import { useStore } from '../context/StoreContext';
import { WorksWheel, WorksWheelItem } from '@/components/ui/works-wheel';
import { Sparkles, Compass, MousePointerClick } from 'lucide-react';

export const WorksWheelSection: React.FC = () => {
  const { products, openQuickView, formatPrice } = useStore();

  // Map products that are designated for featured wheel
  const wheelProducts = products.filter(p => p.isFeaturedWheel);

  const wheelItems: WorksWheelItem[] = wheelProducts.map(p => ({
    title: p.name,
    image: p.images[0],
    subtitle: `${formatPrice(p.price)} · ${p.category}`,
    href: `#prod-${p.id}`
  }));

  const handleItemSelect = (item: WorksWheelItem) => {
    const matched = products.find(p => p.name === item.title);
    if (matched) {
      openQuickView(matched);
    }
  };

  return (
    <section id="wheel-showcase" className="py-16 sm:py-20 bg-zinc-950 text-zinc-100 relative overflow-hidden border-b border-zinc-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE SHOWCASE · 3D ROTATION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              Suresh Store Spotlight '26
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Turn the interactive drum wheel or drag vertically to inspect this season's signature flagship releases. Click any card to launch quick view.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-400 bg-zinc-900/80 px-3.5 py-2 rounded-xl border border-zinc-800 self-start md:self-auto">
            <MousePointerClick className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>Scroll or drag up/down to rotate wheel</span>
          </div>
        </div>
      </div>

      {/* The WorksWheel interactive component */}
      <div className="w-full h-[520px] sm:h-[620px] relative">
        <WorksWheel
          items={wheelItems}
          label="Suresh '26"
          action="Quick View"
          onItemSelect={handleItemSelect}
          className="bg-zinc-950 text-white"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex justify-between items-center text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive 3D Perspective Lens</span>
        </span>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('product-catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline underline-offset-4"
        >
          View all in product catalog ↓
        </button>
      </div>
    </section>
  );
};
