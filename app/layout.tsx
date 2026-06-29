import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
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

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'QASVANI — Luxury Lifestyle',
  description:
    'A curated collection of refined essentials — from signature scents to timeless apparel. Crafted for those who appreciate the art of living well.',
  openGraph: {
    title: 'QASVANI — Luxury Lifestyle',
    description:
      'A curated collection of refined essentials — from signature scents to timeless apparel.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <Navbar />
          <MobileMenu />
          <SearchOverlay />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
