import '../styles/globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/header/header';
import JotaiProvider from '@/providers/jotai-provider';
import ThemeProvider from '@/providers/theme-provider';
import { Toaster } from 'sonner';

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
              <Toaster richColors position='top-center' />
            </div>
          </ThemeProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
