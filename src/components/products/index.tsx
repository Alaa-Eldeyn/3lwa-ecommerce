"use client";
import Breadcrumb from "../common/Breadcrumb";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import ProductCard from "../common/ProductCard";
import ProductRowCard from "../common/ProductRowCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/src/types/types";
import { DynamicFilters } from "./filters/types";
import ScrollToTop from "../common/ScrollToTop";
import Pagination from "../common/Pagination";
import FiltersSidebar from "./FiltersSidebar";

// Mock data - replace with API calls later
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
  const t = useTranslations("filters");
  const tProducts = useTranslations("products");
  const searchParams = useSearchParams();
  const searchTermFromUrl = searchParams.get("t");
  const categoryIdFromUrl = searchParams.get("c");
  const brandIdFromUrl = searchParams.get("b");
  const vendorIdFromUrl = searchParams.get("v");

  // --- Filter States ---
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  // Key = attributeId (string), Value = array of valueIds (string[])
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string[]>>({});

  const [priceRange, setPriceRange] = useState<[number, number]>([10, 50000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [minItemRating, setMinItemRating] = useState<number>(0);
  const [minVendorRating, setMinVendorRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [freeShippingOnly, setFreeShippingOnly] = useState<boolean>(false);
  const [verifiedVendorsOnly, setVerifiedVendorsOnly] = useState<boolean>(false);
  const [primeVendorsOnly, setPrimeVendorsOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [buyBoxWinnersOnly, setBuyBoxWinnersOnly] = useState<boolean>(false);
  const [withWarrantyOnly, setWithWarrantyOnly] = useState<boolean>(false);
  const [showAllOffers, setShowAllOffers] = useState<boolean>(false);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [filterTrigger, setFilterTrigger] = useState<number>(0);
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("default");

  // --- Fetch Dynamic Filters ---
  const { data: filtersData } = useQuery({
    queryKey: ["dynamicFilters", categoryIdFromUrl,brandIdFromUrl,vendorIdFromUrl, searchTerm,searchTermFromUrl],
    queryFn: async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ItemAdvancedSearch/filters`,
        {
          searchTerm: searchTermFromUrl || searchTerm || null,
          categoryId: categoryIdFromUrl || null,
          brandId: brandIdFromUrl || null,
          vendorId: vendorIdFromUrl || null,
        }
      );
      return response.data.data;
    },
    enabled: !!categoryIdFromUrl,
    refetchOnWindowFocus: false,
  });

  // --- Effect to update PriceRange from API data ---
  // This runs once when filtersData loads to set the correct min/max prices
  useEffect(() => {
    if (filtersData?.priceRange) {
      const minPrice = filtersData.priceRange.minPrice || 0;
      const maxPrice = filtersData.priceRange.maxPrice || 50000;
      // Only set if it's the initial load or significantly different to prevent loops
      // (Optional: Add logic to preserve user selection if needed)
      setPriceRange([minPrice, maxPrice]);
    }
  }, [filtersData]);

  // --- Fetch Products ---
  const { data: productsData, isLoading } = useQuery({
    queryKey: [
      "products",
      filterTrigger,
      pageNumber,
      pageSize,
      sortBy,
      searchTerm,
      searchTermFromUrl,
      categoryIdFromUrl,
      brandIdFromUrl,
      vendorIdFromUrl,
      selectedCategories,
      selectedBrands,
      selectedVendors,
      selectedConditions,
      selectedAttributes,
      priceRange,
      // Include other boolean states if you want them to trigger refetch immediately
      inStockOnly,
      freeShippingOnly,
      // ... add others
    ],
    queryFn: async () => {
      // Check if any filters are active
      const hasActiveFilters = 
        searchTerm ||
        searchTermFromUrl ||
        categoryIdFromUrl ||
        brandIdFromUrl ||
        vendorIdFromUrl ||
        selectedCategories.length > 0 ||
        selectedBrands.length > 0 ||
        selectedVendors.length > 0 ||
        selectedConditions.length > 0 ||
        Object.keys(selectedAttributes).length > 0 ||
        priceRange[0] !== 10 || // Assuming 10 is your default "no filter" min
        priceRange[1] !== 50000 || // Assuming 50000 is your default max
        inStockOnly ||
        freeShippingOnly;

      // Build payload based on active filters
      const payload: any = {
        pageNumber,
        pageSize,
      };

      // Only add filters if they are active
      if (hasActiveFilters) {

        if (searchTerm) payload.searchTerm = searchTerm;
        if (searchTermFromUrl) payload.searchTerm = searchTermFromUrl;
        if (categoryIdFromUrl) payload.categoryId = categoryIdFromUrl;
        if (brandIdFromUrl) payload.brandId = brandIdFromUrl;
        if (vendorIdFromUrl) payload.vendorId = vendorIdFromUrl;
        if (selectedCategories.length > 0) payload.categories = selectedCategories;
        
        if (selectedBrands.length > 0) payload.brands = selectedBrands;
        if (selectedVendors.length > 0) payload.vendors = selectedVendors;
        if (selectedConditions.length > 0) payload.conditions = selectedConditions;

        // --- FIXED: Map selectedAttributes to API Format ---
        if (Object.keys(selectedAttributes).length > 0) {
          payload.attributes = Object.entries(selectedAttributes).map(([attributeId, valueIds]) => ({
            attributeId: attributeId,
            valueIds: valueIds
          }));
        }
        // -------------------------------------------------

        if (priceRange[0] !== 0 || priceRange[1] !== 50000) {
          payload.minPrice = priceRange[0];
          payload.maxPrice = priceRange[1];
        }
        
        // Example of adding booleans if your API supports them directly
        if (inStockOnly) payload.inStockOnly = inStockOnly;
        if (freeShippingOnly) payload.freeShippingOnly = freeShippingOnly;
        // Add others as needed...
      }
      
      // Add sortBy outside of hasActiveFilters check
      if (sortBy && sortBy !== "default") {
        payload.sortBy = sortBy;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ItemAdvancedSearch/search`,
        payload
      );
      return res?.data?.data;
    },
    refetchOnWindowFocus: false,
  });

  // Derive products list and pagination info from react-query data
  const products: Product[] = productsData?.items ?? [];
  const totalPages = productsData?.totalPages ?? 1;
  const totalRecords = productsData?.totalCount ?? 0;

  // Use filtersData directly
  const dynamicFilters: DynamicFilters | undefined = filtersData;

  // Function to reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedVendors([]);
    setSelectedConditions([]);
    setSelectedAttributes({});

    // Reset Price Range to API defaults or hardcoded defaults
    if (filtersData?.priceRange) {
      setPriceRange([filtersData.priceRange.minPrice, filtersData.priceRange.maxPrice]);
    } else {
      setPriceRange([10, 50000]);
    }

    setSelectedColors([]);
    setSelectedSizes([]);
    setMinItemRating(0);
    setMinVendorRating(0);
    setInStockOnly(false);
    setFreeShippingOnly(false);
    setVerifiedVendorsOnly(false);
    setPrimeVendorsOnly(false);
    setOnSaleOnly(false);
    setBuyBoxWinnersOnly(false);
    setWithWarrantyOnly(false);
    setShowAllOffers(false);
    setPageNumber(1);
    setPageSize(12);
  };

  const handleApplyFilters = () => {
    // Trigger refetch by incrementing filterTrigger
    setFilterTrigger((prev) => prev + 1);
    setIsFiltersOpen(false); // Close filters on mobile after applying
    setPageNumber(1); // Reset to first page when filters change
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setFilterTrigger((prev) => prev + 1); // Trigger refetch when sort changes
  };

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPageNumber(1); // Reset to first page when page size changes
  };

  return (
    <section className="">
      <ScrollToTop />
      <Breadcrumb />

      {/* Mobile Filter Toggle Button */}
      <div className="container lg:hidden mb-4">
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center gap-2 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
          <svg
            width="20"
            height="20"
            viewBox="0 0 21 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            {/* SVG Path here */}
            <path
              d="M11.25 9V17.625C11.25 17.9234 11.1315 18.2095 10.9205 18.4205C10.7095 18.6315 10.4234 18.75 10.125 18.75C9.82663 18.75 9.54048 18.6315 9.3295 18.4205C9.11853 18.2095 9 17.9234 9 17.625V9C9 8.70163 9.11853 8.41548 9.3295 8.2045C9.54048 7.99353 9.82663 7.875 10.125 7.875C10.4234 7.875 10.7095 7.99353 10.9205 8.2045C11.1315 8.41548 11.25 8.70163 11.25 9ZM16.875 15.375C16.5766 15.375 16.2905 15.4935 16.0795 15.7045C15.8685 15.9155 15.75 16.2016 15.75 16.5V17.625C15.75 17.9234 15.8685 18.2095 16.0795 18.4205C16.2905 18.6315 16.5766 18.75 16.875 18.75C17.1734 18.75 17.4595 18.6315 17.6705 18.4205C17.8815 18.2095 18 17.9234 18 17.625V16.5C18 16.2016 17.8815 15.9155 17.6705 15.7045C17.4595 15.4935 17.1734 15.375 16.875 15.375ZM19.125 11.625H18V1.125C18 0.826631 17.8815 0.540483 17.6705 0.329505C17.4595 0.118526 17.1734 0 16.875 0C16.5766 0 16.2905 0.118526 16.0795 0.329505C15.8685 0.540483 15.75 0.826631 15.75 1.125V11.625H14.625C14.3266 11.625 14.0405 11.7435 13.8295 11.9545C13.6185 12.1655 13.5 12.4516 13.5 12.75C13.5 13.0484 13.6185 13.3345 13.8295 13.5455C14.0405 13.7565 14.3266 13.875 14.625 13.875H19.125C19.4234 13.875 19.7095 13.7565 19.9205 13.5455C20.1315 13.3345 20.25 13.0484 20.25 12.75C20.25 12.4516 20.1315 12.1655 19.9205 11.9545C19.7095 11.7435 19.4234 11.625 19.125 11.625ZM3.375 12.375C3.07663 12.375 2.79048 12.4935 2.5795 12.7045C2.36853 12.9155 2.25 13.2016 2.25 13.5V17.625C2.25 17.9234 2.36853 18.2095 2.5795 18.4205C2.79048 18.6315 3.07663 18.75 3.375 18.75C3.67337 18.75 3.95952 18.6315 4.1705 18.4205C4.38147 18.2095 4.5 17.9234 4.5 17.625V13.5C4.5 13.2016 4.38147 12.9155 4.1705 12.7045C3.95952 12.4935 3.67337 12.375 3.375 12.375ZM5.625 8.625H4.5V1.125C4.5 0.826631 4.38147 0.540483 4.1705 0.329505C3.95952 0.118526 3.67337 0 3.375 0C3.07663 0 2.79048 0.118526 2.5795 0.329505C2.36853 0.540483 2.25 0.826631 2.25 1.125V8.625H1.125C0.826631 8.625 0.540483 8.74353 0.329505 8.9545C0.118526 9.16548 0 9.45163 0 9.75C0 10.0484 0.118526 10.3345 0.329505 10.5455C0.540483 10.7565 0.826631 10.875 1.125 10.875H5.625C5.92337 10.875 6.20952 10.7565 6.4205 10.5455C6.63147 10.3345 6.75 10.0484 6.75 9.75C6.75 9.45163 6.63147 9.16548 6.4205 8.9545C6.20952 8.74353 5.92337 8.675 5.625 8.625ZM12.375 4.125H11.25V1.125C11.25 0.826631 11.1315 0.540483 10.9205 0.329505C10.7095 0.118526 10.4234 0 10.125 0C9.82663 0 9.54048 0.118526 9.3295 0.329505C9.11853 0.540483 9 0.826631 9 1.125V4.125H7.875C7.57663 4.125 7.29048 4.24353 7.0795 4.4545C6.86853 4.66548 6.75 4.95163 6.75 5.25C6.75 5.54837 6.86853 5.83452 7.0795 6.0455C7.29048 6.25647 7.57663 6.375 7.875 6.375H12.375C12.6734 6.375 12.9595 6.25647 13.1705 6.0455C13.3815 5.83452 13.5 5.54837 13.5 5.25C13.5 4.95163 13.3815 4.66548 13.1705 4.4545C12.9595 4.24353 12.6734 4.125 12.375 4.125Z"
              fill="currentColor"
              fillOpacity="0.7"
            />
          </svg>
          {t("filtersTitle")}
        </button>
      </div>

      <div className="flex gap-5 container">
        {/* Filters Sidebar */}
        <FiltersSidebar
          isOpen={isFiltersOpen}
          onClose={() => setIsFiltersOpen(false)}
          dynamicFilters={dynamicFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedVendors={selectedVendors}
          setSelectedVendors={setSelectedVendors}
          selectedConditions={selectedConditions}
          setSelectedConditions={setSelectedConditions}
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
          minItemRating={minItemRating}
          setMinItemRating={setMinItemRating}
          minVendorRating={minVendorRating}
          setMinVendorRating={setMinVendorRating}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          freeShippingOnly={freeShippingOnly}
          setFreeShippingOnly={setFreeShippingOnly}
          verifiedVendorsOnly={verifiedVendorsOnly}
          setVerifiedVendorsOnly={setVerifiedVendorsOnly}
          primeVendorsOnly={primeVendorsOnly}
          setPrimeVendorsOnly={setPrimeVendorsOnly}
          onSaleOnly={onSaleOnly}
          setOnSaleOnly={setOnSaleOnly}
          buyBoxWinnersOnly={buyBoxWinnersOnly}
          setBuyBoxWinnersOnly={setBuyBoxWinnersOnly}
          withWarrantyOnly={withWarrantyOnly}
          setWithWarrantyOnly={setWithWarrantyOnly}
          showAllOffers={showAllOffers}
          setShowAllOffers={setShowAllOffers}
          onApplyFilters={handleApplyFilters}
        />

        <section className="flex-1 bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex-between flex-col lg:flex-row gap-2 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="hidden lg:block text-gray-600 dark:text-gray-400">
              {tProducts("showingProducts", { count: totalRecords })}
            </p>

            <div className="flex items-center justify-between lg:justify-center w-full lg:w-fit gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort"
                  className="hidden lg:block text-sm text-gray-600 dark:text-gray-400">
                  {tProducts("sortBy")}
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-4 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white">
                  <option value="default">{tProducts("sortDefault")}</option>
                  <option value="price-low">{tProducts("sortPriceLow")}</option>
                  <option value="price-high">{tProducts("sortPriceHigh")}</option>
                  <option value="name-asc">{tProducts("sortNameAsc")}</option>
                  <option value="name-desc">{tProducts("sortNameDesc")}</option>
                  <option value="newest">{tProducts("sortNewest")}</option>
                </select>
              </div>

              {/* Layout Toggle */}
              <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setLayoutMode("grid")}
                  className={`p-2 rounded-lg transition ${
                    layoutMode === "grid"
                      ? "bg-secondary dark:bg-white text-white dark:text-secondary"
                      : "text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-white"
                  }`}
                  title={tProducts("gridView")}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button
                  onClick={() => setLayoutMode("list")}
                  className={`p-2 rounded-lg transition ${
                    layoutMode === "list"
                      ? "bg-secondary dark:bg-white text-white dark:text-secondary"
                      : "text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-white"
                  }`}
                  title={tProducts("listView")}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
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
          {isLoading ? (
            <div>{tProducts("loading")}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">{tProducts("noProductsFound")}</p>
              {/* Optional: Add a reset button here if filters are active */}
            </div>
          ) : layoutMode === "grid" ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product: Product, index: number) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {products.map((product: Product, index: number) => (
                <ProductRowCard key={index} {...product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && products.length > 0 && totalPages > 1 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showPageSize={true}
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                pageSizeOptions={[12, 24, 36, 48]}
              />
            </div>
          )}
        </section>
      </div>
    </section>
  );
};
export default Products;