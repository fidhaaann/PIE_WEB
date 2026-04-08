import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ScrollProgress'
import Navbar from '@/components/Navbar'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'V-Fiesta 5.0 | IEEE PIE Kerala Section',
  description:
    'The flagship annual techno-cultural fest of IEEE Power & Energy Society, Kerala Section. Join us for two days of innovation, workshops, competitions, and more at V-Fiesta 5.0.',
  keywords: ['IEEE', 'PIE', 'Kerala', 'V-Fiesta', 'tech fest', 'engineering', 'events', 'Kochi'],
  authors: [{ name: 'IEEE PIE Kerala Section' }],
  openGraph: {
    type:        'website',
    title:       'V-Fiesta 5.0 | IEEE PIE Kerala Section',
    description: 'The flagship annual techno-cultural fest by IEEE Power & Energy Society Kerala Section.',
    siteName:    'V-Fiesta 5.0',
    images: [
      {
        url:    '/og-image.png',
        width:  1200,
        height: 630,
        alt:    'V-Fiesta 5.0',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'V-Fiesta 5.0 | IEEE PIE Kerala Section',
    description: 'The flagship annual techno-cultural fest by IEEE PIE Kerala Section.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body">
        <ThemeProvider>
          <SmoothScroll>
            <ScrollProgress />
            <Navbar />
            <main className="app-main">{children}</main>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
