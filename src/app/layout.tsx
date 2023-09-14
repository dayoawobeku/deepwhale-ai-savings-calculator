import './globals.css';
import type {Metadata} from 'next';
import {tomatoGrotesk} from '@/assets/fonts';

const metadata: Metadata = {
  title: 'Savings Calculator - Deepwhale AI',
  description: 'A savings calculator built with Next.js and TypeScript.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body
        className={`${tomatoGrotesk.className} min-h-screen max-w-[1192px] mx-auto bg-white-800 py-10 md:py-28 px-4`}
      >
        {children}
      </body>
    </html>
  );
}

export {metadata};
