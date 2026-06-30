// FILE: app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Poppins, Noto_Sans_Bengali, Hind_Siliguri } from 'next/font/google';
import { Providers } from '@/providers/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchOverlay } from '@/components/shared/SearchOverlay';
import { MobileMenu } from '@/components/layout/MobileMenu';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-bengali',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'QASVANI — Luxury Lifestyle',
  description: 'Refined essentials, signature scents, and timeless apparel. Crafted for high-end modern living.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${notoBengali.variable} ${hindSiliguri.variable}`}>
      <body className="font-sans antialiased bg-cream-50">
        <Providers>
          <Navbar />
          <MobileMenu />
          <SearchOverlay />
          <CartDrawer />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}