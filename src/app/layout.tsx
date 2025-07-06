import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from 'next-themes'
import ScrollToTop from '@/components/ScrollToTop'
import PageLoader from '@/components/common/PageLoader'
import { Toaster } from 'react-hot-toast' // ✅ ייבוא Toast

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.className} bg-[#F0F2F5] dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#fff',
                color: '#000',
              },
              className: 'dark:bg-gray-900 dark:text-white shadow-lg rounded-lg px-4 py-2 text-sm',
            }}
          />

          <PageLoader /> {/* ✅ טעינה חלקה בין עמודים */}
          <ScrollToTop /> {/* ✅ גלילה אוטומטית לראש הדף */}
          <Header />

          <main id="main-content" className="flex-grow w-full max-w-6xl mx-auto px-6 py-10" role="main">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
