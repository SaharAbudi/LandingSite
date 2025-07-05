export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-[#DADDE1] dark:border-gray-700 text-center text-sm py-6 text-gray-500 dark:text-gray-400 space-y-2">
      <div>
        © {new Date().getFullYear()} Sahar Abudi
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500">
        • Next.js 15 • TypeScript • Tailwind CSS • Firebase • Vercel • Framer Motion
      </div>
    </footer>
  )
}
