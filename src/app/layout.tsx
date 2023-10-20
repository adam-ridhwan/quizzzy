import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import JotaiProvider from '@/providers/jotai-provider';
import ThemeProvider from '@/providers/theme-provider';

import Header from '@/components/header/header';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quizzzy',
  description: 'QuizTypes site for Quizzzy',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <JotaiProvider>
          <ThemeProvider>
            <div className='container flex min-h-[100dvh] flex-col'>
              <Header />
              {children}
            </div>
          </ThemeProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
