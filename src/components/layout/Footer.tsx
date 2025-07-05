export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#DADDE1] text-center text-sm py-6 text-gray-500 space-y-2">
      <div>
        © {new Date().getFullYear()} Sahar Abudi
      </div>
      <div className="text-xs text-gray-400">
    Next.js 15 • TypeScript • Tailwind CSS • Firebase • Vercel • Framer Motion
      </div>
    </footer>
  )
}
