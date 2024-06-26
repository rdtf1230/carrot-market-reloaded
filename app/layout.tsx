import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from "react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | carrot Market',
    default: 'Carrot Market',
  },
  description: 'Sell and buy all things',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body
        className={`${inter.className} bg-neutral-900 text-white max-w-screen-sm mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
