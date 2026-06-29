import type { Cart, CartItem } from '@/types';
import { products } from './products';

const p = (id: string) => products.find((pr) => pr.id === id)!;

const item = (id: string, quantity: number, variant?: string): CartItem => {
  const prod = p(id);
  return {
    productId: prod.id,
    name: prod.name,
    price: prod.price,
    quantity,
    variant,
    image: prod.images[0],
  };
};

const now = new Date();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600000).toISOString();
const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000).toISOString();

export const carts: Cart[] = [
  {
    id: 'CART-001',
    sessionId: 'sess-101',
    items: [item('p1', 1, '50ml'), item('p10', 2)],
    status: 'active',
    updatedAt: hoursAgo(1),
  },
  {
    id: 'CART-002',
    userId: 'u1',
    items: [item('p4', 1, 'M / Charcoal')],
    status: 'active',
    updatedAt: hoursAgo(0.5),
  },
  {
    id: 'CART-003',
    sessionId: 'sess-102',
    items: [item('p7', 1, 'S'), item('p14', 1, 'Gold')],
    status: 'active',
    updatedAt: hoursAgo(1.5),
  },
  {
    id: 'CART-004',
    sessionId: 'sess-103',
    items: [item('p2', 1, '12ml')],
    status: 'active',
    updatedAt: hoursAgo(0.2),
  },
  {
    id: 'CART-005',
    sessionId: 'sess-104',
    items: [item('p8', 1, 'M'), item('p11', 1)],
    status: 'abandoned',
    updatedAt: hoursAgo(5),
  },
  {
    id: 'CART-006',
    userId: 'u2',
    items: [item('p3', 1, '100ml'), item('p13', 2, 'Tan')],
    status: 'abandoned',
    updatedAt: hoursAgo(8),
  },
  {
    id: 'CART-007',
    sessionId: 'sess-105',
    items: [item('p16', 1, '50ml')],
    status: 'abandoned',
    updatedAt: hoursAgo(12),
  },
  {
    id: 'CART-008',
    sessionId: 'sess-106',
    items: [item('p5', 3, 'L'), item('p22', 2, 'L')],
    status: 'abandoned',
    updatedAt: hoursAgo(20),
  },
  {
    id: 'CART-009',
    userId: 'u3',
    items: [item('p17', 1, '34'), item('p15', 1, '36')],
    status: 'abandoned',
    updatedAt: daysAgo(2),
  },
  {
    id: 'CART-010',
    sessionId: 'sess-107',
    items: [item('p9', 1, 'M'), item('p18', 1, 'S')],
    status: 'abandoned',
    updatedAt: daysAgo(3),
  },
  {
    id: 'CART-011',
    userId: 'u4',
    items: [item('p1', 1, '100ml')],
    status: 'converted',
    updatedAt: daysAgo(1),
  },
  {
    id: 'CART-012',
    userId: 'u5',
    items: [item('p7', 1, 'S'), item('p10', 1)],
    status: 'converted',
    updatedAt: daysAgo(2),
  },
  {
    id: 'CART-013',
    sessionId: 'sess-108',
    items: [item('p4', 1, 'L / Camel'), item('p13', 1, 'Cognac')],
    status: 'converted',
    updatedAt: daysAgo(4),
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchCarts(): Promise<Cart[]> {
  await delay(300);
  return [...carts];
}

export async function fetchAbandonedCarts(): Promise<Cart[]> {
  await delay(300);
  return carts.filter((c) => c.status === 'abandoned');
}

export async function fetchActiveCarts(): Promise<Cart[]> {
  await delay(300);
  return carts.filter((c) => c.status === 'active');
}
