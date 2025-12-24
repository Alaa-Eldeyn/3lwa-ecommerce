"use client";
import { useHeaderStore } from '@/src/store/headerStore';
import { Menu } from 'lucide-react'
import React from 'react'

const CategoriesToggle = () => {
      const { toggleCategories } =
        useHeaderStore();
  return (
    <button
        onClick={toggleCategories}
        className="lg:hidden rounded-lg p-2 text-white hover:bg-white/10 transition-all"
        aria-label="Toggle categories"
      >
        <Menu size={24} />
      </button>
  )
}

export default CategoriesToggle