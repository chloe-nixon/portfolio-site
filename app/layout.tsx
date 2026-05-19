import type { Metadata, Viewport } from 'next';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Chloe Nixon — Independent Designer & Developer',
  description:
    'Independent designer & developer making polished, considered sites for design-conscious brands. Webflow native, now writing code too.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-icon',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0202',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LenisProvider />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
