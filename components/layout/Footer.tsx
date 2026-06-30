// FILE: components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-cream-300 bg-cream-200 pt-16 pb-8">
      <div className="container-luxury">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About Qasvani */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-[0.2em] text-qprimary">
              QASVANI
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed font-bengali">
              {BRAND.description}
            </p>
            <div className="flex gap-4">
              <a href={BRAND.social.instagram} className="text-charcoal-500 hover:text-qprimary"><Instagram className="h-5 w-5" /></a>
              <a href={BRAND.social.facebook} className="text-charcoal-500 hover:text-qprimary"><Facebook className="h-5 w-5" /></a>
              <a href={BRAND.social.twitter} className="text-charcoal-500 hover:text-qprimary"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Shop/Navigation Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal-500 font-bengali">
              ABOUT QASVANI
            </h4>
            <ul className="space-y-2 text-sm font-bengali">
              <li><Link href="/" className="text-charcoal-600 hover:text-qprimary">আমাদের গল্প</Link></li>
              <li><Link href="/" className="text-charcoal-600 hover:text-qprimary">আমরা কেন আলাদা</Link></li>
              <li><Link href="/" className="text-charcoal-600 hover:text-qprimary">ক্যারিয়ার</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal-500 font-bengali">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-2 text-sm font-bengali">
              <li><Link href="/" className="text-charcoal-600 hover:text-qprimary">হেল্প সেন্টার</Link></li>
              <li><Link href="/" className="text-charcoal-600 hover:text-qprimary">রিটার্ন ও রিফান্ড</Link></li>
              <li><Link href="/" className="text-charcoal-600 hover:text-qprimary">শিপিং পলিসি</Link></li>
              <li><Link href="/" className="text-charcoal-600 hover:text-qprimary">প্রাইভেসি পলিসি</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal-500 font-bengali">
              CONTACT US
            </h4>
            <ul className="space-y-2.5 text-sm font-bengali text-charcoal-700">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-qprimary" />
                <span>{BRAND.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-qprimary" />
                <span>{BRAND.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-qprimary" />
                <span>{BRAND.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-cream-300 pt-8 text-center">
          <p className="text-xs text-charcoal-400 font-sans">
            © {new Date().getFullYear()} QASVANI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}