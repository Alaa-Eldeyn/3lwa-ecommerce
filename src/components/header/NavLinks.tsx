"use client"
import { useTranslations } from "next-intl"
import { getMenuData } from "@/src/data/menuData"
import Link from "next/link"

const NavLinks = () => {
  const t = useTranslations("header")
  const menuData = getMenuData(t)
  return (
    <nav className="hidden lg:flex items-center space-x-8">

      {menuData.map((item) => (
        <Link
          key={item.id}
          href={item.path}
          target={item.newTab ? "_blank" : "_self"}
          className="text-gray-700 dark:text-gray-300 hover:text-secondary dark:hover:text-white transition"
        >
          {item.title}
        </Link>
      ))}

    </nav>
  )
}

export default NavLinks