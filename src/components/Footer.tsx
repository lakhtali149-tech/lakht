import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Send, 
  CheckCircle2, 
  Shield, 
  Heart, 
  Truck, 
  Phone, 
  Mail, 
  MapPin,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedCategory, openTrackingModal, addToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'warn');
      return;
    }
    setIsSubscribed(true);
    addToast('Subscribed Successfully!', '🎉 Welcome to Suresh VIP Club. Enjoy 15% off your next order!', 'success');
    setEmail('');
  };

  const handleCategoryNav = (cat: string) => {
    setSelectedCategory(cat);
    const el = document.getElementById('product-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 text-xs">
      
      {/* Newsletter VIP Banner */}
      <div className="border-b border-zinc-800/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Suresh Store VIP Insider Club</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Join Our Members Club for 15% Off Your Next Order
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Be the first to know about secret flash drops, limited editions, and private holiday sales.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {isSubscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-2xl text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>You're on the VIP list! Coupon code <strong className="text-white">VIP15</strong> sent.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-zinc-950 font-black flex items-center justify-center font-display text-base">
                SS
              </div>
              <span className="font-extrabold text-xl text-white font-display">
                Suresh<span className="text-amber-500">Store</span>
              </span>
            </div>

            <p className="text-zinc-400 leading-relaxed text-xs max-w-sm">
              Suresh Store is India's premier online lifestyle and tech boutique. We curate high-fidelity audio, mechanical timepieces, luxury leather, and aesthetic home enhancements with direct manufacturer warranties.
            </p>

            <div className="space-y-2 text-[11px] text-zinc-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Flagship Fulfillment Hub: Indiranagar, Bengaluru, 560038</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>Priority Helpline: +91 (80) 4123-8899 (24/7)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>Concierge: support@sureshstore.com</span>
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <p className="font-bold text-white uppercase tracking-wider text-xs font-display">Collections</p>
            <ul className="space-y-2">
              {['Electronics', 'Fashion', 'Home & Living', 'Audio & Wearables', 'Footwear'].map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => handleCategoryNav(cat)}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Help */}
          <div className="space-y-3">
            <p className="font-bold text-white uppercase tracking-wider text-xs font-display">Customer Care</p>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => openTrackingModal()}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Truck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Track My Shipment</span>
                </button>
              </li>
              <li><a href="#special-offer" className="hover:text-amber-400 transition-colors">Special Offers & Flash Sales</a></li>
              <li><a href="#wheel-showcase" className="hover:text-amber-400 transition-colors">3D Spotlight Wheel</a></li>
              <li><span className="text-zinc-500">Shipping & Delivery Rates</span></li>
              <li><span className="text-zinc-500">7-Day Return Policy</span></li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="space-y-3">
            <p className="font-bold text-white uppercase tracking-wider text-xs font-display">Security & Trust</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Certified Genuine</span>
              </li>
              <li><span>Privacy & Cookie Policy</span></li>
              <li><span>Terms of Service</span></li>
              <li><span>Warranty Claim Portal</span></li>
              <li><span>Sustainability Pledges</span></li>
            </ul>
          </div>

        </div>

        {/* Payment Methods and Copyright */}
        <div className="pt-8 mt-12 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            <p>© 2026 Suresh Store. All rights reserved. Handcrafted for seamless online luxury shopping.</p>
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-zinc-400 font-semibold mr-1">Accepted:</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono font-bold">UPI</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold">Visa</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold">MasterCard</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold">RuPay</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold">Apple Pay</span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold">NetBanking</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
