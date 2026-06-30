// FILE: lib/data/products.ts
import type { Product } from '@/types';

const MOCK_PRODUCTS: Product[] = [
  // 1. Oud Noir (Perfume)
  {
    id: 'prod-oud-noir',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'oud-noir-eau-de-parfum',
    name: 'Oud Noir',
    description: 'An elegant composition of rare Syrian oud, dark forest wood essences, and sweet rich honey notes. Designed for bold, unforgettable presences.',
    price: 2490,
    compareAtPrice: 2990,
    category: 'perfume-attor',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 24,
    scentNotes: {
      top: ['Honey', 'Saffron'],
      heart: ['Rose', 'Patchouli', 'Jasmin'],
      base: ['Cambodian Oud', 'Amber', 'Musk']
    },
    variants: [{ name: 'Size', options: ['50ml', '100ml'] }]
  },
  // 2. Blue Ocean (Perfume)
  {
    id: 'prod-blue-ocean',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'blue-ocean-eau-de-parfum',
    name: 'Blue Ocean',
    description: 'Fresh oceanic salt water accord paired with vibrant Calabrian bergamot and high-altitude white moss base notes.',
    price: 2190,
    category: 'perfume-attor',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 12,
    scentNotes: {
      top: ['Bergamot', 'Grapefruit'],
      heart: ['Sea Salt', 'Sage'],
      base: ['White Moss', 'Patchouli']
    },
    variants: [{ name: 'Size', options: ['50ml', '100ml'] }]
  },
  // 3. Royal Musk (Perfume)
  {
    id: 'prod-royal-musk',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'royal-musk-eau-de-parfum',
    name: 'Royal Musk',
    description: 'A velvet layer of powdery pure white musk blended with elegant soft damask rose petals and subtle dry amber wood.',
    price: 2290,
    compareAtPrice: 2490,
    category: 'perfume-attor',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 18,
    scentNotes: {
      top: ['White Rose', 'Lily of the Valley'],
      heart: ['Powdery Accord', 'Jasmine'],
      base: ['White Musk', 'Dry Amber']
    },
    variants: [{ name: 'Size', options: ['50ml', '100ml'] }]
  },
  // 4. Oud Royale - Premium Perfume
  {
    id: 'prod-oud-royale',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'oud-royale-eau-de-parfum',
    name: 'Oud Royale',
    description: 'An opulent composition of rare Cambodian oud, Bulgarian rose, and warm golden amber. A majestic scent that commands presence and lingers with quiet authority.',
    price: 2890,
    compareAtPrice: 3290,
    category: 'perfume-attor',
    images: [
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 15,
    scentNotes: {
      top: ['Spicy Nutmeg', 'Saffron'],
      heart: ['Bulgarian Rose', 'Patchouli'],
      base: ['Cambodian Oud', 'Golden Amber', 'Sandalwood']
    },
    variants: [{ name: 'Size', options: ['50ml', '100ml'] }]
  },
  // 5. Rose Damascena Attar - Concentrated Attar Oil
  {
    id: 'prod-rose-damascena',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'rose-damascena-attar',
    name: 'Rose Damascena Attar',
    description: 'Pure, alcohol-free concentrated oil attar crafted from hand-picked Damask rose petals. A deep, rich, and truly hypnotic rose formulation.',
    price: 1590,
    category: 'perfume-attor',
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 30,
    scentNotes: {
      top: ['Rose Buds', 'Geranium'],
      heart: ['Damask Rose', 'Jasmine'],
      base: ['Sandalwood Oil', 'Soft Musk']
    },
    variants: [{ name: 'Size', options: ['6ml Attar', '12ml Attar'] }]
  },
  // 6. Amber Imperial - Golden Amber Perfume
  {
    id: 'prod-amber-imperial',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'amber-imperial-perfume',
    name: 'Amber Imperial',
    description: 'A luxurious combination of warm vanilla orchid, sweet benzoin, and rich, deep imperial amber. Radiates a soothing warmth.',
    price: 2690,
    category: 'perfume-attor',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 20,
    scentNotes: {
      top: ['Bergamot', 'Pink Pepper'],
      heart: ['Vanilla Orchid', 'Benzoin'],
      base: ['Imperial Amber', 'Labdanum', 'Patchouli']
    },
    variants: [{ name: 'Size', options: ['50ml', '100ml'] }]
  },
  // 7. Sandalwood Gold - Attar Oil Blend
  {
    id: 'prod-sandalwood-gold',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'sandalwood-gold-attar',
    name: 'Sandalwood Gold',
    description: 'Rich, creamy Mysore sandalwood blend in a concentrated oil base. Combined with hint of sweet vanilla and white cedarwood.',
    price: 2390,
    category: 'perfume-attor',
    images: [
      'https://images.unsplash.com/photo-1588405748373-122b2321bc31?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 22,
    scentNotes: {
      top: ['Cardamom', 'Cedar Leaf'],
      heart: ['Mysore Sandalwood', 'Orris Root'],
      base: ['Creamy Vanilla', 'Amberwood', 'White Musk']
    },
    variants: [{ name: 'Size', options: ['6ml Attar', '12ml Attar'] }]
  },

  // ==========================================
  // WOMEN'S ATTARS (All 100% Model-free / Product-only)
  // ==========================================
  {
    id: 'prod-hareem-sultan',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'hareem-al-sultan-attar',
    name: 'Hareem Al Sultan Attar',
    description: 'A premium, alcohol-free sweet floral concentrated attar oil with soft notes of red apples, patchouli, and fresh jasmine.',
    price: 1890,
    category: 'womens-lifestyle',
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 15,
    scentNotes: {
      top: ['Red Apple', 'Mandarin'],
      heart: ['Fresh Jasmine', 'Peony'],
      base: ['Patchouli', 'Soft Musk', 'Vanilla orchid']
    },
    variants: [{ name: 'Size', options: ['6ml Attar', '12ml Attar'] }]
  },
  {
    id: 'prod-bakhoor-nissa',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'bakhoor-al-nissa-perfume',
    name: 'Bakhoor Al-Nissa',
    description: 'An elegant woody-floral spray featuring white agarwood smoke, sweet rose damascena, and vanilla orchid.',
    price: 2290,
    category: 'womens-lifestyle',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 20,
    scentNotes: {
      top: ['Rose Damascena', 'Saffron'],
      heart: ['Agarwood Smoke', 'White Orchid'],
      base: ['Sweet Vanilla', 'Sandalwood']
    },
    variants: [{ name: 'Size', options: ['50ml', '100ml'] }]
  },
  {
    id: 'prod-zahra-musk',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'zahra-musk-attar',
    name: 'Zahra Musk Attar',
    description: 'Pure concentrated white floral musk oil with hints of sweet vanilla, lily of the valley, and soft powder.',
    price: 1590,
    category: 'womens-lifestyle',
    images: [
      'https://images.unsplash.com/photo-1588405748373-122b2321bc31?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 18,
    scentNotes: {
      top: ['Lily of the Valley', 'Geranium'],
      heart: ['Pure White Musk', 'Rose Water'],
      base: ['Vanilla Orchid', 'Warm Powder']
    },
    variants: [{ name: 'Size', options: ['6ml Attar', '12ml Attar'] }]
  },
  {
    id: 'prod-ward-rose',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'ward-rose-supreme',
    name: 'Ward Rose Supreme',
    description: 'An exquisite floral spray composed of hand-picked Taif rose oil, soft white musk, and golden sweet vanilla.',
    price: 2490,
    category: 'womens-lifestyle',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 22,
    scentNotes: {
      top: ['Taif Rose', 'Bergamot'],
      heart: ['Damask Rose', 'Jasmine'],
      base: ['White Musk', 'Vanilla Orchid', 'Cedarwood']
    },
    variants: [{ name: 'Size', options: ['50ml', '100ml'] }]
  },
  {
    id: 'prod-amber-safi',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'amber-safi-attar',
    name: 'Amber Safi',
    description: 'Premium warm, sweet, alcohol-free concentrated amber oil attar. Very calming, rich, and stays on the skin for up to 36 hours.',
    price: 1990,
    category: 'womens-lifestyle',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 14,
    scentNotes: {
      top: ['Citrus Zest', 'Cardamom'],
      heart: ['Warm Benzoin', 'Labdanum'],
      base: ['Golden Amber', 'White Sandalwood', 'Vanilla Pod']
    },
    variants: [{ name: 'Size', options: ['6ml Attar', '12ml Attar'] }]
  },
  {
    id: 'prod-lulu-oud',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'lulu-oud-perfume',
    name: 'Lulu Oud',
    description: 'A soft, sweet feminine oud formulation with Bulgarian rose water, white sandalwood, and sweet honeyed musk.',
    price: 2790,
    category: 'womens-lifestyle',
    images: [
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 12,
    scentNotes: {
      top: ['Bulgarian Rose Water', 'Mandarin'],
      heart: ['Soft Cambodian Oud', 'Jasmine'],
      base: ['White Sandalwood', 'Honeyed Musk', 'Amber']
    },
    variants: [{ name: 'Size', options: ['50ml', '100ml'] }]
  },

  // ==========================================
  // OTHER CATEGORIES (Product-only)
  // ==========================================
  {
    id: 'prod-signature-shirt',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'signature-shirt-mens-shirt',
    name: 'Signature Shirt',
    description: 'Woven from long-staple Egyptian cotton thread. Elegant tailored details with double stitching and luxury pearl buttons.',
    price: 1590,
    category: 'mens-lifestyle',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 35,
    variants: [{ name: 'Size', options: ['M', 'L', 'XL', 'XXL'] }]
  },
  {
    id: 'prod-leather-wallet',
    tags: [],
    featured: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    slug: 'leather-wallet-premium-wallet',
    name: 'Leather Wallet',
    description: 'Crafted with certified full-grain vegetable-tanned leather. Holds up to 8 cards with designated quick-access pockets.',
    price: 1290,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 40,
    variants: [{ name: 'Color', options: ['Classic Black', 'Cognac Brown'] }]
  }
];

// ---------------------------------------------------------------------------
// Legacy id aliases (p1...p22) — orders.ts and carts.ts seed data reference
// these short ids. Rather than rewrite 85 orders + 13 carts, we generate
// clones of the real catalog products under the old ids so every lookup
// still resolves to a valid Product.
// ---------------------------------------------------------------------------

const LEGACY_ID_COUNT = 22;

const LEGACY_PRODUCTS: Product[] = Array.from({ length: LEGACY_ID_COUNT }, (_, i) => {
  const base = MOCK_PRODUCTS[i % MOCK_PRODUCTS.length];
  const id = `p${i + 1}`;
  return {
    ...base,
    id,
    slug: `${base.slug}-${id}`,
  };
});

const ALL_PRODUCTS: Product[] = [...MOCK_PRODUCTS, ...LEGACY_PRODUCTS];

// Synchronous export — needed by modules (carts.ts, orders.ts) that do
// in-memory lookups like `products.find((pr) => pr.id === id)` without awaiting.
export const products: Product[] = ALL_PRODUCTS;

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export async function fetchProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS;
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS;
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  return MOCK_PRODUCTS.filter((p) => p.category === category);
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.toLowerCase();
  return MOCK_PRODUCTS.filter(
    (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  );
}