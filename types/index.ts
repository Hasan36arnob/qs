export type ProductCategory =
  | 'mens-lifestyle'
  | 'womens-lifestyle'
  | 'perfume-attor'
  | 'skincare'
  | 'accessories';

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface ScentNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  images: string[];
  variants?: ProductVariant[];
  stock: number;
  scentNotes?: ScentNotes;
  skinType?: string;
  tags: string[];
  createdAt: string;
  featured: boolean;
}

export type AddressLabel = 'Home' | 'Office' | 'Other';

export interface Address {
  id: string;
  label: AddressLabel;
  fullName: string;
  phone: string;
  division: string;
  district: string;
  area: string;
  detail: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  createdAt: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type OrderSource =
  | 'facebook_ad'
  | 'instagram_ad'
  | 'google_ads'
  | 'organic_search'
  | 'direct'
  | 'whatsapp'
  | 'referral'
  | 'email_campaign';

export type PaymentMethod = 'cod' | 'card' | 'mobile-banking';

export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  image: string;
}

export interface Order {
  id: string;
  userId?: string;
  sessionId?: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  source: OrderSource;
  utm?: UTMParams;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  image: string;
}

export type CartStatus = 'active' | 'abandoned' | 'converted';

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  status: CartStatus;
  updatedAt: string;
}

export type EventType =
  | 'product_view'
  | 'add_to_cart'
  | 'checkout_initiate'
  | 'purchase';

export interface Event {
  id: string;
  eventType: EventType;
  userId?: string;
  sessionId: string;
  productId?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
  lastOrderDate?: string;
  isActive: boolean;
}
