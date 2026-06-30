// FILE: lib/constants.ts

export const BRAND = {
  name: 'QASVANI',
  description: 'প্রিমিয়াম সুগন্ধি এবং লাইফস্টাইল কালেকশন। আমরা প্রতিটি পণ্য নিখুঁত ভালোবাসা এবং যত্ন সহকারে তৈরি করি যাতে আপনি সেরা অভিজ্ঞতা লাভ করেন।',
  email: 'support@qasvani.com',
  phone: '+880 1234-567890',
  address: 'বনানী, ঢাকা, বাংলাদেশ',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
  },
};

export const CATEGORIES = [
  {
    id: 'perfume-attor',
    name: 'PERFUME (সুগন্ধি)',
    description: 'অভিজাত সুগন্ধি ও আতরের অনন্য সংকলন',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mens-wear',
    name: 'MEN\'S WEAR (পুরুষদের পোশাক)',
    description: 'মার্জিত রুচির প্রিমিয়াম শার্ট ও পাঞ্জাবি',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'womens-wear',
    name: 'WOMEN\'S ATTAR & PERFUME (নারীদের সুগন্ধি ও আতর)',
    description: 'নারীদের জন্য বিশেষভাবে তৈরি অত্যন্ত মনোরম ও বিলাসবহুল আতর এবং সুগন্ধি কালেকশন',
    // High-contrast, dark-toned luxury gold-and-black perfume bottle
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'accessories',
    name: 'ACCESSORIES (এক্সেসরিজ)',
    description: 'চামড়ার মানিব্যাগ, বেল্ট ও প্রিমিয়াম ঘড়ি',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'hair-care',
    name: 'HAIR CARE (হেয়ার কেয়ার)',
    description: 'চুলের যত্নে প্রাকৃতিক উপাদান সমৃদ্ধ ফর্মুলা',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'skincare',
    name: 'SKINCARE (স্কিনকেয়ার)',
    description: 'ত্বকের প্রাকৃতিক দীপ্তি বজায় রাখার রিচুয়াল',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
  },
];

export const PAYMENT_METHODS = [
  {
    id: 'cod' as const,
    name: 'Cash on Delivery (ক্যাশ অন ডেলিভারি)',
    description: 'পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন। সারা বাংলাদেশে প্রযোজ্য।',
  },
  {
    id: 'card' as const,
    name: 'Online Payment (কার্ড বা নেট ব্যাংকিং)',
    description: 'যেকোনো ভিসা, মাস্টারকার্ড বা স্থানীয় ডেবিট কার্ডের মাধ্যমে পেমেন্ট করুন।',
  },
  {
    id: 'mobile-banking' as const,
    name: 'Mobile Banking (বিকাশ / রকেট / নগদ)',
    description: 'দ্রুত এবং নিরাপদ উপায়ে মোবাইল ওয়ালেট ব্যবহার করে পেমেন্ট করুন।',
  },
];

export const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const;
export const ORDER_SOURCES = ['direct_website', 'facebook_page', 'instagram_shop', 'whatsapp_order'];

export const SHIPPING_FEE = 60;
export const FREE_SHIPPING_THRESHOLD = 1000;

export const DIVISIONS = [
  'Dhaka',
  'Chattogram',
  'Sylhet',
  'Khulna',
  'Rajshahi',
  'Barishal',
  'Rangpur',
  'Mymensingh',
];

export const DISTRICTS_BY_DIVISION: Record<string, string[]> = {
  Dhaka: [
    'Dhaka',
    'Gazipur',
    'Narayanganj',
    'Tangail',
    'Faridpur',
    'Manikganj',
    'Munshiganj',
    'Narsingdi',
    'Gopalganj',
    'Madaripur',
    'Rajbari',
    'Shariatpur',
    'Kishoreganj',
  ],
  Chattogram: [
    'Chattogram',
    'Cox\'s Bazar',
    'Cumilla',
    'Feni',
    'Noakhali',
    'Brahmanbaria',
    'Chandpur',
    'Lakshmipur',
    'Rangamati',
    'Khagrachhari',
    'Bandarban',
  ],
  Sylhet: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  Khulna: [
    'Khulna',
    'Jessore',
    'Kushtia',
    'Satkhira',
    'Bagerhat',
    'Jhenaidah',
    'Chuadanga',
    'Meherpur',
    'Magura',
    'Narail',
  ],
  Rajshahi: [
    'Rajshahi',
    'Bogra',
    'Pabna',
    'Naogaon',
    'Natore',
    'Chapai Nawabganj',
    'Joypurhat',
    'Sirajganj',
  ],
  Barishal: ['Barishal', 'Bhola', 'Patuakhali', 'Pirojpur', 'Jhalokati', 'Barguna'],
  Rangpur: [
    'Rangpur',
    'Dinajpur',
    'Gaibandha',
    'Kurigram',
    'Lalmonirhat',
    'Nilphamari',
    'Panchagarh',
    'Thakurgaon',
  ],
  Mymensingh: ['Mymensingh', 'Netrokona', 'Sherpur', 'Jamalpur'],
};