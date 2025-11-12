"use client"
import { usePathname, useRouter } from "next/navigation"

const LangSwitch = () => {
  const router = useRouter()
  const pathname = usePathname()

  const toggleLang = () => {
    const newLocale = pathname.startsWith("/ar") ? "en" : "ar"
    router.push("/" + newLocale + pathname.slice(3))
  }

  return (
    <button 
      onClick={toggleLang}
      className="px-3 py-1 active:scale-90 bg-gray-200 dark:bg-gray-700 rounded-full text-sm soft text-gray-600 dark:text-white hover:text-primary"
    >
      {pathname.startsWith("/ar") ? "EN" : "AR"}
    </button>
  )
}

export default LangSwitch
