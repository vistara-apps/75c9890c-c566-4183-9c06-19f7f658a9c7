import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DreamWeaver - Unlock the meaning of your dreams, privately',
  description: 'A privacy-focused app for interpreting dreams using AI and tracking personal patterns over time, built for the Base ecosystem.',
  keywords: ['dreams', 'AI', 'interpretation', 'privacy', 'Base', 'blockchain'],
  authors: [{ name: 'DreamWeaver Team' }],
  openGraph: {
    title: 'DreamWeaver',
    description: 'Unlock the meaning of your dreams, privately.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          <main id="main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
