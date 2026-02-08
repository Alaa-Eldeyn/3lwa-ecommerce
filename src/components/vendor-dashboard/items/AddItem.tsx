"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "@/src/i18n/routing";
import { useLocale } from "next-intl";
import axios from "axios";
import type {
  Item,
  ItemSearchResponse,
  ItemDetail,
  ItemByIdResponse,
  // Attribute API is admin-only – uncomment when available to vendor:
  // CategoryAttribute,
  // CategoryAttributesResponse,
  // AttributeOption,
} from "@/src/types/item-search.types";

const SEARCH_DEBOUNCE_MS = 350;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Attribute API (combination mode) – uncomment when API is available:
// type CombinationRow = { optionIds: string[]; price: string; stock: string; sku: string };
// function cartesian<T>(arrays: T[][]): T[][] {
//   if (arrays.length === 0) return [[]];
//   const [first, ...rest] = arrays;
//   const restProduct = cartesian(rest);
//   return first.flatMap((f) => restProduct.map((r) => [f, ...r]));
// }

export function AddItem() {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [itemSearchQuery, setItemSearchQuery] = useState("");
  const [itemSearchDebounced, setItemSearchDebounced] = useState("");
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);
  const [itemDetailLoading, setItemDetailLoading] = useState(false);
  // Attribute API is admin-only – uncomment when available:
  // const [categoryAttributes, setCategoryAttributes] = useState<CategoryAttribute[]>([]);
  // const [attributesLoading, setAttributesLoading] = useState(false);
  // const [selectedOptionIdsByAttribute, setSelectedOptionIdsByAttribute] = useState<Record<string, string[]>>({});
  // const [combinationRows, setCombinationRows] = useState<CombinationRow[]>([]);

  // Basic pricing state
  const [salePrice, setSalePrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [lowStockAlert, setLowStockAlert] = useState("");

  // Attribute API is admin-only – use combination mode when API is available:
  const pricingMode: "basic" | "combination" = "basic";
  // useMemo(() => {
  //   const hasMultipleOptions = categoryAttributes.some(
  //     (attr) => (attr.AttributeOptionsJson?.length ?? 0) > 1
  //   );
  //   return hasMultipleOptions ? "combination" : "basic";
  // }, [categoryAttributes]);

  // Debounce search query
  useEffect(() => {
    const t = setTimeout(() => setItemSearchDebounced(itemSearchQuery.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [itemSearchQuery]);

  // Fetch search results via GET /Item/search
  useEffect(() => {
    if (!itemSearchDebounced) {
      setSearchResults([]);
      return;
    }
    let cancelled = false;
    setSearchLoading(true);
    const params = new URLSearchParams({
      searchTerm: itemSearchDebounced,
      pageSize: "10",
      pageNumber: "1",
    });
    axios
      .get<ItemSearchResponse>(`${BASE_URL}/Item/search?${params.toString()}`)
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

  const handleSelectItem = useCallback((item: Item) => {
    setItemSearchQuery("");
    setItemSearchDebounced("");
    setSearchResults([]);
    setSearchDropdownOpen(false);
    setItemDetail(null);
    // setCategoryAttributes([]);
    // setSelectedOptionIdsByAttribute({});
    // setCombinationRows([]);

    setItemDetailLoading(true);
    // setAttributesLoading(true);
    axios
      .get<ItemByIdResponse>(`${BASE_URL}/Item/${item.id}`)
      .then((res) => {
        const detail = res.data?.data;
        if (!detail) return;
        setItemDetail(detail);
        const price =
          detail.baseSalesPrice ?? detail.minimumPrice ?? detail.maximumPrice ?? detail.basePrice;
        if (price != null && !Number.isNaN(Number(price))) setSalePrice(String(price));
        if (detail.basePrice != null && !Number.isNaN(Number(detail.basePrice)))
          setCostPrice(String(detail.basePrice));
        if (detail.quantity != null && !Number.isNaN(Number(detail.quantity)))
          setStockQuantity(String(detail.quantity));
        // Attribute API is admin-only – uncomment when available:
        // return axios
        //   .get<CategoryAttributesResponse>(`${BASE_URL}/Attribute/category/${detail.categoryId}`)
        //   .then((attrRes) => ({ detail, attrs: attrRes.data?.data ?? [] }));
      })
      // .then((payload) => {
      //   if (!payload) return;
      //   setCategoryAttributes(payload.attrs);
      //   const byAttr: Record<string, string[]> = {};
      //   payload.attrs.forEach((attr) => {
      //     const values = payload.detail.itemAttributes
      //       .filter((a) => a.attributeId === attr.attributeId)
      //       .map((a) => a.value)
      //       .filter(Boolean);
      //     const options = attr.AttributeOptionsJson ?? [];
      //     const firstOption = [...options].sort((a, b) => a.displayOrder - b.displayOrder)[0];
      //     byAttr[attr.attributeId] =
      //       values.length > 0 ? values : (firstOption ? [firstOption.id] : []);
      //   });
      //   setSelectedOptionIdsByAttribute(byAttr);
      // })
      .catch(() => {
        setItemDetail(null);
        // setCategoryAttributes([]);
      })
      .finally(() => {
        setItemDetailLoading(false);
        // setAttributesLoading(false);
      });
  }, []);

  // Attribute API is admin-only – uncomment when available:
  // const orderedAttributes = useMemo(
  //   () => [...categoryAttributes].sort((a, b) => a.displayOrder - b.displayOrder),
  //   [categoryAttributes]
  // );
  // useEffect(() => {
  //   if (pricingMode !== "combination" || orderedAttributes.length === 0) {
  //     setCombinationRows([]);
  //     return;
  //   }
  //   const optionIdArrays = orderedAttributes.map(
  //     (attr) => selectedOptionIdsByAttribute[attr.attributeId] ?? []
  //   );
  //   const hasEmpty = optionIdArrays.some((arr) => arr.length === 0);
  //   if (hasEmpty) {
  //     setCombinationRows([]);
  //     return;
  //   }
  //   const product = cartesian(optionIdArrays);
  //   const defaultPrice = itemDetail?.basePrice != null ? String(itemDetail.basePrice) : "";
  //   const defaultStock = itemDetail?.quantity != null ? String(itemDetail.quantity) : "";
  //   setCombinationRows((prev) => {
  //     const prevByKey = new Map(prev.map((r) => [r.optionIds.join("|"), r]));
  //     return product.map((optionIds) => {
  //       const key = optionIds.join("|");
  //       const existing = prevByKey.get(key);
  //       return {
  //         optionIds,
  //         price: existing?.price ?? defaultPrice,
  //         stock: existing?.stock ?? defaultStock,
  //         sku: existing?.sku ?? "",
  //       };
  //     });
  //   });
  // }, [pricingMode, orderedAttributes, selectedOptionIdsByAttribute, itemDetail?.basePrice, itemDetail?.quantity]);
  // const toggleAttributeOption = useCallback((attributeId: string, optionId: string) => {
  //   setSelectedOptionIdsByAttribute((prev) => {
  //     const current = prev[attributeId] ?? [];
  //     const has = current.includes(optionId);
  //     const next = has ? current.filter((id) => id !== optionId) : [...current, optionId];
  //     return { ...prev, [attributeId]: next.length > 0 ? next : current };
  //   });
  // }, []);
  // const selectAllAttributeOptions = useCallback((attributeId: string, optionIds: string[]) => {
  //   setSelectedOptionIdsByAttribute((prev) => ({ ...prev, [attributeId]: optionIds }));
  // }, []);

  const clearSelectedItem = useCallback(() => {
    setItemDetail(null);
    // setCategoryAttributes([]);
    // setSelectedOptionIdsByAttribute({});
    // setCombinationRows([]);
    setSalePrice("");
    setCostPrice("");
    setStockQuantity("");
    setLowStockAlert("");
  }, []);

  // Dynamic calculations for basic pricing
  const salePriceNum = parseFloat(salePrice) || 0;
  const costPriceNum = parseFloat(costPrice) || 0;
  const stockNum = parseInt(stockQuantity, 10) || 0;
  const profitMargin =
    salePriceNum > 0 ? (((salePriceNum - costPriceNum) / salePriceNum) * 100).toFixed(1) : "—";
  const profitPerUnit = (salePriceNum - costPriceNum).toFixed(2);
  const totalValue = (salePriceNum * stockNum).toFixed(2);

  // Attribute API (combination mode) – uncomment when available:
  // const combinationTotals = useMemo(() => {
  //   let totalValueComb = 0;
  //   combinationRows.forEach((row) => {
  //     const p = parseFloat(row.price) || 0;
  //     const s = parseInt(row.stock, 10) || 0;
  //     totalValueComb += p * s;
  //   });
  //   return { totalValue: totalValueComb.toFixed(2), count: combinationRows.length };
  // }, [combinationRows]);
  // const updateCombinationRow = useCallback(
  //   (index: number, field: "price" | "stock" | "sku", value: string) => {
  //     setCombinationRows((prev) => {
  //       const next = [...prev];
  //       next[index] = { ...next[index], [field]: value };
  //       return next;
  //     });
  //   },
  //   []
  // );
  // const getOptionLabel = useCallback(
  //   (attr: CategoryAttribute, optionId: string): string => {
  //     const opt = attr.AttributeOptionsJson?.find((o) => o.id === optionId);
  //     if (!opt) return optionId;
  //     return isArabic ? opt.titleAr : opt.titleEn;
  //   },
  //   [isArabic]
  // );

  const displayTitle = (item: Item | ItemDetail) =>
    (isArabic ? item.titleAr : item.titleEn) || item.title || "";
  const displayCategory = (item: Item | ItemDetail) =>
    (isArabic ? item.categoryTitleAr : item.categoryTitleEn) || item.categoryTitle || "—";
  const displayBrand = (item: Item | ItemDetail) =>
    (isArabic ? item.brandTitleAr : item.brandTitleEn) || item.brandTitle || "—";
  const itemImage = (item: Item | ItemDetail) => {
    const thumb = item.thumbnailImage;
    if (thumb)
      return `${process.env.NEXT_PUBLIC_DOMAIN || ""}/${thumb}`.replace(/\/+/g, "/");
    const detail = item as ItemDetail;
    if (Array.isArray(detail.images) && detail.images.length > 0 && detail.images[0]?.path)
      return `${process.env.NEXT_PUBLIC_DOMAIN || ""}/${detail.images[0].path}`.replace(/\/+/g, "/");
    return "/placeholder.png";
  };

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
        {itemDetail && (
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
            placeholder="Search for an item"
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
                    <li key={item.id}>
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
                            {item.sku} · {displayCategory(item)}
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

      {itemDetailLoading && (
        <div className="mb-6 p-6 bg-white rounded-lg border border-gray-200 flex items-center justify-center gap-2 text-gray-600">
          <i className="fa-solid fa-spinner fa-spin" aria-hidden />
          <span>Loading item details...</span>
        </div>
      )}

      {itemDetail && !itemDetailLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Item Information</h3>
              <div className="space-y-4">
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={itemImage(itemDetail)}
                    alt={displayTitle(itemDetail)}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Product Name</p>
                  <p className="font-medium text-foreground">{displayTitle(itemDetail)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">SKU</p>
                  <p className="text-sm text-foreground">{itemDetail.sku ?? "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="text-sm text-foreground">{displayCategory(itemDetail)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Brand</p>
                  <p className="text-sm text-foreground">{displayBrand(itemDetail)}</p>
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

              {/* Attribute API is admin-only – uncomment when GET /Attribute/category/{categoryId} is available to vendor: */}
              {/* {pricingMode === "combination" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Select at least one option per attribute</h4>
                    {attributesLoading ? (
                      <p className="text-sm text-gray-500">Loading attributes...</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {orderedAttributes.map((attr) => {
                          const title = isArabic ? attr.titleAr : attr.titleEn;
                          const options = [...(attr.AttributeOptionsJson ?? [])].sort(
                            (a, b) => a.displayOrder - b.displayOrder
                          );
                          const selected = selectedOptionIdsByAttribute[attr.attributeId] ?? [];
                          return (
                            <div key={attr.id}>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                {title}
                                {attr.isRequired && <span className="text-red-500 ml-1">*</span>}
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {options.map((opt: AttributeOption) => {
                                  const label = isArabic ? opt.titleAr : opt.titleEn;
                                  const checked = selected.includes(opt.id);
                                  return (
                                    <label
                                      key={opt.id}
                                      className="flex items-center rounded border border-gray-300 px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleAttributeOption(attr.attributeId, opt.id)}
                                        className="rounded border-gray-300 text-primary focus:ring-primary/20"
                                      />
                                      <span className="ml-2">{label}</span>
                                    </label>
                                  );
                                })}
                              </div>
                              {options.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => selectAllAttributeOptions(attr.attributeId, options.map((o) => o.id))}
                                  className="mt-1 text-xs text-primary hover:underline">
                                  Select all
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
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
                            {orderedAttributes.map((attr) => (
                              <th
                                key={attr.attributeId}
                                className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                                {isArabic ? attr.titleAr : attr.titleEn}
                              </th>
                            ))}
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
                              <tr key={row.optionIds.join("|")} className="border-t border-gray-100">
                                {orderedAttributes.map((attr, attrIndex) => (
                                  <td key={attr.attributeId} className="px-4 py-3 text-sm">
                                    {getOptionLabel(attr, row.optionIds[attrIndex] ?? "")}
                                  </td>
                                ))}
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
                                <td className="px-4 py-3">
                                  <input
                                    type="text"
                                    value={row.sku}
                                    onChange={(e) =>
                                      updateCombinationRow(index, "sku", e.target.value)
                                    }
                                    placeholder="SKU"
                                    className="w-24 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary/20"
                                  />
                                </td>
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
                          Combinations are generated from your selected attribute options. Choose at
                          least one option per attribute above, then set price and stock for each
                          combination.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
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

      {!itemDetail && !itemDetailLoading && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <i className="fa-solid fa-box-open text-4xl text-gray-300 mb-3" aria-hidden />
          <p className="text-gray-600">
            Search and select an item above to configure your offer and pricing.
          </p>
        </div>
      )}

      {itemDetail && (
        <div className="mt-6">
          <button
            type="button"
            onClick={clearSelectedItem}
            className="text-sm text-gray-600 hover:text-gray-800 underline">
            Change item
          </button>
        </div>
      )}
    </div>
  );
}
