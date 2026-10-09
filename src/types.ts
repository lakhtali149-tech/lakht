export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'Electronics' | 'Fashion' | 'Home & Living' | 'Audio & Wearables' | 'Footwear';
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  images: string[];
  inStock: number;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  badge?: 'HOT' | 'BESTSELLER' | 'LIMITED' | '25% OFF' | '30% OFF' | '35% OFF' | '40% OFF' | 'NEW' | string;
  tags: ('bestseller' | 'sale' | 'trending' | 'new' | 'featured')[];
  features: string[];
  specifications: Record<string, string>;
  isFeaturedWheel?: boolean;
}

export interface CartItem {
  id: string; // unique item instance id (productId + color + size)
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  color?: string;
  size?: string;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercentage?: number;
  discountFixed?: number;
  freeShipping?: boolean;
  minSpend?: number;
  description: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode?: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  productName: string;
  comment: string;
  avatar: string;
}
