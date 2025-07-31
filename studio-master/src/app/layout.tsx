import type { Metadata } from "next";
import { Roboto_Mono } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: "QuantumProxy AI-X",
  description: "AI-powered proxy management with post-quantum encryption.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${robotoMono.variable} dark`}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
