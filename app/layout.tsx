import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Our Memories',
  description: 'A special collection of our memories together',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className={inter.className}
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#f8fafc',
          color: '#1e293b',
          fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
