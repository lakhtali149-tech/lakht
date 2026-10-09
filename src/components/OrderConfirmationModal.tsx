import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  Copy, 
  ArrowRight, 
  X,
  Sparkles
} from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const {
    completedOrder,
    setCompletedOrder,
    openTrackingModal,
    addToast,
    formatPrice
  } = useStore();

  if (!completedOrder) return null;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(completedOrder.id);
    addToast('Copied to Clipboard', `Tracking ID ${completedOrder.id} copied!`, 'info');
  };

  const handleTrack = () => {
    const id = completedOrder.id;
    setCompletedOrder(null);
    openTrackingModal(id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setCompletedOrder(null)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-500/10">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PAYMENT CONFIRMED & VERIFIED</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 font-display">
            Thank You For Shopping!
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Your order has been received at Suresh Store warehouse and is being packed in tamper-proof luxury packaging.
          </p>
        </div>

        {/* Order Tracking ID card */}
        <div className="mt-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-zinc-400 block">Order Reference #</span>
            <span className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
              {completedOrder.id}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyOrderId}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 text-xs font-bold text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy ID</span>
          </button>
        </div>

        {/* Details grid */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Est. Delivery</span>
            </div>
            <p className="font-bold text-zinc-900 dark:text-zinc-100">{completedOrder.estimatedDelivery}</p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Delivering To</span>
            </div>
            <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate">
              {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.pincode}
            </p>
          </div>
        </div>

        {/* Purchased Items Snapshot */}
        <div className="mt-4">
          <span className="text-xs font-bold uppercase text-zinc-500 block mb-2">
            Items in This Shipment ({completedOrder.items.length})
          </span>
          <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
            {completedOrder.items.map((it) => (
              <div key={it.id} className="flex items-center justify-between text-xs py-1 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <img src={it.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="font-medium text-zinc-800 dark:text-zinc-200 line-clamp-1">{it.name}</span>
                </div>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatPrice(it.price * it.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Paid */}
        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <span className="text-xs text-zinc-500 font-semibold">Total Amount Charged</span>
          <span className="text-lg font-black text-zinc-900 dark:text-zinc-100">{formatPrice(completedOrder.total)}</span>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleTrack}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
          >
            <Truck className="w-4 h-4" />
            <span>Track Live Shipment Status</span>
          </button>

          <button
            type="button"
            onClick={() => setCompletedOrder(null)}
            className="w-full sm:w-auto py-3 px-5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-xs sm:text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};
