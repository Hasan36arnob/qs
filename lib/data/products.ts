import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Oud Royale Eau de Parfum',
    slug: 'oud-royale-eau-de-parfum',
    description:
      'An opulent composition of rare Cambodian oud, Bulgarian rose, and warm amber. A scent that commands presence and lingers with quiet authority.',
    category: 'perfume-attor',
    price: 12500,
    compareAtPrice: 15000,
    images: [
      'https://picsum.photos/seed/oud-royale-1/800/800',
      'https://picsum.photos/seed/oud-royale-2/800/800',
      'https://picsum.photos/seed/oud-royale-3/800/800',
    ],
    variants: [{ name: 'Size', options: ['50ml', '100ml'] }],
    stock: 24,
    scentNotes: {
      top: ['Saffron', 'Bergamot'],
      heart: ['Bulgarian Rose', 'Cambodian Oud'],
      base: ['Amber', 'Sandalwood', 'Musk'],
    },
    tags: ['bestseller', 'luxury', 'unisex'],
    createdAt: '2025-01-15T10:00:00Z',
    featured: true,
  },
  {
    id: 'p2',
    name: 'Noir Intense Attar',
    slug: 'noir-intense-attar',
    description:
      'A concentrated oil-based fragrance blending dark oud, leather, and smoky vetiver. Alcohol-free and long-lasting.',
    category: 'perfume-attor',
    price: 8500,
    images: [
      'https://picsum.photos/seed/noir-intense-1/800/800',
      'https://picsum.photos/seed/noir-intense-2/800/800',
    ],
    variants: [{ name: 'Size', options: ['12ml', '24ml'] }],
    stock: 40,
    scentNotes: {
      top: ['Black Pepper', 'Cardamom'],
      heart: ['Dark Oud', 'Leather'],
      base: ['Vetiver', 'Patchouli'],
    },
    tags: ['attar', 'alcohol-free', 'long-lasting'],
    createdAt: '2025-02-01T10:00:00Z',
    featured: true,
  },
  {
    id: 'p3',
    name: 'Rose Taif Eau de Parfum',
    slug: 'rose-taif-eau-de-parfum',
    description:
      'A delicate yet radiant floral built around the legendary Taif rose, softened by white musk and gentle woods.',
    category: 'perfume-attor',
    price: 9800,
    images: [
      'https://picsum.photos/seed/rose-taif-1/800/800',
      'https://picsum.photos/seed/rose-taif-2/800/800',
    ],
    variants: [{ name: 'Size', options: ['50ml', '100ml'] }],
    stock: 18,
    scentNotes: {
      top: ['Pink Pepper', 'Lychee'],
      heart: ['Taif Rose', 'Peony'],
      base: ['White Musk', 'Cedar'],
    },
    tags: ['floral', 'feminine', 'bestseller'],
    createdAt: '2025-01-20T10:00:00Z',
    featured: true,
  },
  {
    id: 'p4',
    name: 'Cashmere Overcoat — Charcoal',
    slug: 'cashmere-overcoat-charcoal',
    description:
      'A tailored overcoat in premium cashmere blend. Timeless silhouette with horn buttons and full Bemberg lining.',
    category: 'mens-lifestyle',
    price: 18500,
    compareAtPrice: 22000,
    images: [
      'https://picsum.photos/seed/overcoat-charcoal-1/800/800',
      'https://picsum.photos/seed/overcoat-charcoal-2/800/800',
      'https://picsum.photos/seed/overcoat-charcoal-3/800/800',
    ],
    variants: [
      { name: 'Size', options: ['S', 'M', 'L', 'XL'] },
      { name: 'Color', options: ['Charcoal', 'Camel'] },
    ],
    stock: 12,
    tags: ['outerwear', 'winter', 'premium'],
    createdAt: '2025-01-10T10:00:00Z',
    featured: true,
  },
  {
    id: 'p5',
    name: 'Linen Shirt — Ivory',
    slug: 'linen-shirt-ivory',
    description:
      'Breathable European linen with a relaxed yet refined cut. Mother-of-pearl buttons and a soft pre-washed finish.',
    category: 'mens-lifestyle',
    price: 4200,
    images: [
      'https://picsum.photos/seed/linen-ivory-1/800/800',
      'https://picsum.photos/seed/linen-ivory-2/800/800',
    ],
    variants: [
      { name: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] },
    ],
    stock: 60,
    tags: ['essentials', 'summer', 'linen'],
    createdAt: '2025-02-15T10:00:00Z',
    featured: false,
  },
  {
    id: 'p6',
    name: 'Merino Crew Sweater — Taupe',
    slug: 'merino-crew-sweater-taupe',
    description:
      'Fine-gauge extra-fine merino wool with a smooth hand and elegant drape. Perfect for layering through the seasons.',
    category: 'mens-lifestyle',
    price: 5800,
    images: [
      'https://picsum.photos/seed/merino-taupe-1/800/800',
      'https://picsum.photos/seed/merino-taupe-2/800/800',
    ],
    variants: [{ name: 'Size', options: ['S', 'M', 'L', 'XL'] }],
    stock: 35,
    tags: ['knitwear', 'essentials'],
    createdAt: '2025-01-25T10:00:00Z',
    featured: false,
  },
  {
    id: 'p7',
    name: 'Silk Slip Dress — Champagne',
    slug: 'silk-slip-dress-champagne',
    description:
      'A bias-cut slip dress in pure mulberry silk. Fluid movement with adjustable straps and a subtle cowl back.',
    category: 'womens-lifestyle',
    price: 12500,
    compareAtPrice: 15000,
    images: [
      'https://picsum.photos/seed/silk-slip-1/800/800',
      'https://picsum.photos/seed/silk-slip-2/800/800',
      'https://picsum.photos/seed/silk-slip-3/800/800',
    ],
    variants: [
      { name: 'Size', options: ['XS', 'S', 'M', 'L'] },
    ],
    stock: 15,
    tags: ['silk', 'evening', 'bestseller'],
    createdAt: '2025-02-05T10:00:00Z',
    featured: true,
  },
  {
    id: 'p8',
    name: 'Wool Wrap Coat — Camel',
    slug: 'wool-wrap-coat-camel',
    description:
      'A double-faced wool wrap coat with a self-tie belt. Sculptural collar and clean, minimalist lines.',
    category: 'womens-lifestyle',
    price: 16500,
    images: [
      'https://picsum.photos/seed/wrap-coat-camel-1/800/800',
      'https://picsum.photos/seed/wrap-coat-camel-2/800/800',
    ],
    variants: [
      { name: 'Size', options: ['XS', 'S', 'M', 'L'] },
    ],
    stock: 10,
    tags: ['outerwear', 'winter', 'premium'],
    createdAt: '2025-01-12T10:00:00Z',
    featured: true,
  },
  {
    id: 'p9',
    name: 'Cashmere Cardigan — Blush',
    slug: 'cashmere-cardigan-blush',
    description:
      'An open-front cardigan in pure cashmere. Cloud-soft texture with a relaxed, elegant silhouette.',
    category: 'womens-lifestyle',
    price: 8900,
    images: [
      'https://picsum.photos/seed/cashmere-blush-1/800/800',
      'https://picsum.photos/seed/cashmere-blush-2/800/800',
    ],
    variants: [{ name: 'Size', options: ['XS', 'S', 'M', 'L'] }],
    stock: 22,
    tags: ['cashmere', 'knitwear'],
    createdAt: '2025-02-10T10:00:00Z',
    featured: false,
  },
  {
    id: 'p10',
    name: 'Radiance Facial Serum',
    slug: 'radiance-facial-serum',
    description:
      'A lightweight serum with niacinamide, hyaluronic acid, and vitamin C. Brightens, hydrates, and evens skin tone.',
    category: 'skincare',
    price: 3200,
    images: [
      'https://picsum.photos/seed/serum-radiance-1/800/800',
      'https://picsum.photos/seed/serum-radiance-2/800/800',
    ],
    variants: [{ name: 'Size', options: ['30ml', '50ml'] }],
    stock: 80,
    skinType: 'All skin types',
    tags: ['bestseller', 'vitamin-c', 'brightening'],
    createdAt: '2025-01-18T10:00:00Z',
    featured: true,
  },
  {
    id: 'p11',
    name: 'Hydrating Night Cream',
    slug: 'hydrating-night-cream',
    description:
      'A rich overnight treatment with ceramides, peptides, and shea butter. Restores moisture and elasticity.',
    category: 'skincare',
    price: 2800,
    images: [
      'https://picsum.photos/seed/night-cream-1/800/800',
      'https://picsum.photos/seed/night-cream-2/800/800',
    ],
    variants: [{ name: 'Size', options: ['50ml'] }],
    stock: 65,
    skinType: 'Dry to normal',
    tags: ['night', 'hydrating', 'ceramides'],
    createdAt: '2025-01-22T10:00:00Z',
    featured: false,
  },
  {
    id: 'p12',
    name: 'Gentle Cleansing Foam',
    slug: 'gentle-cleansing-foam',
    description:
      'A pH-balanced foaming cleanser with green tea extract and glycerin. Removes impurities without stripping.',
    category: 'skincare',
    price: 1800,
    images: [
      'https://picsum.photos/seed/cleanser-foam-1/800/800',
      'https://picsum.photos/seed/cleanser-foam-2/800/800',
    ],
    variants: [{ name: 'Size', options: ['150ml'] }],
    stock: 100,
    skinType: 'All skin types',
    tags: ['cleanser', 'essentials', 'gentle'],
    createdAt: '2025-02-12T10:00:00Z',
    featured: false,
  },
  {
    id: 'p13',
    name: 'Leather Card Holder — Tan',
    slug: 'leather-card-holder-tan',
    description:
      'A slim card holder in full-grain Italian leather. Four card slots and a center pocket. Ages beautifully.',
    category: 'accessories',
    price: 2200,
    images: [
      'https://picsum.photos/seed/card-holder-tan-1/800/800',
      'https://picsum.photos/seed/card-holder-tan-2/800/800',
    ],
    variants: [{ name: 'Color', options: ['Tan', 'Black', 'Cognac'] }],
    stock: 50,
    tags: ['leather', 'gift', 'essentials'],
    createdAt: '2025-01-28T10:00:00Z',
    featured: true,
  },
  {
    id: 'p14',
    name: 'Silk Scarf — Gold Paisley',
    slug: 'silk-scarf-gold-paisley',
    description:
      'A hand-rolled silk twill scarf with an intricate gold and cream paisley motif. 90cm x 90cm.',
    category: 'accessories',
    price: 4800,
    images: [
      'https://picsum.photos/seed/scarf-gold-1/800/800',
      'https://picsum.photos/seed/scarf-gold-2/800/800',
    ],
    variants: [{ name: 'Color', options: ['Gold', 'Ivory'] }],
    stock: 28,
    tags: ['silk', 'gift', 'bestseller'],
    createdAt: '2025-02-08T10:00:00Z',
    featured: true,
  },
  {
    id: 'p15',
    name: 'Leather Belt — Cognac',
    slug: 'leather-belt-cognac',
    description:
      'A 35mm full-grain leather belt with a brushed brass buckle. Handcrafted and stitched in Italy.',
    category: 'accessories',
    price: 3500,
    images: [
      'https://picsum.photos/seed/belt-cognac-1/800/800',
      'https://picsum.photos/seed/belt-cognac-2/800/800',
    ],
    variants: [
      { name: 'Size', options: ['32', '34', '36', '38', '40'] },
    ],
    stock: 40,
    tags: ['leather', 'essentials'],
    createdAt: '2025-01-30T10:00:00Z',
    featured: false,
  },
  {
    id: 'p16',
    name: 'Amber Velvet Eau de Parfum',
    slug: 'amber-velvet-eau-de-parfum',
    description:
      'A warm, enveloping scent of amber, vanilla orchid, and tonka bean. Soft, sensual, and deeply comforting.',
    category: 'perfume-attor',
    price: 11000,
    images: [
      'https://picsum.photos/seed/amber-velvet-1/800/800',
      'https://picsum.photos/seed/amber-velvet-2/800/800',
    ],
    variants: [{ name: 'Size', options: ['50ml', '100ml'] }],
    stock: 20,
    scentNotes: {
      top: ['Bergamot', 'Cinnamon'],
      heart: ['Vanilla Orchid', 'Amber'],
      base: ['Tonka Bean', 'Benzoin', 'Sandalwood'],
    },
    tags: ['warm', 'amber', 'unisex'],
    createdAt: '2025-02-18T10:00:00Z',
    featured: false,
  },
  {
    id: 'p17',
    name: 'Tailored Wool Trousers — Navy',
    slug: 'tailored-wool-trousers-navy',
    description:
      'A flat-front trouser in Italian wool. Clean lines, a comfortable mid-rise, and a refined taper.',
    category: 'mens-lifestyle',
    price: 6500,
    images: [
      'https://picsum.photos/seed/trousers-navy-1/800/800',
      'https://picsum.photos/seed/trousers-navy-2/800/800',
    ],
    variants: [
      { name: 'Size', options: ['30', '32', '34', '36', '38'] },
    ],
    stock: 30,
    tags: ['tailoring', 'essentials', 'wool'],
    createdAt: '2025-02-20T10:00:00Z',
    featured: false,
  },
  {
    id: 'p18',
    name: 'Pleated Midi Skirt — Stone',
    slug: 'pleated-midi-skirt-stone',
    description:
      'A high-waisted pleated midi skirt in a fluid technical crepe. Effortless movement and elegant drape.',
    category: 'womens-lifestyle',
    price: 5200,
    images: [
      'https://picsum.photos/seed/skirt-stone-1/800/800',
      'https://picsum.photos/seed/skirt-stone-2/800/800',
    ],
    variants: [
      { name: 'Size', options: ['XS', 'S', 'M', 'L'] },
    ],
    stock: 25,
    tags: ['essentials', 'midi'],
    createdAt: '2025-02-22T10:00:00Z',
    featured: false,
  },
  {
    id: 'p19',
    name: 'Vitamin C Brightening Mask',
    slug: 'vitamin-c-brightening-mask',
    description:
      'A clay-and-cream mask with vitamin C, kaolin, and turmeric. Brightens and refines in 10 minutes.',
    category: 'skincare',
    price: 2400,
    images: [
      'https://picsum.photos/seed/mask-vitc-1/800/800',
      'https://picsum.photos/seed/mask-vitc-2/800/800',
    ],
    variants: [{ name: 'Size', options: ['75ml'] }],
    stock: 55,
    skinType: 'Dull and uneven',
    tags: ['mask', 'brightening', 'vitamin-c'],
    createdAt: '2025-02-25T10:00:00Z',
    featured: false,
  },
  {
    id: 'p20',
    name: 'Sunglasses — Tortoise',
    slug: 'sunglasses-tortoise',
    description:
      'A classic round-frame sunglass in hand-polished acetate. UV400 lenses with a keyhole bridge.',
    category: 'accessories',
    price: 5500,
    images: [
      'https://picsum.photos/seed/sunglasses-tortoise-1/800/800',
      'https://picsum.photos/seed/sunglasses-tortoise-2/800/800',
    ],
    variants: [{ name: 'Color', options: ['Tortoise', 'Black'] }],
    stock: 18,
    tags: ['eyewear', 'gift'],
    createdAt: '2025-02-28T10:00:00Z',
    featured: false,
  },
  {
    id: 'p21',
    name: 'White Musk Attar',
    slug: 'white-musk-attar',
    description:
      'A clean, skin-like attar of white musk, soft florals, and a whisper of vanilla. Alcohol-free.',
    category: 'perfume-attor',
    price: 6500,
    images: [
      'https://picsum.photos/seed/white-musk-1/800/800',
      'https://picsum.photos/seed/white-musk-2/800/800',
    ],
    variants: [{ name: 'Size', options: ['12ml', '24ml'] }],
    stock: 45,
    scentNotes: {
      top: ['Aldehydes'],
      heart: ['White Musk', 'Jasmine'],
      base: ['Vanilla', 'Sandalwood'],
    },
    tags: ['attar', 'alcohol-free', 'clean'],
    createdAt: '2025-03-01T10:00:00Z',
    featured: false,
  },
  {
    id: 'p22',
    name: 'Oxford Shirt — White',
    slug: 'oxford-shirt-white',
    description:
      'A classic Oxford cotton shirt with a button-down collar. Woven from premium long-staple cotton.',
    category: 'mens-lifestyle',
    price: 3200,
    images: [
      'https://picsum.photos/seed/oxford-white-1/800/800',
      'https://picsum.photos/seed/oxford-white-2/800/800',
    ],
    variants: [
      { name: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] },
    ],
    stock: 70,
    tags: ['essentials', 'oxford', 'cotton'],
    createdAt: '2025-03-03T10:00:00Z',
    featured: false,
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProducts(): Promise<Product[]> {
  await delay(300);
  return products;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  await delay(200);
  return products.find((p) => p.slug === slug) ?? null;
}

export async function fetchProductsByCategory(
  category: string,
): Promise<Product[]> {
  await delay(300);
  return products.filter((p) => p.category === category);
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  await delay(300);
  return products.filter((p) => p.featured);
}

export async function searchProducts(query: string): Promise<Product[]> {
  await delay(200);
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
