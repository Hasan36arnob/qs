import type { ProductCategory, OrderStatus, OrderSource } from '@/types';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'mens-lifestyle',
    name: "Men's Lifestyle",
    description: 'Refined essentials for the modern gentleman',
    image: 'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
  },
  {
    id: 'womens-lifestyle',
    name: "Women's Lifestyle",
    description: 'Timeless elegance for the discerning woman',
    image: 'https://images.pexels.com/photos/1381553/pexels-photo-1381553.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
  },
  {
    id: 'perfume-attor',
    name: 'Perfume & Attor',
    description: 'Signature scents crafted with rare essences',
    image: 'https://images.pexels.com/photos/11705153/pexels-photo-11705153.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
  },
  {
    id: 'skincare',
    name: 'Skincare',
    description: 'Luxurious rituals for radiant skin',
    image: 'https://images.pexels.com/photos/4889036/pexels-photo-4889036.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'The finishing touches of distinction',
    image: 'https://images.pexels.com/photos/1132269/pexels-photo-1132269.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
  },
];

export const ORDER_STATUSES: OrderStatus[] = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
];

export const ORDER_SOURCES: OrderSource[] = [
  'facebook_ad',
  'instagram_ad',
  'google_ads',
  'organic_search',
  'direct',
  'whatsapp',
  'referral',
  'email_campaign',
];

export const DIVISIONS: string[] = [
  'Dhaka',
  'Chattogram',
  'Rajshahi',
  'Khulna',
  'Sylhet',
  'Barishal',
  'Rangpur',
  'Mymensingh',
];

export const DISTRICTS_BY_DIVISION: Record<string, string[]> = {
  Dhaka: ['Dhaka', 'Gazipur', 'Narayanganj', 'Manikganj', 'Munshiganj'],
  Chattogram: ['Chattogram', "Cox's Bazar", 'Comilla', 'Feni', 'Rangamati'],
  Rajshahi: ['Rajshahi', 'Bogura', 'Pabna', 'Natore', 'Sirajganj'],
  Khulna: ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat', 'Magura'],
  Sylhet: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  Barishal: ['Barishal', 'Barguna', 'Jhalokati', 'Patuakhali', 'Pirojpur'],
  Rangpur: ['Rangpur', 'Dinajpur', 'Nilphamari', 'Kurigram', 'Lalmonirhat'],
  Mymensingh: ['Mymensingh', 'Netrokona', 'Jamalpur', 'Sherpur'],
};

export const PAYMENT_METHODS = [
  {
    id: 'cod' as const,
    name: 'Cash on Delivery',
    description: 'Pay when you receive your order',
  },
  {
    id: 'card' as const,
    name: 'Card Payment',
    description: 'Visa, Mastercard, Amex',
  },
  {
    id: 'mobile-banking' as const,
    name: 'Mobile Banking',
    description: 'bKash, Nagad, Rocket',
  },
];

export const BRAND = {
  name: 'QASVANI',
  tagline: 'Luxury Lifestyle',
  description:
    'A curated collection of refined essentials — from signature scents to timeless apparel. Crafted for those who appreciate the art of living well.',
  email: 'concierge@qasvani.com',
  phone: '+880 1700 000000',
  address: 'Gulshan Avenue, Dhaka 1212, Bangladesh',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
  },
};

export const SHIPPING_FEE = 80;
export const FREE_SHIPPING_THRESHOLD = 5000;
