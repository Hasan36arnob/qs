// FILE: app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle, Truck, RefreshCw, ShieldCheck, Mail, X } from 'lucide-react';
import { fetchFeaturedProducts } from '@/lib/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { CATEGORIES } from '@/lib/constants'; // Re-imported constants registry
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

const SLIDES = [
  {
    tag: 'SIGNATURE SCENT',
    title: 'Oud Noir Collection',
    desc: 'Timeless. Bold. Unforgettable. A fragrance masterwork that defines clean luxury.',
    // Cool, moody black glass perfume on dark wet stone slate with deep shadows
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1920&q=80',
    link: '/product/oud-noir-eau-de-parfum'
  },
  {
    tag: 'PREMIUM BLEND',
    title: 'Dehn Al Oud Attar',
    desc: 'Intricate floral metallic framing containing double-distilled aged oud wood oils.',
    // Highly cinematic gold perfume oil bottle cast in stark shadows and rich dark contrast
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1920&q=80',
    link: '/product/dehn-al-oud-attar'
  }
];

const BLOGS = [
  {
    title: 'পারফিউম ব্যবহারের ৫টি টিপস',
    date: 'May 10, 2025',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'কোন পারফিউম কখন ব্যবহার করবেন?',
    date: 'May 08, 2025',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Oud: সুগন্ধির রাজা কেন?',
    date: 'May 05, 2025',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'গিফট আইডিয়া: বিশেষ মানুষের জন্য',
    date: 'May 01, 2025',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80'
  }
];

export default function HomePage() {
  const { data: featured, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: fetchFeaturedProducts,
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'welcome' | 'freedelivery' | 'newsletter'>('welcome');
  const [emailInput, setEmailInput] = useState('');

  // Extract dynamic safe images from central constants registry
  const perfumeCat = CATEGORIES.find(c => c.id === 'perfume-attor');
  const mensWearCat = CATEGORIES.find(c => c.id === 'mens-wear');
  const accessoriesCat = CATEGORIES.find(c => c.id === 'accessories');

  useEffect(() => {
    const dismissedTime = localStorage.getItem('qasvani-popup-dismissed');
    const now = Date.now();
    if (!dismissedTime || now - parseInt(dismissedTime) > 7 * 24 * 60 * 60 * 1000) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('qasvani-popup-dismissed', Date.now().toString());
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      closePopup();
    }
  };

  return (
    <div className="relative">
      {/* 1. Popups Manager */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-cream-50 border border-qgold p-8 shadow-2xl">
            <button 
              onClick={closePopup}
              className="absolute right-4 top-4 text-charcoal-500 hover:text-charcoal-900"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {popupType === 'welcome' && (
              <div className="text-center space-y-4">
                <p className="font-serif text-xs uppercase tracking-widest text-qgold font-semibold">QASVANI LUXURY</p>
                <h3 className="font-serif text-3xl font-bold text-qprimary">স্বাগতম QASVANI-তে!</h3>
                <div className="aspect-[16/9] w-full overflow-hidden bg-cream-200">
                  <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80" alt="Welcome Scent" className="h-full w-full object-cover" />
                </div>
                <p className="text-sm text-charcoal-600 font-bengali">
                  আপনার প্রথম অর্ডারে পাবেন <span className="font-bold text-qaccent">10% ছাড়!</span>
                </p>
                <div className="border border-dashed border-qgold py-2 bg-cream-100 text-sm tracking-widest font-mono text-qprimary font-bold">
                  কুপন কোড: QASVANI10
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setPopupType('freedelivery'); }}
                    className="flex-1 border border-qprimary py-3 text-xs uppercase font-medium tracking-wider text-qprimary hover:bg-cream-200 transition-colors"
                  >
                    Next Offer
                  </button>
                  <button 
                    onClick={closePopup}
                    className="flex-1 bg-qprimary py-3 text-xs uppercase font-medium tracking-wider text-cream-100 hover:bg-qprimary-hover transition-colors"
                  >
                    এখনই শপ করুন
                  </button>
                </div>
              </div>
            )}

            {popupType === 'freedelivery' && (
              <div className="text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-qaccent/10 text-qaccent">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-qprimary">ফ্রি ডেলিভারি</h3>
                <p className="text-sm text-charcoal-600 font-bengali">
                  যেকোনো অর্ডারে <span className="font-bold text-qprimary">৳১,০০০+</span> মূল্যের পণ্য কিনলেই পাচ্ছেন সারাদেশে সম্পূর্ণ ফ্রি হোম ডেলিভারি সুবিধা!
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setPopupType('newsletter'); }}
                    className="flex-1 border border-qprimary py-3 text-xs uppercase font-medium tracking-wider text-qprimary hover:bg-cream-200 transition-colors"
                  >
                    Subscribe Panel
                  </button>
                  <button 
                    onClick={closePopup}
                    className="flex-1 bg-qprimary py-3 text-xs uppercase font-medium tracking-wider text-cream-100 hover:bg-qprimary-hover transition-colors"
                  >
                    এখনই অর্ডার করুন
                  </button>
                </div>
              </div>
            )}

            {popupType === 'newsletter' && (
              <div className="text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-qgold/10 text-qgold">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-qprimary">এক্সক্লুসিভ অফার পেতে সাবস্ক্রাইব করুন</h3>
                <p className="text-xs text-charcoal-500">নতুন কালেকশন এবং প্রাইভেট ইভেন্ট অফারের আপডেট সবার আগে পান।</p>
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input 
                    type="email" 
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="আপনার ইমেইল দিন" 
                    className="w-full border border-cream-300 bg-white px-4 py-3 text-sm text-charcoal-800 focus:border-qprimary focus:outline-none"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-qprimary py-3 text-xs uppercase font-medium tracking-wider text-cream-100 hover:bg-qprimary-hover transition-colors"
                  >
                    সাবস্ক্রাইব করুন
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Hero Interactive Slider */}
      <section className="relative h-[75vh] w-full overflow-hidden bg-charcoal-900">
        <img
          src={SLIDES[activeSlide].image}
          alt={SLIDES[activeSlide].title}
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-700 ease-luxury"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/95 via-charcoal-900/40 to-transparent" />
        
        <div className="container-luxury relative flex h-full flex-col justify-center text-left">
          <div className="max-w-2xl space-y-4">
            <span className="inline-block bg-qgold px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-charcoal-900 font-sans">
              {SLIDES[activeSlide].tag}
            </span>
            <h1 className="font-serif text-5xl font-bold leading-tight text-cream-100 md:text-7xl">
              {SLIDES[activeSlide].title}
            </h1>
            <p className="max-w-md text-sm text-cream-200/80 leading-relaxed font-sans md:text-base">
              {SLIDES[activeSlide].desc}
            </p>
            <div className="pt-4">
              <Link
                href={SLIDES[activeSlide].link}
                className="inline-flex items-center gap-2 border border-qgold bg-qprimary px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-cream-100 transition-colors hover:bg-qgold hover:text-charcoal-900"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <button 
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-cream-300/30 bg-charcoal-800/40 p-3 text-cream-100 transition-colors hover:bg-qgold hover:text-charcoal-900 md:left-8"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button 
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-cream-300/30 bg-charcoal-800/40 p-3 text-cream-100 transition-colors hover:bg-qgold hover:text-charcoal-900 md:right-8"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={cn(
                'h-2 w-2 rounded-full transition-all',
                activeSlide === idx ? 'w-8 bg-qgold' : 'bg-cream-300/50'
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 3. Featured Products Grid */}
      <section className="container-luxury py-20">
        <div className="mb-12 flex flex-col justify-between items-start gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-widest text-qgold font-semibold">POPULAR ESSENTIALS</p>
            <h2 className="mt-1 font-serif text-4xl text-qprimary font-bold">
              FEATURED PRODUCTS <span className="text-sm font-sans font-normal text-charcoal-500">(নতুন ও জনপ্রিয় প্রোডাক্ট)</span>
            </h2>
          </div>
          <Link
            href="/category/perfume-attor"
            className="flex items-center gap-1.5 text-sm font-semibold tracking-wider text-qprimary hover:text-qgold transition-colors"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-3">
                <div className="aspect-square bg-cream-200" />
                <div className="h-4 w-3/4 bg-cream-200" />
                <div className="h-4 w-1/2 bg-cream-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {featured?.slice(0, 5).map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Highlights Bar under Featured Products */}
      <section className="bg-cream-200 py-10 border-y border-cream-300">
        <div className="container-luxury grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-center text-center space-y-2">
            <Truck className="h-8 w-8 text-qprimary" strokeWidth={1.5} />
            <h4 className="font-bengali font-bold text-sm text-qprimary">ফ্রি ডেলিভারি</h4>
            <p className="text-xs text-charcoal-500 font-bengali">৳১,০০০+ অর্ডারে সম্পূর্ণ ফ্রি ডেলিভারি</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <RefreshCw className="h-8 w-8 text-qprimary" strokeWidth={1.5} />
            <h4 className="font-bengali font-bold text-sm text-qprimary">সহজ রিটার্ন</h4>
            <p className="text-xs text-charcoal-500 font-bengali">৭ দিনের সহজ রিটার্ন সুবিধা</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <CheckCircle className="h-8 w-8 text-qprimary" strokeWidth={1.5} />
            <h4 className="font-bengali font-bold text-sm text-qprimary">১০০% অরিজিনাল</h4>
            <p className="text-xs text-charcoal-500 font-bengali">সরাসরি উপাদান নিশ্চিতকরণ গ্যারান্টি</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <ShieldCheck className="h-8 w-8 text-qprimary" strokeWidth={1.5} />
            <h4 className="font-bengali font-bold text-sm text-qprimary">সিকিউর পেমেন্ট</h4>
            <p className="text-xs text-charcoal-500 font-bengali">শতভাগ নিরাপদ অনলাইন পেমেন্ট</p>
          </div>
        </div>
      </section>

      {/* 5. Top Collections Block */}
      <section className="container-luxury py-20">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-qgold font-semibold">EXPLORE</p>
          <h2 className="mt-1 font-serif text-4xl text-qprimary font-bold">TOP COLLECTIONS</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group relative aspect-[4/5] overflow-hidden bg-cream-200">
            <img src={perfumeCat?.image || SLIDES[0].image} alt="Perfume" className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 space-y-1">
              <h3 className="font-serif text-2xl text-cream-100">PERFUME</h3>
              <p className="text-xs text-cream-200/80 uppercase tracking-widest">Collection</p>
              <Link href="/category/perfume-attor" className="mt-2 inline-flex items-center gap-1 text-xs text-qgold font-semibold uppercase hover:underline">
                Explore Now →
              </Link>
            </div>
          </div>

          <div className="group relative aspect-[4/5] overflow-hidden bg-cream-200">
            <img src={mensWearCat?.image || SLIDES[1].image} alt="Mens wear" className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 space-y-1">
              <h3 className="font-serif text-2xl text-cream-100">MEN&apos;S WEAR</h3>
              <p className="text-xs text-cream-200/80 uppercase tracking-widest">Collection</p>
              <Link href="/category/mens-wear" className="mt-2 inline-flex items-center gap-1 text-xs text-qgold font-semibold uppercase hover:underline">
                Explore Now →
              </Link>
            </div>
          </div>

          <div className="group relative aspect-[4/5] overflow-hidden bg-cream-200">
            <img src={accessoriesCat?.image || "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"} alt="Accessories" className="h-full w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 space-y-1">
              <h3 className="font-serif text-2xl text-cream-100">ACCESSORIES</h3>
              <p className="text-xs text-cream-200/80 uppercase tracking-widest">Collection</p>
              <Link href="/category/accessories" className="mt-2 inline-flex items-center gap-1 text-xs text-qgold font-semibold uppercase hover:underline">
                Explore Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Story Segment (আমাদের গল্প) */}
      <section className="bg-cream-50 py-20 border-t border-cream-300">
        <div className="container-luxury grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden bg-cream-200">
            <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80" alt="Handcrafted Perfume Bottling" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-widest text-qgold font-semibold">OUR STORY (আমাদের গল্প)</p>
            <h2 className="font-serif text-4xl text-qprimary font-bold">আমরা কেন আলাদা?</h2>
            <p className="text-sm text-charcoal-600 leading-relaxed font-bengali">
              QASVANI শুরু হয়েছে একটি স্বপ্ন নিয়ে – প্রিমিয়াম কোয়ালিটির লাইফস্টাইল পণ্য সবার জন্য সহজলভ্য করা। আমরা প্রতিটি সুগন্ধি নিজস্ব গবেষণাগারে কাস্টমাইজেশন করে প্রস্তুত করি, যেখানে ব্যবহৃত হয় বিশ্বখ্যাত সেরা উপাদানসমূহ।
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="border border-cream-300 p-4 bg-white">
                <span className="block text-2xl font-bold text-qgold">১০০%</span>
                <span className="text-xs font-bengali text-charcoal-700">নিজস্ব কাস্টমাইজেশন</span>
              </div>
              <div className="border border-cream-300 p-4 bg-white">
                <span className="block text-2xl font-bold text-qaccent">প্রিমিয়াম</span>
                <span className="text-xs font-bengali text-charcoal-700">উপাদান ফর্মুলেশন</span>
              </div>
              <div className="border border-cream-300 p-4 bg-white">
                <span className="block text-2xl font-bold text-qprimary">২৪ ঘণ্টা+</span>
                <span className="text-xs font-bengali text-charcoal-700">দীর্ঘস্থায়ী সুগন্ধ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Stories & Tips (ব্লগ ও টিপস) */}
      <section className="container-luxury py-20">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-qgold font-semibold">ARTICLES & GUIDES</p>
          <h2 className="mt-1 font-serif text-4xl text-qprimary font-bold">স্টোরি & টিপস (ব্লগ ও টিপস)</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BLOGS.map((blog, idx) => (
            <article key={idx} className="group border border-cream-200 bg-white p-4 transition-shadow hover:shadow-md">
              <div className="aspect-[4/3] overflow-hidden bg-cream-100">
                <img src={blog.image} alt={blog.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="mt-4 space-y-2">
                <time className="text-xs text-charcoal-400">{blog.date}</time>
                <h3 className="font-bengali text-base font-bold text-charcoal-800 line-clamp-2 hover:text-qprimary transition-colors">
                  {blog.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}