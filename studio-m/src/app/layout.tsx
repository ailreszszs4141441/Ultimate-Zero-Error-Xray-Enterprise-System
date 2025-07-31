
import type { Metadata } from 'next';
import { PT_Sans, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'QuantumTunnel',
  description: 'AI-Powered Secure Connection Manager',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${ptSans.variable} ${robotoMono.variable} font-body antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
