"use client"
import { Search, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useTranslations } from "next-intl"

const SearchBar = () => {
  const t = useTranslations("header")
  const [q, setQ] = useState("")

  return (
    <div className="relative w-full">
      <div className="flex items-center h-10 lg:h-12">
        
        {/* Category Dropdown */}
        <button className="flex items-center gap-2 px-2 lg:px-4 h-full bg-white border border-gray-300 rounded-s-lg text-gray-700 hover:bg-gray-50 transition whitespace-nowrap">
          <span>الكل</span>
          <ChevronDown size={16} />
        </button>
        
        {/* Search Input */}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="بحث في Basyit.com"
          className="flex-1 h-full px-2 lg:px-4 text-gray-700 border-t border-b border-gray-300 bg-white focus:outline-none"
        />
        
        {/* Search Button */}
        <button className="px-4 h-full bg-secondary text-white rounded-e-lg transition flex items-center justify-center">
          <Search size={20} />
        </button>

      </div>
    </div>
  )
}

export default SearchBar
