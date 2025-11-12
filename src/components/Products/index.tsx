"use client"
import Breadcrumb from "../common/Breadcrumb"
import { useState } from "react"
import CategoryFilter from "./filters/CategoryFilter"
import PriceRangeFilter from "./filters/PriceRangeFilter"
import ColorFilter from "./filters/ColorFilter"
import SizeFilter from "./filters/SizeFilter"
import { newArrivals } from "@/src/data/data"
import ProductCard from "../common/ProductCard"
import ProductRowCard from "../common/ProductRowCard"

// Mock data - replace with API calls later
const categories = [
    { id: "1", name: "T-shirts" },
    { id: "2", name: "Shorts" },
    { id: "3", name: "Shirts" },
    { id: "4", name: "Hoodie" },
    { id: "5", name: "Jeans" },
];

const colors = [
    { id: "1", name: "Green", hex: "#00C12B" },
    { id: "2", name: "Red", hex: "#F50606" },
    { id: "3", name: "Yellow", hex: "#F5DD06" },
    { id: "4", name: "Orange", hex: "#F57906" },
    { id: "5", name: "Cyan", hex: "#06CAF5" },
    { id: "6", name: "Blue", hex: "#063AF5" },
    { id: "7", name: "Purple", hex: "#7D06F5" },
    { id: "8", name: "Pink", hex: "#F506A4" },
    { id: "9", name: "White", hex: "#FFFFFF" },
    { id: "10", name: "Black", hex: "#000000" },
];

const sizes = [
    { id: "1", name: "XX-Small" },
    { id: "2", name: "X-Small" },
    { id: "3", name: "Small" },
    { id: "4", name: "Medium" },
    { id: "5", name: "Large" },
    { id: "6", name: "X-Large" },
    { id: "7", name: "XX-Large" },
    { id: "8", name: "3X-Large" },
    { id: "9", name: "4X-Large" },
];

const Products = () => {
    // Filter states
    const [products, setProducts] = useState(newArrivals);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([50, 2000]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    
    // Layout and Sort states
    const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<string>('default');

    // Function to reset all filters
    const handleResetFilters = () => {
        setSelectedCategories([]);
        setPriceRange([50, 2000]);
        setSelectedColors([]);
        setSelectedSizes([]);
    };

    // Sorting function
    const getSortedProducts = () => {
        const productsCopy = [...products];
        
        switch (sortBy) {
            case 'price-low':
                return productsCopy.sort((a, b) => a.price - b.price);
            case 'price-high':
                return productsCopy.sort((a, b) => b.price - a.price);
            case 'name-asc':
                return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
            case 'name-desc':
                return productsCopy.sort((a, b) => b.title.localeCompare(a.title));
            case 'newest':
                // Assuming the array order represents newest first
                return productsCopy.reverse();
            default:
                return productsCopy;
        }
    };

    const sortedProducts = getSortedProducts();

    // Log filters for debugging - later use this for API calls
    const handleApplyFilters = () => {
        console.log({
            categories: selectedCategories,
            priceRange,
            colors: selectedColors,
            sizes: selectedSizes,
        });
        // TODO: Call API with filters
    };

    return (
        <section className="pt-20 bg-white dark:bg-gray-900">
            <Breadcrumb className="my-4" />
            <div className="flex gap-5 container">
                <aside className="hidden lg:block w-1/4 max-w-96 bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-200 dark:border-gray-700 h-fit sticky top-24">
                    <div className="flex-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Filters</h2>
                        <button onClick={handleResetFilters} title="Reset Filters">
                            <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.25 9V17.625C11.25 17.9234 11.1315 18.2095 10.9205 18.4205C10.7095 18.6315 10.4234 18.75 10.125 18.75C9.82663 18.75 9.54048 18.6315 9.3295 18.4205C9.11853 18.2095 9 17.9234 9 17.625V9C9 8.70163 9.11853 8.41548 9.3295 8.2045C9.54048 7.99353 9.82663 7.875 10.125 7.875C10.4234 7.875 10.7095 7.99353 10.9205 8.2045C11.1315 8.41548 11.25 8.70163 11.25 9ZM16.875 15.375C16.5766 15.375 16.2905 15.4935 16.0795 15.7045C15.8685 15.9155 15.75 16.2016 15.75 16.5V17.625C15.75 17.9234 15.8685 18.2095 16.0795 18.4205C16.2905 18.6315 16.5766 18.75 16.875 18.75C17.1734 18.75 17.4595 18.6315 17.6705 18.4205C17.8815 18.2095 18 17.9234 18 17.625V16.5C18 16.2016 17.8815 15.9155 17.6705 15.7045C17.4595 15.4935 17.1734 15.375 16.875 15.375ZM19.125 11.625H18V1.125C18 0.826631 17.8815 0.540483 17.6705 0.329505C17.4595 0.118526 17.1734 0 16.875 0C16.5766 0 16.2905 0.118526 16.0795 0.329505C15.8685 0.540483 15.75 0.826631 15.75 1.125V11.625H14.625C14.3266 11.625 14.0405 11.7435 13.8295 11.9545C13.6185 12.1655 13.5 12.4516 13.5 12.75C13.5 13.0484 13.6185 13.3345 13.8295 13.5455C14.0405 13.7565 14.3266 13.875 14.625 13.875H19.125C19.4234 13.875 19.7095 13.7565 19.9205 13.5455C20.1315 13.3345 20.25 13.0484 20.25 12.75C20.25 12.4516 20.1315 12.1655 19.9205 11.9545C19.7095 11.7435 19.4234 11.625 19.125 11.625ZM3.375 12.375C3.07663 12.375 2.79048 12.4935 2.5795 12.7045C2.36853 12.9155 2.25 13.2016 2.25 13.5V17.625C2.25 17.9234 2.36853 18.2095 2.5795 18.4205C2.79048 18.6315 3.07663 18.75 3.375 18.75C3.67337 18.75 3.95952 18.6315 4.1705 18.4205C4.38147 18.2095 4.5 17.9234 4.5 17.625V13.5C4.5 13.2016 4.38147 12.9155 4.1705 12.7045C3.95952 12.4935 3.67337 12.375 3.375 12.375ZM5.625 8.625H4.5V1.125C4.5 0.826631 4.38147 0.540483 4.1705 0.329505C3.95952 0.118526 3.67337 0 3.375 0C3.07663 0 2.79048 0.118526 2.5795 0.329505C2.36853 0.540483 2.25 0.826631 2.25 1.125V8.625H1.125C0.826631 8.625 0.540483 8.74353 0.329505 8.9545C0.118526 9.16548 0 9.45163 0 9.75C0 10.0484 0.118526 10.3345 0.329505 10.5455C0.540483 10.7565 0.826631 10.875 1.125 10.875H5.625C5.92337 10.875 6.20952 10.7565 6.4205 10.5455C6.63147 10.3345 6.75 10.0484 6.75 9.75C6.75 9.45163 6.63147 9.16548 6.4205 8.9545C6.20952 8.74353 5.92337 8.625 5.625 8.625ZM12.375 4.125H11.25V1.125C11.25 0.826631 11.1315 0.540483 10.9205 0.329505C10.7095 0.118526 10.4234 0 10.125 0C9.82663 0 9.54048 0.118526 9.3295 0.329505C9.11853 0.540483 9 0.826631 9 1.125V4.125H7.875C7.57663 4.125 7.29048 4.24353 7.0795 4.4545C6.86853 4.66548 6.75 4.95163 6.75 5.25C6.75 5.54837 6.86853 5.83452 7.0795 6.0455C7.29048 6.25647 7.57663 6.375 7.875 6.375H12.375C12.6734 6.375 12.9595 6.25647 13.1705 6.0455C13.3815 5.83452 13.5 5.54837 13.5 5.25C13.5 4.95163 13.3815 4.66548 13.1705 4.4545C12.9595 4.24353 12.6734 4.125 12.375 4.125Z" fill="black" fillOpacity="0.4" />
                            </svg>
                        </button>
                    </div>

                    {/* Filters */}
                    <CategoryFilter
                        categories={categories}
                        selectedCategories={selectedCategories}
                        onChange={setSelectedCategories}
                    />

                    <PriceRangeFilter
                        min={0}
                        max={2000}
                        value={priceRange}
                        onChange={setPriceRange}
                    />

                    <ColorFilter
                        colors={colors}
                        selectedColors={selectedColors}
                        onChange={setSelectedColors}
                    />

                    <SizeFilter
                        sizes={sizes}
                        selectedSizes={selectedSizes}
                        onChange={setSelectedSizes}
                    />

                    {/* Apply Button */}
                    <button
                        onClick={handleApplyFilters}
                        className="w-full mt-6 px-6 py-3 bg-secondary dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition"
                    >
                        Apply Filters
                    </button>
                </aside>

                <section className="flex-1 bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-200 dark:border-gray-700">
                    <div className="flex-between flex-col lg:flex-row gap-2 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="hidden lg:block text-gray-600 dark:text-gray-400">
                            Showing {products.length} products
                        </p>
                        
                        <div className="flex items-center justify-between lg:justify-center w-full lg:w-fit gap-4">
                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="sort" className="hidden lg:block text-sm text-gray-600 dark:text-gray-400">
                                    Sort by:
                                </label>
                                <select
                                    id="sort"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                >
                                    <option value="default">Default</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name-asc">Name: A to Z</option>
                                    <option value="name-desc">Name: Z to A</option>
                                    <option value="newest">Newest First</option>
                                </select>
                            </div>

                            {/* Layout Toggle */}
                            <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-xl p-1">
                                <button
                                    onClick={() => setLayoutMode('grid')}
                                    className={`p-2 rounded-lg transition ${
                                        layoutMode === 'grid'
                                            ? 'bg-secondary dark:bg-white text-white dark:text-secondary'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-white'
                                    }`}
                                    title="Grid View"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="7" height="7" />
                                        <rect x="14" y="3" width="7" height="7" />
                                        <rect x="3" y="14" width="7" height="7" />
                                        <rect x="14" y="14" width="7" height="7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setLayoutMode('list')}
                                    className={`p-2 rounded-lg transition ${
                                        layoutMode === 'list'
                                            ? 'bg-secondary dark:bg-white text-white dark:text-secondary'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-white'
                                    }`}
                                    title="List View"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="8" y1="6" x2="21" y2="6" />
                                        <line x1="8" y1="12" x2="21" y2="12" />
                                        <line x1="8" y1="18" x2="21" y2="18" />
                                        <rect x="3" y="4" width="2" height="4" />
                                        <rect x="3" y="10" width="2" height="4" />
                                        <rect x="3" y="16" width="2" height="4" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid/List */}
                    {layoutMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedProducts?.map((product, index) => (
                                <ProductCard key={index} {...product} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                            {sortedProducts?.map((product, index) => (
                                <ProductRowCard key={index} {...product} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </section>
    )
}
export default Products