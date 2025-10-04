export default function Footer() {
  return (
    <footer className="bg-[#202123] text-gray-300 border-t border-[#2a2b2d] text-center text-sm py-6 space-y-2">
      <div>
        © {new Date().getFullYear()} Sahar Abudi
      </div>
      <div className="text-xs text-gray-500">
        • Next.js 15 • TypeScript • Tailwind CSS • Firebase • Vercel • Framer Motion
      </div>
    </footer>
  )
}
