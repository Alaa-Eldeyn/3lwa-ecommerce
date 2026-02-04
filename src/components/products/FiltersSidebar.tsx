"use client";
import { useTranslations } from "next-intl";
import SearchFilter from "./filters/SearchFilter";
import CategoriesFilter from "./filters/CategoriesFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import BrandsFilter from "./filters/BrandsFilter";
import VendorsFilter from "./filters/VendorsFilter";
import ConditionsFilter from "./filters/ConditionsFilter";
import AttributesFilter from "./filters/AttributesFilter";
import RatingFilter from "./filters/RatingFilter";
import StockQuantityFilter from "./filters/StockQuantityFilter";
import ShippingDeliveryFilter from "./filters/ShippingDeliveryFilter";
import FeaturesFilter from "./filters/FeaturesFilter";
import VendorSaleOptionsFilter from "./filters/VendorSaleOptionsFilter";
import { DynamicFilters } from "./filters/types";

interface FiltersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  dynamicFilters: DynamicFilters | undefined;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  selectedBrands: string[];
  setSelectedBrands: (value: string[]) => void;
  selectedVendors: string[];
  setSelectedVendors: (value: string[]) => void;
  selectedConditions: string[];
  setSelectedConditions: (value: string[]) => void;
  selectedAttributes: Record<string, string[]>;
  setSelectedAttributes: (value: Record<string, string[]>) => void;
  minItemRating: number;
  setMinItemRating: (value: number) => void;
  minVendorRating: number;
  setMinVendorRating: (value: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  freeShippingOnly: boolean;
  setFreeShippingOnly: (value: boolean) => void;
  verifiedVendorsOnly: boolean;
  setVerifiedVendorsOnly: (value: boolean) => void;
  primeVendorsOnly: boolean;
  setPrimeVendorsOnly: (value: boolean) => void;
  onSaleOnly: boolean;
  setOnSaleOnly: (value: boolean) => void;
  buyBoxWinnersOnly: boolean;
  setBuyBoxWinnersOnly: (value: boolean) => void;
  withWarrantyOnly: boolean;
  setWithWarrantyOnly: (value: boolean) => void;
  showAllOffers: boolean;
  setShowAllOffers: (value: boolean) => void;
}

const FiltersSidebar = ({
  isOpen,
  onClose,
  dynamicFilters,
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedVendors,
  setSelectedVendors,
  selectedConditions,
  setSelectedConditions,
  selectedAttributes,
  setSelectedAttributes,
  minItemRating,
  setMinItemRating,
  minVendorRating,
  setMinVendorRating,
  inStockOnly,
  setInStockOnly,
  freeShippingOnly,
  setFreeShippingOnly,
  verifiedVendorsOnly,
  setVerifiedVendorsOnly,
  primeVendorsOnly,
  setPrimeVendorsOnly,
  onSaleOnly,
  setOnSaleOnly,
  buyBoxWinnersOnly,
  setBuyBoxWinnersOnly,
  withWarrantyOnly,
  setWithWarrantyOnly,
  showAllOffers,
  setShowAllOffers,
}: FiltersSidebarProps) => {
  const t = useTranslations("filters");

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Filters Sidebar */}
      <aside
        className={`
          fixed lg:static
          inset-y-0 left-0
          w-[95%] max-w-[300px]
          bg-white dark:bg-gray-900
          p-5 rounded-none lg:rounded-xl
          border-e lg:border border-gray-200 dark:border-gray-700
          h-screen lg:h-fit
          overflow-y-auto
          z-50 lg:z-auto
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 lg:translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
        <div className="flex-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("filtersTitle")}</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            aria-label="Close filters">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Filters */}
        <SearchFilter value={searchTerm} onChange={setSearchTerm} />

        {/* Dynamic Categories from API */}
        {dynamicFilters?.categories && dynamicFilters.categories.length > 0 && (
          <CategoriesFilter
            categories={dynamicFilters.categories}
            selectedCategories={selectedCategories}
            onChange={setSelectedCategories}
          />
        )}

        <PriceRangeFilter
          min={dynamicFilters?.priceRange?.minPrice || 0}
          max={dynamicFilters?.priceRange?.maxPrice || 50000}
          value={priceRange}
          onChange={setPriceRange}
        />

        {/* Dynamic Brands Filter */}
        {dynamicFilters?.brands && dynamicFilters.brands.length > 0 && (
          <BrandsFilter
            brands={dynamicFilters.brands}
            selectedBrands={selectedBrands}
            onChange={setSelectedBrands}
          />
        )}

        {/* Dynamic Vendors Filter */}
        {dynamicFilters?.vendors && dynamicFilters.vendors.length > 0 && (
          <VendorsFilter
            vendors={dynamicFilters.vendors}
            selectedVendors={selectedVendors}
            onChange={setSelectedVendors}
          />
        )}

        {/* Dynamic Conditions Filter */}
        {dynamicFilters?.conditions && dynamicFilters.conditions.length > 0 && (
          <ConditionsFilter
            conditions={dynamicFilters.conditions}
            selectedConditions={selectedConditions}
            onChange={setSelectedConditions}
          />
        )}

        {/* Dynamic Attributes Filter */}
        {dynamicFilters?.attributes && dynamicFilters.attributes.length > 0 && (
          <AttributesFilter
            attributes={dynamicFilters.attributes}
            selectedAttributes={selectedAttributes}
            onChange={setSelectedAttributes}
          />
        )}

        <RatingFilter
          label={t("minItemRating")}
          value={minItemRating}
          onChange={setMinItemRating}
        />

        <RatingFilter
          label={t("minVendorRating")}
          value={minVendorRating}
          onChange={setMinVendorRating}
        />

        <StockQuantityFilter inStockOnly={inStockOnly} onInStockOnlyChange={setInStockOnly} />

        <ShippingDeliveryFilter
          freeShippingOnly={freeShippingOnly}
          onFreeShippingOnlyChange={setFreeShippingOnly}
        />

        {/* Dynamic Features Filters */}
        {/* {dynamicFilters?.features && (
          <FeaturesFilter
            features={dynamicFilters.features}
            freeShippingOnly={freeShippingOnly}
            withWarrantyOnly={withWarrantyOnly}
            inStockOnly={inStockOnly}
            onFreeShippingChange={setFreeShippingOnly}
            onWithWarrantyChange={setWithWarrantyOnly}
            onInStockChange={setInStockOnly}
          />
        )} */}

        <VendorSaleOptionsFilter
          verifiedVendorsOnly={verifiedVendorsOnly}
          onVerifiedVendorsOnlyChange={setVerifiedVendorsOnly}
          primeVendorsOnly={primeVendorsOnly}
          onPrimeVendorsOnlyChange={setPrimeVendorsOnly}
          onSaleOnly={onSaleOnly}
          onOnSaleOnlyChange={setOnSaleOnly}
          buyBoxWinnersOnly={buyBoxWinnersOnly}
          onBuyBoxWinnersOnlyChange={setBuyBoxWinnersOnly}
          withWarrantyOnly={withWarrantyOnly}
          onWithWarrantyOnlyChange={setWithWarrantyOnly}
          showAllOffers={showAllOffers}
          onShowAllOffersChange={setShowAllOffers}
        />
      </aside>
    </>
  );
};

export default FiltersSidebar;
