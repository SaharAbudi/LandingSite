import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  title: 'Sahar Abudi Portfolio',
  description: 'Projects and dashboards by a data-driven analyst',
  openGraph: {
    title: 'Sahar Abudi Portfolio',
    description: 'Explore real-world data projects and dashboards built with clarity and insight.',
    url: 'https://sahar-portfolio.vercel.app/',
    siteName: 'Sahar Abudi Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Sahar Abudi Portfolio',
    description: 'Explore real-world data projects and dashboards built with clarity and insight.',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} bg-[#F0F2F5] dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
