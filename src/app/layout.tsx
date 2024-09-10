'use client'
import { Dosis } from 'next/font/google'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import "./globals.css";

const dosis = Dosis({
  style: "normal",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ['latin']
});

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="title" content="Explore the latest movies" />
        <meta name="description" content="Explore the latest movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${dosis.className} antialiased`} >
          {children}
      </body>
    </html>
    </QueryClientProvider>
  );
}
