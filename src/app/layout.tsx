import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Portfolio — Architecting The Cosmos',
  description:
    'A deep-space-themed developer portfolio showcasing full-stack projects, cutting-edge skills, and a passion for building at the edge of the digital universe.',
  keywords: ['developer', 'portfolio', 'full-stack', 'react', 'next.js', 'space'],
  authors: [{ name: 'Nayan' }],
  openGraph: {
    title: 'Portfolio — Architecting The Cosmos',
    description: 'Full-stack developer portfolio with a cosmic twist.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
