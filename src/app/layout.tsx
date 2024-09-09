import type { Metadata } from "next";
import localFont from "next/font/local";
import { Dosis } from 'next/font/google'
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const dosis = Dosis({
  style: "normal",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Movies Explorer",
  description: "Explore the latest movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dosis.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
