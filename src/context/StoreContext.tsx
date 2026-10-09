import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Coupon, ShippingAddress, PaymentMethod, Order } from '../types';
import { PRODUCTS, COUPONS } from '../data/products';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warn';
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  resetFilters: () => void;
  
  // Theme & Currency
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currency: 'INR' | 'USD';
  toggleCurrency: () => void;
  formatPrice: (amountInInr: number) => string;

  // Cart actions
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  totalAmount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;

  // Wishlist actions
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupons
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Modals & Navigation
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  completedOrder: Order | null;
  setCompletedOrder: (order: Order | null) => void;
  isTrackingModalOpen: boolean;
  openTrackingModal: (orderId?: string) => void;
  closeTrackingModal: () => void;
  trackingQueryId: string;
  setTrackingQueryId: (id: string) => void;
  orders: Order[];
  placeOrder: (shipping: ShippingAddress, paymentMethod: PaymentMethod) => Order;

  // Toasts
  toasts: Toast[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warn') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const USD_RATE = 0.012; // 1 INR ~ 0.012 USD

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('suresh_store_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('suresh_store_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Currency state
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const toggleCurrency = () => {
    setCurrency(prev => (prev === 'INR' ? 'USD' : 'INR'));
  };

  const formatPrice = (amountInInr: number) => {
    if (currency === 'USD') {
      const usdVal = amountInInr * USD_RATE;
      return `$${usdVal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
    }
    return `₹${amountInInr.toLocaleString('en-IN')}`;
  };

  // Products and filtering
  const [products] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 35000]);
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTag('all');
    setPriceRange([0, 35000]);
    setSortBy('featured');
    setInStockOnly(false);
  };

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('suresh_store_cart');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('suresh_store_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('suresh_store_wishlist');
        return saved ? JSON.parse(saved) : ['prod-1', 'prod-2'];
      } catch (e) {
        return ['prod-1', 'prod-2'];
      }
    }
    return ['prod-1', 'prod-2'];
  });

  useEffect(() => {
    localStorage.setItem('suresh_store_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('suresh_store_orders');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('suresh_store_orders', JSON.stringify(orders));
  }, [orders]);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(COUPONS[0]); // Default to active promo
  const [couponError, setCouponError] = useState<string | null>(null);

  // Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingQueryId, setTrackingQueryId] = useState('');

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warn' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts(prev => [...prev.slice(-3), { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    const selectedColor = color || (product.colors && product.colors[0]?.name);
    const selectedSize = size || (product.sizes && product.sizes[0]);
    const instanceId = `${product.id}_${selectedColor || 'def'}_${selectedSize || 'def'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === instanceId);
      if (existing) {
        return prev.map(item =>
          item.id === instanceId
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.inStock) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: instanceId,
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images[0],
          color: selectedColor,
          size: selectedSize,
          quantity
        }
      ];
    });

    addToast('Added to Cart', `${product.name} (${quantity}x) added to your bag.`);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    addToast('Item Removed', 'The item was removed from your bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', `${product?.name || 'Item'} removed.`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Added to Wishlist', `${product?.name || 'Item'} saved to your wishlist!`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Totals
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon || subtotal === 0) return 0;
    if (appliedCoupon.minSpend && subtotal < appliedCoupon.minSpend) return 0;
    if (appliedCoupon.discountPercentage) {
      return Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
    }
    if (appliedCoupon.discountFixed) {
      return Math.min(appliedCoupon.discountFixed, subtotal);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const shippingAmount = useMemo(() => {
    if (subtotal === 0) return 0;
    if (appliedCoupon?.freeShipping) return 0;
    return subtotal >= 999 ? 0 : 149;
  }, [subtotal, appliedCoupon]);

  const totalAmount = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingAmount);
  }, [subtotal, discountAmount, shippingAmount]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Coupon handling
  const applyCoupon = (rawCode: string): boolean => {
    const code = rawCode.trim().toUpperCase();
    setCouponError(null);
    if (!code) {
      setCouponError('Please enter a coupon code.');
      return false;
    }
    const match = COUPONS.find(c => c.code === code);
    if (!match) {
      setCouponError('Invalid coupon code. Try SURESH20 or WELCOME10.');
      addToast('Invalid Coupon', 'That coupon code is not valid.', 'warn');
      return false;
    }
    if (match.minSpend && subtotal < match.minSpend) {
      setCouponError(`Minimum spend of ₹${match.minSpend} required for this code.`);
      addToast('Coupon Condition Not Met', `Spend at least ₹${match.minSpend} to use ${code}.`, 'warn');
      return false;
    }
    setAppliedCoupon(match);
    addToast('Coupon Applied!', `${match.description}`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
    addToast('Coupon Removed', 'Coupon code removed.', 'info');
  };

  // Order Placement
  const placeOrder = (shipping: ShippingAddress, paymentMethod: PaymentMethod): Order => {
    const orderId = `SS-${Math.floor(100000 + Math.random() * 900000)}`;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping: shippingAmount,
      total: totalAmount,
      couponCode: appliedCoupon?.code,
      shippingAddress: shipping,
      paymentMethod,
      status: 'Confirmed',
      estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };

    setOrders(prev => [newOrder, ...prev]);
    setCompletedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899']
      });
    } catch (e) {
      // ignore if confetti fails
    }

    addToast('Order Placed Successfully!', `Order #${orderId} confirmed!`, 'success');
    return newOrder;
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);
  const openCheckout = () => {
    if (cart.length === 0) {
      addToast('Bag is Empty', 'Please add items to your cart before checking out.', 'warn');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);
  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openTrackingModal = (orderId?: string) => {
    if (orderId) setTrackingQueryId(orderId);
    else if (orders.length > 0 && !trackingQueryId) setTrackingQueryId(orders[0].id);
    setIsTrackingModalOpen(true);
  };
  const closeTrackingModal = () => setIsTrackingModalOpen(false);

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedTag,
        setSelectedTag,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        inStockOnly,
        setInStockOnly,
        resetFilters,
        theme,
        toggleTheme,
        currency,
        toggleCurrency,
        formatPrice,
        cartCount,
        subtotal,
        discountAmount,
        shippingAmount,
        totalAmount,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isWishlistOpen,
        openWishlist,
        closeWishlist,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        completedOrder,
        setCompletedOrder,
        isTrackingModalOpen,
        openTrackingModal,
        closeTrackingModal,
        trackingQueryId,
        setTrackingQueryId,
        orders,
        placeOrder,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
