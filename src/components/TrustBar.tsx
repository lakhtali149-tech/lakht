import React from 'react';
import { Truck, Headset, ShieldCheck, RotateCcw, Award } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const perks = [
    {
      icon: Truck,
      title: 'Free Express Shipping',
      description: 'On all orders above ₹999 with 24h dispatch',
    },
    {
      icon: ShieldCheck,
      title: '100% Secure Checkout',
      description: 'End-to-end 256-bit SSL encrypted payments',
    },
    {
      icon: RotateCcw,
      title: '7-Day Hassle-Free Returns',
      description: 'Instant pickup & full refund guarantee',
    },
    {
      icon: Award,
      title: '100% Authentic Products',
      description: 'Direct manufacturer warranty certified',
    },
    {
      icon: Headset,
      title: '24/7 Priority Support',
      description: 'Instant phone, email & chat assistance',
    },
  ];

  return (
    <section className="py-10 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {perks.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                  {p.title}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
