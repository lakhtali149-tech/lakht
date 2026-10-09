import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const {
    isTrackingModalOpen,
    closeTrackingModal,
    trackingQueryId,
    setTrackingQueryId,
    orders,
    formatPrice
  } = useStore();

  const [inputVal, setInputVal] = useState(trackingQueryId);

  if (!isTrackingModalOpen) return null;

  // Find order in history or create simulated tracking
  const activeOrder = orders.find(o => o.id.toUpperCase() === inputVal.trim().toUpperCase()) 
    || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingQueryId(inputVal.trim());
  };

  const steps = [
    { title: 'Order Verified', desc: 'Payment received & inventory allocated', done: true, time: 'Today, 10:14 AM' },
    { title: 'Quality Check & Packed', desc: 'Sealed in tamper-resistant luxury box', done: true, time: 'Today, 12:45 PM' },
    { title: 'Handed to Express Courier', desc: 'In Transit via BlueDart Express Air', done: true, inProgress: true, time: 'Today, 03:30 PM' },
    { title: 'Out for Delivery', desc: 'Arriving at destination address', done: false, time: 'Estimated: in 2 days' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeTrackingModal}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-display">
              Track Your Shipment
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Real-time dispatch updates from Suresh Store logistics hub
            </p>
          </div>
        </div>

        {/* Search by tracking ID */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter Order ID (e.g. SS-748921)"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Track
          </button>
        </form>

        {activeOrder ? (
          <div className="space-y-5">
            {/* Order snapshot banner */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400">Tracking Reference</p>
                <p className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono">{activeOrder.id}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  IN TRANSIT · AIR EXPRESS
                </span>
                <p className="text-[10px] text-zinc-400 mt-0.5">Carrier: BlueDart Premium</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
              {steps.map((st, i) => (
                <div key={i} className="relative">
                  {/* Pin dot */}
                  <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                    st.done
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'
                  }`}>
                    {st.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3 h-3" />}
                  </div>

                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <p className={`font-bold ${st.done ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}>
                        {st.title}
                      </p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">{st.desc}</p>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">{st.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Info */}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Destination: {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state}</span>
              </span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                {activeOrder.items.length} items ({formatPrice(activeOrder.total)})
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">No placed order found</p>
            <p className="text-xs text-zinc-500 mt-1">Place an order first to receive a live tracking ID.</p>
          </div>
        )}

      </div>
    </div>
  );
};
