import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers/Providers"
import { ThemeToggle } from "@/components/layout/ThemeToggle/ThemeToggle"
import { Navbar } from "@/components/layout/Navbar/Navbar"
import { Sidebar } from "@/components/layout/Sidebar/Sidebar"
import { CartDrawer } from "@/components/cart/CartDrawer/CartDrawer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'E-Store | Industrial Brutalism E-Commerce',
    template: '%s | E-Store',
  },
  description: 'Industrial Brutalism e-commerce storefront with premium Pakistani fashion, footwear and accessories. Shop authentic khaddar, lawn, leather sneakers and more with guest checkout.',
  applicationName: 'E-Store',
  authors: [{ name: 'E-Store Team' }],
  keywords: ['ecommerce', 'Pakistani fashion', 'khaddar', 'lawn', 'footwear', 'accessories', 'industrial brutalism'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    siteName: 'E-Store',
    title: 'E-Store | Industrial Brutalism E-Commerce',
    description: 'Premium Pakistani fashion and accessories with industrial brutalist design.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'E-Store homepage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Store | Industrial Brutalism E-Commerce',
    description: 'Premium Pakistani fashion and accessories with industrial brutalist design.',
    images: ['/og-default.jpg'],
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)]">
        <Providers>
          <Sidebar />
          <Navbar />
          <ThemeToggle />
          <CartDrawer />
          <main className="md:ml-[280px]">{children}</main>
        </Providers>
      </body>
    </html>
  )
}