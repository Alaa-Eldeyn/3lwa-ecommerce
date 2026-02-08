"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "@/src/i18n/routing";
import { useLocale } from "next-intl";
import axios from "axios";
import type { Product } from "@/src/types/types";

const SEARCH_DEBOUNCE_MS = 350;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type CombinationRow = { color: string; storage: string; price: string; stock: string; sku: string };

const defaultCombinationRows: CombinationRow[] = [
  { color: "Black", storage: "32GB", price: "89.50", stock: "15", sku: "WH-BT-001-BK-32" },
  { color: "Black", storage: "64GB", price: "109.50", stock: "12", sku: "WH-BT-001-BK-64" },
  { color: "White", storage: "32GB", price: "89.50", stock: "8", sku: "WH-BT-001-WH-32" },
  { color: "White", storage: "64GB", price: "109.50", stock: "10", sku: "WH-BT-001-WH-64" },
];

export function AddItem() {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [pricingMode, setPricingMode] = useState<"basic" | "combination">("basic");
  const [itemSearchQuery, setItemSearchQuery] = useState("");
  const [itemSearchDebounced, setItemSearchDebounced] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  // Basic pricing state
  const [salePrice, setSalePrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [lowStockAlert, setLowStockAlert] = useState("");

  // Combination pricing state
  const [combinationRows, setCombinationRows] = useState<CombinationRow[]>(defaultCombinationRows);

  // Debounce search query
  useEffect(() => {
    const t = setTimeout(() => setItemSearchDebounced(itemSearchQuery.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [itemSearchQuery]);

  // Fetch search results
  useEffect(() => {
    if (!itemSearchDebounced) {
      setSearchResults([]);
      return;
    }
    let cancelled = false;
    setSearchLoading(true);
    axios
      .post<{ data?: { items?: Product[]; totalCount?: number } }>(
        `${BASE_URL}/ItemAdvancedSearch/search`,
        {
          searchTerm: itemSearchDebounced,
          pageNumber: 0,
          pageSize: 12,
        }
      )
      .then((res) => {
        if (!cancelled && res.data?.data?.items) setSearchResults(res.data.data.items);
      })
      .catch(() => {
        if (!cancelled) setSearchResults([]);
      })
      .finally(() => {
        if (!cancelled) setSearchLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [itemSearchDebounced]);

  const handleSelectItem = useCallback((item: Product) => {
    setSelectedItem(item);
    setItemSearchQuery("");
    setItemSearchDebounced("");
    setSearchResults([]);
    setSearchDropdownOpen(false);
    // Pre-fill basic pricing from item when available for dynamic calculations
    const price = item.salesPrice ?? item.price ?? item.minimumPrice ?? item.basePrice;
    if (price != null && !Number.isNaN(Number(price))) setSalePrice(String(price));
    if (item.basePrice != null && !Number.isNaN(Number(item.basePrice)))
      setCostPrice(String(item.basePrice));
    if (item.availableQuantity != null && !Number.isNaN(Number(item.availableQuantity)))
      setStockQuantity(String(item.availableQuantity));
  }, []);

  const clearSelectedItem = useCallback(() => {
    setSelectedItem(null);
    setSalePrice("");
    setCostPrice("");
    setStockQuantity("");
    setLowStockAlert("");
    setCombinationRows(defaultCombinationRows);
  }, []);

  // Dynamic calculations for basic pricing
  const salePriceNum = parseFloat(salePrice) || 0;
  const costPriceNum = parseFloat(costPrice) || 0;
  const stockNum = parseInt(stockQuantity, 10) || 0;
  const profitMargin =
    salePriceNum > 0 ? (((salePriceNum - costPriceNum) / salePriceNum) * 100).toFixed(1) : "—";
  const profitPerUnit = (salePriceNum - costPriceNum).toFixed(2);
  const totalValue = (salePriceNum * stockNum).toFixed(2);

  // Dynamic calculations for combination pricing
  const combinationTotals = useMemo(() => {
    let totalValueComb = 0;
    combinationRows.forEach((row) => {
      const p = parseFloat(row.price) || 0;
      const s = parseInt(row.stock, 10) || 0;
      totalValueComb += p * s;
    });
    return { totalValue: totalValueComb.toFixed(2), count: combinationRows.length };
  }, [combinationRows]);

  const updateCombinationRow = useCallback(
    (index: number, field: keyof CombinationRow, value: string) => {
      setCombinationRows((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: value };
        return next;
      });
    },
    []
  );

  const displayTitle = (item: Product) =>
    (isArabic ? item.titleAr : item.titleEn) || item.title || "";
  const displayCategory = (item: Product) =>
    (isArabic ? item.categoryTitleAr : item.categoryTitleEn) || item.categoryTitle || "—";
  const displayBrand = (item: Product) =>
    (isArabic ? item.brandTitleAr : item.brandTitleEn) || item.brandTitle || "—";
  const itemImage = (item: Product) =>
    item.thumbnailImage
      ? `${process.env.NEXT_PUBLIC_DOMAIN || ""}/${item.thumbnailImage}`.replace(/\/+/g, "/")
      : "/placeholder.png";

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/vendor/items"
            className="text-gray-600 hover:text-gray-800"
            aria-label="Back">
            <i className="fa-solid fa-arrow-left text-lg" aria-hidden />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configure Item Offer</h1>
            <p className="text-gray-600 mt-1">
              Select an existing item and set your pricing and inventory
            </p>
          </div>
        </div>
        {selectedItem && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <i className="fa-solid fa-rocket mr-2" aria-hidden />
              Publish Offer
            </button>
          </div>
        )}
      </div>

      {/* Search for existing item */}
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-foreground">Search for an item</h3>
        <p className="text-sm text-gray-600 mb-4">
          Find an existing product in the catalog to add your offer and pricing.
        </p>
        <div className="relative max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <i className="fa-solid fa-search" aria-hidden />
          </div>
          <input
            type="text"
            value={itemSearchQuery}
            onChange={(e) => {
              setItemSearchQuery(e.target.value);
              setSearchDropdownOpen(true);
            }}
            onFocus={() => searchResults.length > 0 && setSearchDropdownOpen(true)}
            onBlur={() => setTimeout(() => setSearchDropdownOpen(false), 200)}
            placeholder="Search by name, SKU, or category..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Search items"
          />
          {itemSearchQuery && (
            <button
              type="button"
              onClick={() => {
                setItemSearchQuery("");
                setSearchResults([]);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search">
              <i className="fa-solid fa-times" aria-hidden />
            </button>
          )}
          {searchDropdownOpen && (itemSearchQuery || searchResults.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-auto">
              {searchLoading ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  <i className="fa-solid fa-spinner fa-spin mr-2" aria-hidden />
                  Searching...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  {itemSearchDebounced
                    ? "No items found. Try a different search."
                    : "Type to search for items."}
                </div>
              ) : (
                <ul className="py-2">
                  {searchResults.map((item) => (
                    <li key={item.itemCombinationId || item.itemId}>
                      <button
                        type="button"
                        onClick={() => handleSelectItem(item)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                          <img
                            src={itemImage(item)}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-foreground truncate">
                            {displayTitle(item)}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {item.sku || item.itemId} · {displayCategory(item)}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Item Information</h3>
              <div className="space-y-4">
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={itemImage(selectedItem)}
                    alt={displayTitle(selectedItem)}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Product Name</p>
                  <p className="font-medium text-foreground">{displayTitle(selectedItem)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">SKU</p>
                  <p className="font-mono text-sm text-foreground">
                    {selectedItem.sku || selectedItem.itemId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="text-sm text-foreground">{displayCategory(selectedItem)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Brand</p>
                  <p className="text-sm text-foreground">{displayBrand(selectedItem)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Item ID</p>
                  <p className="font-mono text-xs text-gray-500">{selectedItem.itemId}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Fulfillment Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Warehouse Assignment
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    aria-label="Warehouse">
                    <option value="">Select Warehouse</option>
                    <option value="main">Main Warehouse - Dubai</option>
                    <option value="secondary">Secondary - Abu Dhabi</option>
                    <option value="partner">Partner Warehouse - Sharjah</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Handling Time
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    aria-label="Handling time">
                    <option value="1">1 business day</option>
                    <option value="2">2 business days</option>
                    <option value="3">3 business days</option>
                    <option value="5">5 business days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Pricing Configuration</h3>
              <div className="mb-6">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPricingMode("basic")}
                    className={`flex-1 px-4 py-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                      pricingMode === "basic"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}>
                    <i className="fa-solid fa-tag mr-2" aria-hidden />
                    Basic Pricing
                  </button>
                  <button
                    type="button"
                    onClick={() => setPricingMode("combination")}
                    className={`flex-1 px-4 py-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                      pricingMode === "combination"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}>
                    <i className="fa-solid fa-layer-group mr-2" aria-hidden />
                    Combination Pricing
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Choose how to set pricing for this item
                </p>
              </div>

              {pricingMode === "basic" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Sale Price (EGP)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Cost Price (EGP)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={costPrice}
                        onChange={(e) => setCostPrice(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Low Stock Alert
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={lowStockAlert}
                        onChange={(e) => setLowStockAlert(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Profit Margin</p>
                        <p className="text-lg font-bold text-green-600">
                          {profitMargin === "—" ? "—" : `${profitMargin}%`}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Profit per Unit</p>
                        <p className="text-lg font-bold text-green-600">{profitPerUnit} EGP</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Value</p>
                        <p className="text-lg font-bold text-primary">{totalValue} EGP</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {pricingMode === "combination" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Select Attributes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Color
                        </label>
                        <div className="space-y-2">
                          {["Black", "White", "Blue"].map((c) => (
                            <label key={c} className="flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-primary focus:ring-primary/20"
                                defaultChecked={c !== "Blue"}
                              />
                              <span className="ml-2 text-sm">{c}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Storage
                        </label>
                        <div className="space-y-2">
                          {["32GB", "64GB", "128GB"].map((s) => (
                            <label key={s} className="flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-primary focus:ring-primary/20"
                                defaultChecked={s !== "128GB"}
                              />
                              <span className="ml-2 text-sm">{s}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">Price Combinations</h4>
                      <span className="text-sm text-gray-600">
                        {combinationTotals.count} combinations · Total value:{" "}
                        {combinationTotals.totalValue} EGP
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                              Color
                            </th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                              Storage
                            </th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                              Price (EGP)
                            </th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                              Stock
                            </th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                              SKU
                            </th>
                            <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">
                              Line total (EGP)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {combinationRows.map((row, index) => {
                            const priceNum = parseFloat(row.price) || 0;
                            const stockNum = parseInt(row.stock, 10) || 0;
                            const lineTotal = (priceNum * stockNum).toFixed(2);
                            return (
                              <tr key={row.sku} className="border-t border-gray-100">
                                <td className="px-4 py-3 text-sm">{row.color}</td>
                                <td className="px-4 py-3 text-sm">{row.storage}</td>
                                <td className="px-4 py-3">
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={row.price}
                                    onChange={(e) =>
                                      updateCombinationRow(index, "price", e.target.value)
                                    }
                                    className="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <input
                                    type="number"
                                    value={row.stock}
                                    onChange={(e) =>
                                      updateCombinationRow(index, "stock", e.target.value)
                                    }
                                    className="w-16 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
                                  />
                                </td>
                                <td className="px-4 py-3 text-xs text-gray-500">{row.sku}</td>
                                <td className="px-4 py-3 text-right text-sm font-medium text-primary">
                                  {lineTotal}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <i className="fa-solid fa-info-circle text-blue-600 mr-2" aria-hidden />
                        <p className="text-sm text-blue-800">
                          Combinations are automatically generated based on selected attributes.
                          Ensure all combinations have valid pricing and stock levels.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Additional Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: "Track inventory",
                    desc: "Automatically update stock levels when orders are placed",
                    checked: true,
                  },
                  {
                    label: "Allow backorders",
                    desc: "Accept orders when item is out of stock",
                    checked: false,
                  },
                  {
                    label: "Auto-publish",
                    desc: "Automatically make item available for sale",
                    checked: true,
                  },
                  {
                    label: "Promotional pricing",
                    desc: "Enable special promotional pricing rules",
                    checked: false,
                  },
                ].map((s) => (
                  <div key={s.label}>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary focus:ring-primary/20"
                        defaultChecked={s.checked}
                      />
                      <span className="ml-2 text-sm font-medium">{s.label}</span>
                    </label>
                    <p className="text-xs text-gray-600 ml-6">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!selectedItem && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <i className="fa-solid fa-box-open text-4xl text-gray-300 mb-3" aria-hidden />
          <p className="text-gray-600">
            Search and select an item above to configure your offer and pricing.
          </p>
        </div>
      )}
    </div>
  );
}
