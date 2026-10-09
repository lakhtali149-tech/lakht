import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShippingAddress, PaymentMethod } from '../types';
import { 
  X, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Lock,
  Sparkles,
  Smartphone,
  Banknote,
  Building
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    subtotal,
    discountAmount,
    shippingAmount,
    totalAmount,
    appliedCoupon,
    placeOrder,
    formatPrice
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Address form
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@example.com',
    addressLine: 'Flat 402, Prestige Hermitage, MG Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
  });

  // Payment form
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('rahul@okaxis');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('999');

  if (!isCheckoutOpen) return null;

  const handleFillDemoAddress = () => {
    setShippingAddress({
      fullName: 'Aarav Singhania',
      phone: '+91 98111 22334',
      email: 'aarav.singhania@domain.com',
      addressLine: 'Penthouse 12B, Regency Heights, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018',
    });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleFinalOrderSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(shippingAddress, paymentMethod);
      setIsSubmitting(false);
      setStep(1);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit Encrypted Checkout</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 font-display">
              {step === 1 && 'Shipping Destination'}
              {step === 2 && 'Select Payment Method'}
              {step === 3 && 'Review & Confirm Order'}
            </h2>
          </div>

          <button
            type="button"
            onClick={closeCheckout}
            className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-3 border-b border-zinc-200 dark:border-zinc-800 text-xs font-bold bg-zinc-50/70 dark:bg-zinc-950/40">
          <div className={`p-3 text-center border-b-2 flex items-center justify-center gap-1.5 ${
            step >= 1 ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-zinc-400'
          }`}>
            <span className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center text-[10px] font-black">1</span>
            <span>Shipping</span>
          </div>

          <div className={`p-3 text-center border-b-2 flex items-center justify-center gap-1.5 ${
            step >= 2 ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-zinc-400'
          }`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
              step >= 2 ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
            }`}>2</span>
            <span>Payment</span>
          </div>

          <div className={`p-3 text-center border-b-2 flex items-center justify-center gap-1.5 ${
            step === 3 ? 'border-amber-500 text-amber-600 dark:text-amber-400' : 'border-transparent text-zinc-400'
          }`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
              step === 3 ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
            }`}>3</span>
            <span>Review</span>
          </div>
        </div>

        {/* Body based on step */}
        <div className="p-5 sm:p-7 max-h-[70vh] overflow-y-auto">
          {step === 1 && (
            <form id="shipping-form" onSubmit={handleNextStep} className="space-y-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-zinc-500">Contact & Delivery Address</span>
                <button
                  type="button"
                  onClick={handleFillDemoAddress}
                  className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold cursor-pointer"
                >
                  ⚡ Autofill Sample Address
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Email Address (for order receipts & tracking) *
                </label>
                <input
                  type="email"
                  required
                  value={shippingAddress.email}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Street Address & House / Apartment *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.addressLine}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.pincode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-zinc-500 mb-2">Choose your preferred payment gateway:</p>

              {/* UPI Option */}
              <label className={`block p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                paymentMethod === 'upi'
                  ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/20'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment-method"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-amber-500" />
                        <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">UPI Instant Pay</span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Google Pay, PhonePe, Paytm, BHIM UPI (Zero Gateway Fees)
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-600 px-2 py-0.5 rounded-full">
                    FASTEST
                  </span>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="mt-3 pt-3 border-t border-amber-200/50 dark:border-amber-900/50">
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}
              </label>

              {/* Credit/Debit Card */}
              <label className={`block p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                paymentMethod === 'card'
                  ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/20'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-amber-500" />
                      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Credit / Debit Card</span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Visa, MasterCard, RuPay, American Express
                    </p>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-3 pt-3 border-t border-amber-200/50 dark:border-amber-900/50 space-y-2">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-mono text-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                          Expiry MM/YY
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-mono text-zinc-900 dark:text-zinc-100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-mono text-zinc-900 dark:text-zinc-100"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </label>

              {/* Net Banking */}
              <label className={`block p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                paymentMethod === 'netbanking'
                  ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/20'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="accent-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-amber-500" />
                      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Net Banking</span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      All Major Indian Banks (HDFC, SBI, ICICI, Axis)
                    </p>
                  </div>
                </div>
              </label>

              {/* Cash On Delivery */}
              <label className={`block p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                paymentMethod === 'cod'
                  ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/20'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-amber-500" />
                      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Pay via Cash or UPI upon doorstep delivery
                    </p>
                  </div>
                </div>
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              {/* Shipping summary card */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase text-zinc-500">Delivery Address</span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{shippingAddress.fullName}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">{shippingAddress.addressLine}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
                </p>
                <p className="text-xs text-zinc-500 mt-1">Phone: {shippingAddress.phone}</p>
              </div>

              {/* Items summary */}
              <div>
                <span className="text-xs font-bold uppercase text-zinc-500 block mb-2">Order Items ({cart.length})</span>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center gap-2">
                        <img src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">{item.name}</p>
                          <p className="text-[10px] text-zinc-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial summary */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Shipping</span>
                  <span>{shippingAmount === 0 ? 'FREE' : formatPrice(shippingAmount)}</span>
                </div>
                <div className="pt-2 border-t border-amber-500/20 flex justify-between text-base font-black text-zinc-900 dark:text-zinc-100">
                  <span>Grand Total</span>
                  <span className="text-amber-600 dark:text-amber-400">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="p-5 sm:p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/70 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Free returns within 7 days</span>
            </span>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={(e) => {
                if (step === 1) {
                  // Submit shipping form validation
                  const form = document.getElementById('shipping-form') as HTMLFormElement;
                  if (form && !form.checkValidity()) {
                    form.reportValidity();
                    return;
                  }
                }
                setStep((step + 1) as any);
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>Continue to {step === 1 ? 'Payment' : 'Review'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleFinalOrderSubmit}
              className="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Order...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Place Order ({formatPrice(totalAmount)})</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
