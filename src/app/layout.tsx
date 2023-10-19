import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import JotaiProvider from '@/providers/jotai-provider';
import ThemeProvider from '@/providers/theme-provider';

import Header from '@/components/header';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quizzzy',
  description: 'Quiz site for Quizzzy',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} container`}>
        <JotaiProvider>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
