"use client"
import { Search, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Category } from "@/src/types/types"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

const SearchBar = () => {
  const t = useTranslations("filters")
  const locale = useLocale()
  const isArabic = locale === "ar"
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const categoryId = searchParams.get("c")
  
  const [q, setQ] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categoryId || "")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (categoryId) {
      
      setSelectedCategoryId(categoryId)
    }
  }, [categoryId])

  const handleSearch = () => {
    
    const params = new URLSearchParams(searchParams.toString())
    
    // إضافة السيرش تيرم لو موجود
    if (q.trim()) {
      params.set("t", q.trim())
    } else {
      params.delete("t")
    }
    
    // إضافة الكاتيجوري لو موجود
    if (selectedCategoryId) {
      params.set("c", selectedCategoryId)
    } else {
      params.delete("c")
    }
    
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleCategoryChange = (catId: string) => {
    setSelectedCategoryId(catId)
    
    const params = new URLSearchParams(searchParams.toString())
    
    if (catId) {
      params.set("c", catId)
    } else {
      params.delete("c")
    }
    
    router.push(`${pathname}?${params.toString()}`)
    console.log("Search Term:", q)
    console.log("Selected Category ID:", selectedCategoryId)
  }

  const { data: categories } = useQuery({
    queryKey: ["categoriesTree"],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Category/tree`),
    refetchOnWindowFocus: false,
  })

  const mainCategories = categories?.data?.data?.filter(
    (cat: Category) => cat.isMainCategory
  ) || []



  return (
    <div className="relative w-full pb-1 lg:pb-0">
      <div className="flex items-center h-10 lg:h-12">
        
        {/* Category Dropdown */}
        <div ref={dropdownRef} className="relative">
          <select 
            value={selectedCategoryId}
            onChange={(e) => {
              const catId = e.target.value
              setSelectedCategoryId(catId)
            }}
            className="flex items-center gap-2 px-2 lg:px-4 h-10 lg:h-12 bg-white border border-gray-300 rounded-s-lg text-gray-700 hover:bg-gray-50 transition whitespace-nowrap"
          >
            <option value="">{t("allCategories") || "الكل"}</option>
            {mainCategories.map((category: Category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className={`w-full text-start px-4 py-2 hover:bg-gray-50 transition ${
                    selectedCategoryId === category.id ? 'bg-gray-100 font-semibold' : ''
                  }`}
                >
                  {isArabic ? category.titleAr : category.titleEn}
                </option>
              ))}
          </select>
        </div>
        
        {/* Search Input */}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="بحث في Basyit.com"
          className="flex-1 h-full px-2 lg:px-4 text-gray-700 border-t border-b border-gray-300 bg-white focus:outline-none"
        />
        
        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="px-4 h-full bg-secondary text-white rounded-e-lg transition flex items-center justify-center"
        >
          <Search size={20} />
        </button>

      </div>
    </div>
  )
}

export default SearchBar
