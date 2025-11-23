"use client"
import { Search } from "lucide-react"
import { useState } from "react"
import { useTranslations } from "next-intl"

const SearchBar = () => {
  const t = useTranslations("header")
  const [q, setQ] = useState("")

  return (
    <div className="relative w-full ">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("search")}
        className="w-full px-4 py-2 pr-10 rounded-full border border-gray-200 text-gray-600  dark:border-gray-700 bg-gray-100 dark:bg-gray-800 outline-none focus:border-primary"
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2">
        <Search size={20} />
      </button>
    </div>
  )
}

export default SearchBar
