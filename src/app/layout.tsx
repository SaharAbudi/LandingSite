import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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
    <html lang="en" className="scroll-smooth">
      <body className={`bg-[#F0F2F5] text-gray-900 ${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
