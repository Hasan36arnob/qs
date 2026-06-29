import type { Event, EventType } from '@/types';

/**
 * Mock event data modeling an e-commerce behavior funnel:
 *   product_view (50) > add_to_cart (25) > checkout_initiate (12) > purchase (8)
 *
 * Timestamps are spread across March, April, and May 2025. Most events are
 * anonymous (sessionId only); a subset are attributed to known users (u1..u5).
 */

const productViewSources = [
  'facebook_ad',
  'instagram_ad',
  'google_ads',
  'organic_search',
  'direct',
  'referral',
  'email_campaign',
];

const checkoutSources = [
  'facebook_ad',
  'instagram_ad',
  'google_ads',
  'organic_search',
  'direct',
  'whatsapp',
];

const paymentMethods = ['cod', 'card', 'mobile-banking'];

// Helper to build an ISO timestamp for a given day in the March-May 2025 window.
function ts(month: number, day: number, hour: number, minute: number): string {
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  const h = String(hour).padStart(2, '0');
  const min = String(minute).padStart(2, '0');
  return `2025-${m}-${d}T${h}:${min}:00Z`;
}

export const events: Event[] = [
  // ---------------------------------------------------------------------------
  // product_view — 50 events (top of funnel)
  // ---------------------------------------------------------------------------
  { id: 'e001', eventType: 'product_view', sessionId: 'sess-001', productId: 'p1', metadata: { source: 'facebook_ad' }, timestamp: ts(3, 1, 9, 12) },
  { id: 'e002', eventType: 'product_view', sessionId: 'sess-002', productId: 'p3', metadata: { source: 'instagram_ad' }, timestamp: ts(3, 1, 10, 45) },
  { id: 'e003', eventType: 'product_view', userId: 'u1', sessionId: 'sess-003', productId: 'p5', metadata: { source: 'google_ads' }, timestamp: ts(3, 2, 14, 20) },
  { id: 'e004', eventType: 'product_view', sessionId: 'sess-004', productId: 'p2', metadata: { source: 'organic_search' }, timestamp: ts(3, 2, 16, 5) },
  { id: 'e005', eventType: 'product_view', sessionId: 'sess-005', productId: 'p7', metadata: { source: 'direct' }, timestamp: ts(3, 3, 11, 30) },
  { id: 'e006', eventType: 'product_view', sessionId: 'sess-006', productId: 'p10', metadata: { source: 'facebook_ad' }, timestamp: ts(3, 3, 13, 15) },
  { id: 'e007', eventType: 'product_view', userId: 'u2', sessionId: 'sess-007', productId: 'p4', metadata: { source: 'referral' }, timestamp: ts(3, 4, 9, 50) },
  { id: 'e008', eventType: 'product_view', sessionId: 'sess-008', productId: 'p6', metadata: { source: 'email_campaign' }, timestamp: ts(3, 4, 15, 22) },
  { id: 'e009', eventType: 'product_view', sessionId: 'sess-009', productId: 'p8', metadata: { source: 'instagram_ad' }, timestamp: ts(3, 5, 10, 10) },
  { id: 'e010', eventType: 'product_view', sessionId: 'sess-010', productId: 'p12', metadata: { source: 'facebook_ad' }, timestamp: ts(3, 5, 17, 40) },
  { id: 'e011', eventType: 'product_view', sessionId: 'sess-011', productId: 'p1', metadata: { source: 'google_ads' }, timestamp: ts(3, 6, 8, 55) },
  { id: 'e012', eventType: 'product_view', userId: 'u3', sessionId: 'sess-012', productId: 'p15', metadata: { source: 'organic_search' }, timestamp: ts(3, 6, 12, 18) },
  { id: 'e013', eventType: 'product_view', sessionId: 'sess-013', productId: 'p9', metadata: { source: 'direct' }, timestamp: ts(3, 7, 14, 5) },
  { id: 'e014', eventType: 'product_view', sessionId: 'sess-014', productId: 'p11', metadata: { source: 'facebook_ad' }, timestamp: ts(3, 7, 19, 30) },
  { id: 'e015', eventType: 'product_view', sessionId: 'sess-015', productId: 'p14', metadata: { source: 'instagram_ad' }, timestamp: ts(3, 8, 10, 25) },
  { id: 'e016', eventType: 'product_view', sessionId: 'sess-016', productId: 'p18', metadata: { source: 'referral' }, timestamp: ts(3, 8, 13, 42) },
  { id: 'e017', eventType: 'product_view', sessionId: 'sess-017', productId: 'p20', metadata: { source: 'google_ads' }, timestamp: ts(3, 9, 9, 15) },
  { id: 'e018', eventType: 'product_view', userId: 'u4', sessionId: 'sess-018', productId: 'p2', metadata: { source: 'email_campaign' }, timestamp: ts(3, 9, 16, 50) },
  { id: 'e019', eventType: 'product_view', sessionId: 'sess-019', productId: 'p5', metadata: { source: 'facebook_ad' }, timestamp: ts(3, 10, 11, 5) },
  { id: 'e020', eventType: 'product_view', sessionId: 'sess-020', productId: 'p7', metadata: { source: 'organic_search' }, timestamp: ts(3, 10, 15, 30) },
  { id: 'e021', eventType: 'product_view', sessionId: 'sess-021', productId: 'p13', metadata: { source: 'instagram_ad' }, timestamp: ts(3, 11, 10, 0) },
  { id: 'e022', eventType: 'product_view', sessionId: 'sess-022', productId: 'p16', metadata: { source: 'direct' }, timestamp: ts(3, 11, 14, 18) },
  { id: 'e023', eventType: 'product_view', sessionId: 'sess-023', productId: 'p22', metadata: { source: 'facebook_ad' }, timestamp: ts(3, 12, 9, 40) },
  { id: 'e024', eventType: 'product_view', sessionId: 'sess-024', productId: 'p3', metadata: { source: 'google_ads' }, timestamp: ts(3, 12, 17, 22) },
  { id: 'e025', eventType: 'product_view', userId: 'u5', sessionId: 'sess-025', productId: 'p19', metadata: { source: 'referral' }, timestamp: ts(3, 13, 11, 55) },
  { id: 'e026', eventType: 'product_view', sessionId: 'sess-026', productId: 'p1', metadata: { source: 'facebook_ad' }, timestamp: ts(3, 14, 13, 10) },
  { id: 'e027', eventType: 'product_view', sessionId: 'sess-027', productId: 'p4', metadata: { source: 'instagram_ad' }, timestamp: ts(3, 14, 18, 35) },
  { id: 'e028', eventType: 'product_view', sessionId: 'sess-028', productId: 'p8', metadata: { source: 'organic_search' }, timestamp: ts(3, 15, 10, 20) },
  { id: 'e029', eventType: 'product_view', sessionId: 'sess-029', productId: 'p10', metadata: { source: 'direct' }, timestamp: ts(3, 15, 15, 45) },
  { id: 'e030', eventType: 'product_view', sessionId: 'sess-030', productId: 'p17', metadata: { source: 'email_campaign' }, timestamp: ts(3, 16, 9, 5) },
  { id: 'e031', eventType: 'product_view', sessionId: 'sess-031', productId: 'p6', metadata: { source: 'facebook_ad' }, timestamp: ts(3, 16, 12, 30) },
  { id: 'e032', eventType: 'product_view', userId: 'u1', sessionId: 'sess-032', productId: 'p21', metadata: { source: 'google_ads' }, timestamp: ts(3, 17, 14, 50) },
  { id: 'e033', eventType: 'product_view', sessionId: 'sess-033', productId: 'p9', metadata: { source: 'instagram_ad' }, timestamp: ts(3, 17, 16, 15) },
  { id: 'e034', eventType: 'product_view', sessionId: 'sess-034', productId: 'p12', metadata: { source: 'referral' }, timestamp: ts(3, 18, 10, 40) },
  { id: 'e035', eventType: 'product_view', sessionId: 'sess-035', productId: 'p15', metadata: { source: 'facebook_ad' }, timestamp: ts(3, 18, 13, 25) },
  { id: 'e036', eventType: 'product_view', sessionId: 'sess-036', productId: 'p2', metadata: { source: 'organic_search' }, timestamp: ts(3, 19, 11, 0) },
  { id: 'e037', eventType: 'product_view', sessionId: 'sess-037', productId: 'p5', metadata: { source: 'direct' }, timestamp: ts(3, 19, 17, 30) },
  { id: 'e038', eventType: 'product_view', sessionId: 'sess-038', productId: 'p11', metadata: { source: 'email_campaign' }, timestamp: ts(3, 20, 9, 35) },
  { id: 'e039', eventType: 'product_view', userId: 'u2', sessionId: 'sess-039', productId: 'p14', metadata: { source: 'google_ads' }, timestamp: ts(3, 20, 14, 10) },
  { id: 'e040', eventType: 'product_view', sessionId: 'sess-040', productId: 'p18', metadata: { source: 'facebook_ad' }, timestamp: ts(3, 21, 10, 50) },
  { id: 'e041', eventType: 'product_view', sessionId: 'sess-041', productId: 'p20', metadata: { source: 'instagram_ad' }, timestamp: ts(3, 21, 15, 20) },
  { id: 'e042', eventType: 'product_view', sessionId: 'sess-042', productId: 'p7', metadata: { source: 'referral' }, timestamp: ts(3, 22, 12, 5) },
  { id: 'e043', eventType: 'product_view', sessionId: 'sess-043', productId: 'p13', metadata: { source: 'organic_search' }, timestamp: ts(3, 22, 16, 40) },
  { id: 'e044', eventType: 'product_view', sessionId: 'sess-044', productId: 'p1', metadata: { source: 'direct' }, timestamp: ts(3, 23, 9, 25) },
  { id: 'e045', eventType: 'product_view', sessionId: 'sess-045', productId: 'p16', metadata: { source: 'facebook_ad' }, timestamp: ts(3, 23, 13, 50) },
  { id: 'e046', eventType: 'product_view', userId: 'u3', sessionId: 'sess-046', productId: 'p22', metadata: { source: 'google_ads' }, timestamp: ts(3, 24, 10, 15) },
  { id: 'e047', eventType: 'product_view', sessionId: 'sess-047', productId: 'p3', metadata: { source: 'email_campaign' }, timestamp: ts(3, 24, 14, 30) },
  { id: 'e048', eventType: 'product_view', sessionId: 'sess-048', productId: 'p8', metadata: { source: 'instagram_ad' }, timestamp: ts(3, 25, 11, 40) },
  { id: 'e049', eventType: 'product_view', sessionId: 'sess-049', productId: 'p19', metadata: { source: 'facebook_ad' }, timestamp: ts(3, 25, 17, 5) },
  { id: 'e050', eventType: 'product_view', sessionId: 'sess-050', productId: 'p4', metadata: { source: 'organic_search' }, timestamp: ts(3, 26, 9, 0) },

  // ---------------------------------------------------------------------------
  // add_to_cart — 25 events
  // ---------------------------------------------------------------------------
  { id: 'e051', eventType: 'add_to_cart', sessionId: 'sess-001', productId: 'p1', metadata: { quantity: 1 }, timestamp: ts(3, 1, 9, 18) },
  { id: 'e052', eventType: 'add_to_cart', userId: 'u1', sessionId: 'sess-003', productId: 'p5', metadata: { quantity: 2 }, timestamp: ts(3, 2, 14, 28) },
  { id: 'e053', eventType: 'add_to_cart', sessionId: 'sess-006', productId: 'p10', metadata: { quantity: 1 }, timestamp: ts(3, 3, 13, 22) },
  { id: 'e054', eventType: 'add_to_cart', userId: 'u2', sessionId: 'sess-007', productId: 'p4', metadata: { quantity: 1 }, timestamp: ts(3, 4, 9, 58) },
  { id: 'e055', eventType: 'add_to_cart', sessionId: 'sess-009', productId: 'p8', metadata: { quantity: 3 }, timestamp: ts(3, 5, 10, 18) },
  { id: 'e056', eventType: 'add_to_cart', sessionId: 'sess-011', productId: 'p1', metadata: { quantity: 1 }, timestamp: ts(3, 6, 9, 2) },
  { id: 'e057', eventType: 'add_to_cart', userId: 'u3', sessionId: 'sess-012', productId: 'p15', metadata: { quantity: 1 }, timestamp: ts(3, 6, 12, 25) },
  { id: 'e058', eventType: 'add_to_cart', sessionId: 'sess-013', productId: 'p9', metadata: { quantity: 2 }, timestamp: ts(3, 7, 14, 12) },
  { id: 'e059', eventType: 'add_to_cart', sessionId: 'sess-015', productId: 'p14', metadata: { quantity: 1 }, timestamp: ts(3, 8, 10, 32) },
  { id: 'e060', eventType: 'add_to_cart', userId: 'u4', sessionId: 'sess-018', productId: 'p2', metadata: { quantity: 1 }, timestamp: ts(3, 9, 16, 55) },
  { id: 'e061', eventType: 'add_to_cart', sessionId: 'sess-019', productId: 'p5', metadata: { quantity: 2 }, timestamp: ts(3, 10, 11, 12) },
  { id: 'e062', eventType: 'add_to_cart', sessionId: 'sess-021', productId: 'p13', metadata: { quantity: 1 }, timestamp: ts(3, 11, 10, 8) },
  { id: 'e063', eventType: 'add_to_cart', sessionId: 'sess-023', productId: 'p22', metadata: { quantity: 1 }, timestamp: ts(3, 12, 9, 45) },
  { id: 'e064', eventType: 'add_to_cart', userId: 'u5', sessionId: 'sess-025', productId: 'p19', metadata: { quantity: 2 }, timestamp: ts(3, 13, 12, 2) },
  { id: 'e065', eventType: 'add_to_cart', sessionId: 'sess-026', productId: 'p1', metadata: { quantity: 1 }, timestamp: ts(3, 14, 13, 15) },
  { id: 'e066', eventType: 'add_to_cart', sessionId: 'sess-028', productId: 'p8', metadata: { quantity: 1 }, timestamp: ts(3, 15, 10, 25) },
  { id: 'e067', eventType: 'add_to_cart', sessionId: 'sess-031', productId: 'p6', metadata: { quantity: 3 }, timestamp: ts(3, 16, 12, 35) },
  { id: 'e068', eventType: 'add_to_cart', userId: 'u1', sessionId: 'sess-032', productId: 'p21', metadata: { quantity: 1 }, timestamp: ts(3, 17, 14, 55) },
  { id: 'e069', eventType: 'add_to_cart', sessionId: 'sess-035', productId: 'p15', metadata: { quantity: 2 }, timestamp: ts(3, 18, 13, 30) },
  { id: 'e070', eventType: 'add_to_cart', userId: 'u2', sessionId: 'sess-039', productId: 'p14', metadata: { quantity: 1 }, timestamp: ts(3, 20, 14, 15) },
  { id: 'e071', eventType: 'add_to_cart', sessionId: 'sess-040', productId: 'p18', metadata: { quantity: 1 }, timestamp: ts(3, 21, 10, 55) },
  { id: 'e072', eventType: 'add_to_cart', sessionId: 'sess-042', productId: 'p7', metadata: { quantity: 2 }, timestamp: ts(3, 22, 12, 10) },
  { id: 'e073', eventType: 'add_to_cart', sessionId: 'sess-044', productId: 'p1', metadata: { quantity: 1 }, timestamp: ts(3, 23, 9, 30) },
  { id: 'e074', eventType: 'add_to_cart', userId: 'u3', sessionId: 'sess-046', productId: 'p22', metadata: { quantity: 1 }, timestamp: ts(3, 24, 10, 20) },
  { id: 'e075', eventType: 'add_to_cart', sessionId: 'sess-049', productId: 'p19', metadata: { quantity: 2 }, timestamp: ts(3, 25, 17, 10) },

  // ---------------------------------------------------------------------------
  // checkout_initiate — 12 events
  // ---------------------------------------------------------------------------
  { id: 'e076', eventType: 'checkout_initiate', sessionId: 'sess-001', productId: 'p1', metadata: { source: 'facebook_ad', itemCount: 1 }, timestamp: ts(3, 1, 9, 25) },
  { id: 'e077', eventType: 'checkout_initiate', userId: 'u1', sessionId: 'sess-003', productId: 'p5', metadata: { source: 'google_ads', itemCount: 2 }, timestamp: ts(3, 2, 14, 35) },
  { id: 'e078', eventType: 'checkout_initiate', userId: 'u2', sessionId: 'sess-007', productId: 'p4', metadata: { source: 'referral', itemCount: 1 }, timestamp: ts(3, 4, 10, 5) },
  { id: 'e079', eventType: 'checkout_initiate', sessionId: 'sess-011', productId: 'p1', metadata: { source: 'google_ads', itemCount: 1 }, timestamp: ts(3, 6, 9, 10) },
  { id: 'e080', eventType: 'checkout_initiate', userId: 'u3', sessionId: 'sess-012', productId: 'p15', metadata: { source: 'organic_search', itemCount: 1 }, timestamp: ts(3, 6, 12, 32) },
  { id: 'e081', eventType: 'checkout_initiate', userId: 'u4', sessionId: 'sess-018', productId: 'p2', metadata: { source: 'email_campaign', itemCount: 1 }, timestamp: ts(3, 9, 17, 2) },
  { id: 'e082', eventType: 'checkout_initiate', userId: 'u5', sessionId: 'sess-025', productId: 'p19', metadata: { source: 'referral', itemCount: 2 }, timestamp: ts(3, 13, 12, 10) },
  { id: 'e083', eventType: 'checkout_initiate', sessionId: 'sess-026', productId: 'p1', metadata: { source: 'facebook_ad', itemCount: 1 }, timestamp: ts(3, 14, 13, 22) },
  { id: 'e084', eventType: 'checkout_initiate', userId: 'u1', sessionId: 'sess-032', productId: 'p21', metadata: { source: 'google_ads', itemCount: 1 }, timestamp: ts(3, 17, 15, 0) },
  { id: 'e085', eventType: 'checkout_initiate', userId: 'u2', sessionId: 'sess-039', productId: 'p14', metadata: { source: 'google_ads', itemCount: 1 }, timestamp: ts(3, 20, 14, 22) },
  { id: 'e086', eventType: 'checkout_initiate', userId: 'u3', sessionId: 'sess-046', productId: 'p22', metadata: { source: 'google_ads', itemCount: 1 }, timestamp: ts(3, 24, 10, 28) },
  { id: 'e087', eventType: 'checkout_initiate', sessionId: 'sess-049', productId: 'p19', metadata: { source: 'facebook_ad', itemCount: 2 }, timestamp: ts(3, 25, 17, 18) },

  // ---------------------------------------------------------------------------
  // purchase — 8 events (bottom of funnel)
  // ---------------------------------------------------------------------------
  { id: 'e088', eventType: 'purchase', userId: 'u1', sessionId: 'sess-003', productId: 'p5', metadata: { total: 19600, paymentMethod: 'card', orderId: 'ord-101' }, timestamp: ts(3, 2, 14, 42) },
  { id: 'e089', eventType: 'purchase', userId: 'u2', sessionId: 'sess-007', productId: 'p4', metadata: { total: 7200, paymentMethod: 'cod', orderId: 'ord-102' }, timestamp: ts(3, 4, 10, 15) },
  { id: 'e090', eventType: 'purchase', userId: 'u3', sessionId: 'sess-012', productId: 'p15', metadata: { total: 6500, paymentMethod: 'mobile-banking', orderId: 'ord-103' }, timestamp: ts(3, 6, 12, 40) },
  { id: 'e091', eventType: 'purchase', userId: 'u4', sessionId: 'sess-018', productId: 'p2', metadata: { total: 8500, paymentMethod: 'card', orderId: 'ord-104' }, timestamp: ts(3, 9, 17, 10) },
  { id: 'e092', eventType: 'purchase', userId: 'u5', sessionId: 'sess-025', productId: 'p19', metadata: { total: 14000, paymentMethod: 'cod', orderId: 'ord-105' }, timestamp: ts(3, 13, 12, 20) },
  { id: 'e093', eventType: 'purchase', userId: 'u1', sessionId: 'sess-032', productId: 'p21', metadata: { total: 11200, paymentMethod: 'mobile-banking', orderId: 'ord-106' }, timestamp: ts(3, 17, 15, 8) },
  { id: 'e094', eventType: 'purchase', userId: 'u2', sessionId: 'sess-039', productId: 'p14', metadata: { total: 9800, paymentMethod: 'card', orderId: 'ord-107' }, timestamp: ts(3, 20, 14, 30) },
  { id: 'e095', eventType: 'purchase', userId: 'u3', sessionId: 'sess-046', productId: 'p22', metadata: { total: 5400, paymentMethod: 'cod', orderId: 'ord-108' }, timestamp: ts(3, 24, 10, 35) },

  // ---------------------------------------------------------------------------
  // April 2025 — continued funnel activity
  // ---------------------------------------------------------------------------
  { id: 'e096', eventType: 'product_view', sessionId: 'sess-051', productId: 'p1', metadata: { source: 'facebook_ad' }, timestamp: ts(4, 2, 10, 15) },
  { id: 'e097', eventType: 'product_view', sessionId: 'sess-052', productId: 'p3', metadata: { source: 'instagram_ad' }, timestamp: ts(4, 2, 14, 30) },
  { id: 'e098', eventType: 'product_view', userId: 'u4', sessionId: 'sess-053', productId: 'p6', metadata: { source: 'google_ads' }, timestamp: ts(4, 3, 9, 45) },
  { id: 'e099', eventType: 'product_view', sessionId: 'sess-054', productId: 'p9', metadata: { source: 'organic_search' }, timestamp: ts(4, 3, 13, 20) },
  { id: 'e100', eventType: 'product_view', sessionId: 'sess-055', productId: 'p11', metadata: { source: 'direct' }, timestamp: ts(4, 4, 11, 10) },
  { id: 'e101', eventType: 'product_view', sessionId: 'sess-056', productId: 'p17', metadata: { source: 'facebook_ad' }, timestamp: ts(4, 4, 16, 55) },
  { id: 'e102', eventType: 'product_view', userId: 'u5', sessionId: 'sess-057', productId: 'p20', metadata: { source: 'referral' }, timestamp: ts(4, 5, 10, 40) },
  { id: 'e103', eventType: 'product_view', sessionId: 'sess-058', productId: 'p2', metadata: { source: 'email_campaign' }, timestamp: ts(4, 5, 15, 25) },
  { id: 'e104', eventType: 'product_view', sessionId: 'sess-059', productId: 'p8', metadata: { source: 'instagram_ad' }, timestamp: ts(4, 6, 9, 30) },
  { id: 'e105', eventType: 'product_view', sessionId: 'sess-060', productId: 'p13', metadata: { source: 'facebook_ad' }, timestamp: ts(4, 6, 14, 12) },
  { id: 'e106', eventType: 'add_to_cart', sessionId: 'sess-051', productId: 'p1', metadata: { quantity: 1 }, timestamp: ts(4, 2, 10, 22) },
  { id: 'e107', eventType: 'add_to_cart', userId: 'u4', sessionId: 'sess-053', productId: 'p6', metadata: { quantity: 2 }, timestamp: ts(4, 3, 9, 52) },
  { id: 'e108', eventType: 'add_to_cart', sessionId: 'sess-055', productId: 'p11', metadata: { quantity: 1 }, timestamp: ts(4, 4, 11, 18) },
  { id: 'e109', eventType: 'add_to_cart', userId: 'u5', sessionId: 'sess-057', productId: 'p20', metadata: { quantity: 1 }, timestamp: ts(4, 5, 10, 48) },
  { id: 'e110', eventType: 'add_to_cart', sessionId: 'sess-060', productId: 'p13', metadata: { quantity: 2 }, timestamp: ts(4, 6, 14, 20) },
  { id: 'e111', eventType: 'checkout_initiate', sessionId: 'sess-051', productId: 'p1', metadata: { source: 'facebook_ad', itemCount: 1 }, timestamp: ts(4, 2, 10, 30) },
  { id: 'e112', eventType: 'checkout_initiate', userId: 'u4', sessionId: 'sess-053', productId: 'p6', metadata: { source: 'google_ads', itemCount: 2 }, timestamp: ts(4, 3, 10, 0) },
  { id: 'e113', eventType: 'checkout_initiate', userId: 'u5', sessionId: 'sess-057', productId: 'p20', metadata: { source: 'referral', itemCount: 1 }, timestamp: ts(4, 5, 10, 55) },
  { id: 'e114', eventType: 'purchase', userId: 'u4', sessionId: 'sess-053', productId: 'p6', metadata: { total: 15600, paymentMethod: 'card', orderId: 'ord-109' }, timestamp: ts(4, 3, 10, 8) },
  { id: 'e115', eventType: 'purchase', userId: 'u5', sessionId: 'sess-057', productId: 'p20', metadata: { total: 7800, paymentMethod: 'cod', orderId: 'ord-110' }, timestamp: ts(4, 5, 11, 2) },

  // ---------------------------------------------------------------------------
  // May 2025 — continued funnel activity
  // ---------------------------------------------------------------------------
  { id: 'e116', eventType: 'product_view', sessionId: 'sess-061', productId: 'p1', metadata: { source: 'facebook_ad' }, timestamp: ts(5, 1, 9, 20) },
  { id: 'e117', eventType: 'product_view', sessionId: 'sess-062', productId: 'p10', metadata: { source: 'instagram_ad' }, timestamp: ts(5, 1, 13, 45) },
  { id: 'e118', eventType: 'product_view', userId: 'u1', sessionId: 'sess-063', productId: 'p16', metadata: { source: 'google_ads' }, timestamp: ts(5, 2, 10, 15) },
  { id: 'e119', eventType: 'product_view', sessionId: 'sess-064', productId: 'p4', metadata: { source: 'organic_search' }, timestamp: ts(5, 2, 15, 30) },
  { id: 'e120', eventType: 'product_view', sessionId: 'sess-065', productId: 'p7', metadata: { source: 'direct' }, timestamp: ts(5, 3, 11, 50) },
  { id: 'e121', eventType: 'product_view', sessionId: 'sess-066', productId: 'p12', metadata: { source: 'facebook_ad' }, timestamp: ts(5, 3, 14, 5) },
  { id: 'e122', eventType: 'product_view', userId: 'u2', sessionId: 'sess-067', productId: 'p19', metadata: { source: 'referral' }, timestamp: ts(5, 4, 9, 35) },
  { id: 'e123', eventType: 'product_view', sessionId: 'sess-068', productId: 'p22', metadata: { source: 'email_campaign' }, timestamp: ts(5, 4, 16, 20) },
  { id: 'e124', eventType: 'product_view', sessionId: 'sess-069', productId: 'p5', metadata: { source: 'instagram_ad' }, timestamp: ts(5, 5, 10, 10) },
  { id: 'e125', eventType: 'product_view', sessionId: 'sess-070', productId: 'p14', metadata: { source: 'facebook_ad' }, timestamp: ts(5, 5, 17, 25) },
  { id: 'e126', eventType: 'add_to_cart', sessionId: 'sess-061', productId: 'p1', metadata: { quantity: 1 }, timestamp: ts(5, 1, 9, 28) },
  { id: 'e127', eventType: 'add_to_cart', userId: 'u1', sessionId: 'sess-063', productId: 'p16', metadata: { quantity: 2 }, timestamp: ts(5, 2, 10, 22) },
  { id: 'e128', eventType: 'add_to_cart', userId: 'u2', sessionId: 'sess-067', productId: 'p19', metadata: { quantity: 1 }, timestamp: ts(5, 4, 9, 42) },
  { id: 'e129', eventType: 'add_to_cart', sessionId: 'sess-069', productId: 'p5', metadata: { quantity: 3 }, timestamp: ts(5, 5, 10, 18) },
  { id: 'e130', eventType: 'checkout_initiate', sessionId: 'sess-061', productId: 'p1', metadata: { source: 'facebook_ad', itemCount: 1 }, timestamp: ts(5, 1, 9, 35) },
  { id: 'e131', eventType: 'checkout_initiate', userId: 'u1', sessionId: 'sess-063', productId: 'p16', metadata: { source: 'google_ads', itemCount: 2 }, timestamp: ts(5, 2, 10, 30) },
  { id: 'e132', eventType: 'purchase', userId: 'u1', sessionId: 'sess-063', productId: 'p16', metadata: { total: 16800, paymentMethod: 'card', orderId: 'ord-111' }, timestamp: ts(5, 2, 10, 38) },
];

// ---------------------------------------------------------------------------
// Async fetch helpers (simulate network latency)
// ---------------------------------------------------------------------------

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/** Fetch all events, optionally filtered by event type. */
export async function fetchEvents(eventType?: EventType): Promise<Event[]> {
  const filtered = eventType
    ? events.filter((e) => e.eventType === eventType)
    : events;
  return delay(filtered);
}

/** Fetch events for a single event type. */
export async function fetchEventsByType(eventType: EventType): Promise<Event[]> {
  return delay(events.filter((e) => e.eventType === eventType));
}

export interface FunnelData {
  product_view: number;
  add_to_cart: number;
  checkout_initiate: number;
  purchase: number;
}

/** Fetch funnel counts for each event type, in funnel order. */
export async function fetchFunnelData(): Promise<FunnelData> {
  const counts: FunnelData = {
    product_view: 0,
    add_to_cart: 0,
    checkout_initiate: 0,
    purchase: 0,
  };
  for (const e of events) {
    counts[e.eventType] += 1;
  }
  return delay(counts);
}

// Re-export for convenience so callers can import everything from one module.
export { productViewSources, checkoutSources, paymentMethods };
