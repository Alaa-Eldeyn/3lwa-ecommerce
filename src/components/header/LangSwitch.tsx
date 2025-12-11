"use client"
import { usePathname, useRouter } from "next/navigation"

const LangSwitch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const isArabic = pathname.startsWith("/ar")

  const toggleLang = () => {
    const newLocale = isArabic ? "en" : "ar"
    router.push("/" + newLocale + pathname.slice(3))
  }

  return (
    <button 
      onClick={toggleLang}
      className="text-white hover:ring-1 hover:ring-white/50 rounded-sm px-2 py-1 transition-all flex items-center gap-2"
    >
      {/* Flag Icon */}
      <div className="w-6 h-4 overflow-hidden rounded-sm border border-white/20">
        {isArabic ? (
          // US Flag for English
          <svg viewBox="0 0 60 30" className="w-full h-full">
            <rect fill="#B22234" width="60" height="30"/>
            <path d="M0,3.46h60M0,6.92h60M0,10.38h60M0,13.84h60M0,17.3h60M0,20.76h60M0,24.22h60M0,27.68h60" stroke="#fff" strokeWidth="2.3"/>
            <rect fill="#3C3B6E" width="24" height="15"/>
          </svg>
        ) : (
          // Arabic Flag (Saudi Arabia or generic Arabic)
          <svg viewBox="0 0 60 30" className="w-full h-full">
            <rect fill="#165e3c" width="60" height="30"/>
            <text x="30" y="20" fontSize="16" fill="white" textAnchor="middle" fontFamily="Arial">ع</text>
          </svg>
        )}
      </div>
      <span className="text-sm font-semibold block">{isArabic ? "EN" : "AR"}</span>
    </button>
  )
}

export default LangSwitch
