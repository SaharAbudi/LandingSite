import './globals.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { Home, User, FolderOpen } from 'lucide-react'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  title: 'Sahar Abudi Portfolio',
  description: 'Projects and dashboards by a data-driven analyst',
  openGraph: {
    title: 'Sahar Abudi Portfolio',
    description: 'Explore real-world data projects and dashboards built with clarity and insight.',
    url: 'https://saharabudi.vercel.app',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`bg-[#F0F2F5] text-gray-900 ${inter.className} min-h-screen flex flex-col`}>

        {/* Header */}
        <header className="bg-[#1877F2] shadow-md sticky top-0 z-50">
          <div className="w-full max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-base">
            
            {/* Left Side - Favicon as logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={28}
                height={28}
                className="rounded shadow"
              />
              <span className="text-white font-semibold hidden sm:inline">Sahar Abudi</span>
            </Link>

            {/* Navigation */}
            <nav className="flex gap-8 items-center text-white">
              <Link href="/" className="flex items-center gap-2 hover:text-blue-200 transition">
                <Home size={18} /> Home
              </Link>
              <Link href="/about" className="flex items-center gap-2 hover:text-blue-200 transition">
                <User size={18} /> About
              </Link>
              <Link href="/projects" className="flex items-center gap-2 hover:text-blue-200 transition">
                <FolderOpen size={18} /> Projects
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-[#DADDE1] text-center text-sm py-4 text-gray-500">
          © {new Date().getFullYear()} Sahar Abudi
        </footer>

      </body>
    </html>
  )
}
