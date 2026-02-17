"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/src/i18n/routing";
import { useLocale } from "next-intl";
import axios from "axios";
import { customAxios } from "@/src/auth/customAxios";
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

export type VendorWarehouse = {
  id: string;
  address: string;
  isDefaultPlatformWarehouse: boolean;
  vendorId: string | null;
  email: string | null;
  vendorName: string | null;
  isActive: boolean;
};

export type ItemCondition = {
  id: string;
  nameAr: string;
  nameEn: string;
  isNew: boolean;
};

/** GET /Item/combinations/{itemId} – combination attribute value in a combination */
export type CombinationAttributeValue = {
  combinationAttributeId: string;
  attributeId: string;
  attributeTitleAr: string;
  attributeTitleEn: string;
  attributeTitle: string;
  attributeValue: string;
};

/** Single combination from GET /Item/combinations/{itemId} */
export type ItemCombination = {
  itemId: string;
  itemCombinationId: string;
  isDefault: boolean;
  combinationAttributeValue: CombinationAttributeValue[];
  id: string;
};

/** User-entered pricing row for one combination (keyed by itemCombinationId) */
export type CombinationPricingRow = {
  enabled: boolean;
  price: string;
  salesPrice: string;
  availableQuantity: string;
  minOrderQuantity: string;
  maxOrderQuantity: string;
  lowStockThreshold: string;
  barcode: string;
  sku: string;
};

/** Request body for POST VendorItem/save (create or edit). */
export type VendorItemSavePricing = {
  pricingId?: string;
  existingCombinationId?: string;
  price: number;
  salesPrice: number;
  availableQuantity: number;
  conditionId: string;
  minOrderQuantity?: number;
  maxOrderQuantity?: number;
  lowStockThreshold?: number;
  barcode?: string;
  sku?: string;
};

export type VendorItemSaveRequest = {
  vendorItemId?: string;
  itemId: string;
  warehouseId: string;
  estimatedDeliveryDays: number;
  isFreeShipping: boolean;
  hasWarranty: boolean;
  pricings: VendorItemSavePricing[];
};

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
  const router = useRouter();
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

  // Warehouses (platform + vendor)
  const [warehouses, setWarehouses] = useState<VendorWarehouse[]>([]);
  const [warehousesLoading, setWarehousesLoading] = useState(true);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState("");

  // Item conditions (New, Used, Refurbished, etc.)
  const [itemConditions, setItemConditions] = useState<ItemCondition[]>([]);
  const [conditionsLoading, setConditionsLoading] = useState(true);
  const [selectedConditionId, setSelectedConditionId] = useState("");

  // Fulfillment (in addition to warehouse)
  const [estimatedDeliveryDays, setEstimatedDeliveryDays] = useState(3);
  const [isFreeShipping, setIsFreeShipping] = useState(false);
  const [hasWarranty, setHasWarranty] = useState(false);

  // Item combinations (from GET /Item/combinations/{itemId})
  const [combinations, setCombinations] = useState<ItemCombination[]>([]);
  const [combinationPricing, setCombinationPricing] = useState<Record<string, CombinationPricingRow>>({});

  // Basic pricing state (used when item has no combinations)
  const [salePrice, setSalePrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [lowStockAlert, setLowStockAlert] = useState("");

  // Save offer
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const pricingMode: "basic" | "combination" = combinations.length > 0 ? "combination" : "basic";
  // useMemo(() => {
  //   const hasMultipleOptions = categoryAttributes.some(
  //     (attr) => (attr.AttributeOptionsJson?.length ?? 0) > 1
  //   );
  //   return hasMultipleOptions ? "combination" : "basic";
  // }, [categoryAttributes]);

  // Fetch available warehouses for vendor (platform + vendor's own)
  useEffect(() => {
    let cancelled = false;
    setWarehousesLoading(true);
    customAxios
      .get<VendorWarehouse[]>("/vendors/me/warehouses")
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        const active = list.filter((w) => w.isActive);
        if (!cancelled) {
          setWarehouses(active);
          if (active.length > 0) {
            setSelectedWarehouseId((prev) => prev || active[0].id);
          }
        }
      })
      .catch(() => {
        if (!cancelled) setWarehouses([]);
      })
      .finally(() => {
        if (!cancelled) setWarehousesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch item conditions (New, Used, Refurbished, etc.)
  useEffect(() => {
    let cancelled = false;
    setConditionsLoading(true);
    customAxios
      .get<{ data: ItemCondition[] }>("/item-conditions")
      .then((res) => {
        const list = Array.isArray(res.data?.data) ? res.data.data : [];
        if (!cancelled) {
          setItemConditions(list);
          if (list.length > 0) {
            setSelectedConditionId((prev) => prev || list[0].id);
          }
        }
      })
      .catch(() => {
        if (!cancelled) setItemConditions([]);
      })
      .finally(() => {
        if (!cancelled) setConditionsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
    setCombinations([]);
    setCombinationPricing({});

    setItemDetailLoading(true);
    const itemId = item.id;
    Promise.all([
      axios.get<ItemByIdResponse>(`${BASE_URL}/Item/${itemId}`),
      axios.get<{ success: boolean; data: ItemCombination[] }>(`${BASE_URL}/Item/combinations/${itemId}`),
    ])
      .then(([detailRes, combRes]) => {
        const detail = detailRes.data?.data;
        if (!detail) return;
        setItemDetail(detail);
        const combList = Array.isArray(combRes.data?.data) ? combRes.data.data : [];
        setCombinations(combList);

        const defaultPrice = detail.basePrice != null && !Number.isNaN(Number(detail.basePrice))
          ? String(detail.basePrice)
          : "";
        const defaultSales =
          detail.baseSalesPrice != null && !Number.isNaN(Number(detail.baseSalesPrice))
            ? String(detail.baseSalesPrice)
            : detail.minimumPrice != null && !Number.isNaN(Number(detail.minimumPrice))
              ? String(detail.minimumPrice)
              : defaultPrice;
        const defaultQty =
          detail.quantity != null && !Number.isNaN(Number(detail.quantity))
            ? String(detail.quantity)
            : "0";

        if (combList.length === 0) {
          setSalePrice(defaultSales);
          setCostPrice(defaultPrice);
          setStockQuantity(defaultQty);
        } else {
          const initial: Record<string, CombinationPricingRow> = {};
          combList.forEach((c) => {
            initial[c.itemCombinationId] = {
              enabled: false,
              price: defaultPrice,
              salesPrice: defaultSales,
              availableQuantity: defaultQty,
              minOrderQuantity: "1",
              maxOrderQuantity: "99999",
              lowStockThreshold: "0",
              barcode: detail.barcode ?? "",
              sku: detail.sku ?? "",
            };
          });
          setCombinationPricing(initial);
        }
      })
      .catch(() => {
        setItemDetail(null);
        setCombinations([]);
        setCombinationPricing({});
      })
      .finally(() => {
        setItemDetailLoading(false);
      });
  }, []);


  const clearSelectedItem = useCallback(() => {
    setItemDetail(null);
    setCombinations([]);
    setCombinationPricing({});
    setSalePrice("");
    setCostPrice("");
    setStockQuantity("");
    setLowStockAlert("");
    setSelectedConditionId("");
  }, []);

  const updateCombinationPricing = useCallback(
    (itemCombinationId: string, field: keyof CombinationPricingRow, value: string | boolean) => {
      setCombinationPricing((prev) => {
        const row = prev[itemCombinationId];
        if (!row) return prev;
        return {
          ...prev,
          [itemCombinationId]: { ...row, [field]: value },
        };
      });
    },
    []
  );

  const combinationLabel = useCallback(
    (c: ItemCombination) => {
      const parts = (c.combinationAttributeValue ?? []).map((av) =>
        isArabic ? av.attributeTitleAr : av.attributeTitleEn
      );
      return parts.length > 0 ? parts.join(" · ") : `Combination ${c.itemCombinationId.slice(0, 8)}`;
    },
    [isArabic]
  );

  const handleSaveOffer = useCallback(async () => {
    if (!itemDetail || !selectedWarehouseId || !selectedConditionId) {
      setSaveError("Please select an item, warehouse, and condition.");
      return;
    }

    let pricings: VendorItemSaveRequest["pricings"];

    if (pricingMode === "combination") {
      const enabled = combinations.filter((c) => combinationPricing[c.itemCombinationId]?.enabled);
      if (enabled.length === 0) {
        setSaveError("Please enable at least one combination to sell.");
        return;
      }
      for (const c of enabled) {
        const row = combinationPricing[c.itemCombinationId]!;
        const salesPriceNum = parseFloat(row.salesPrice);
        const availableQty = parseInt(row.availableQuantity, 10);
        if (Number.isNaN(salesPriceNum) || salesPriceNum < 0) {
          setSaveError(`Enter a valid sale price for: ${combinationLabel(c)}`);
          return;
        }
        if (Number.isNaN(availableQty) || availableQty < 0) {
          setSaveError(`Enter a valid quantity for: ${combinationLabel(c)}`);
          return;
        }
      }
      pricings = enabled.map((c) => {
        const row = combinationPricing[c.itemCombinationId]!;
        const priceNum = parseFloat(row.price) || 0;
        const salesPriceNum = parseFloat(row.salesPrice) || 0;
        const availableQty = parseInt(row.availableQuantity, 10) || 0;
        const minOrder = parseInt(row.minOrderQuantity, 10) || 1;
        const maxOrder = parseInt(row.maxOrderQuantity, 10) || 99999;
        const lowStock = parseInt(row.lowStockThreshold, 10) || 0;
        return {
          existingCombinationId: c.itemCombinationId,
          price: priceNum,
          salesPrice: salesPriceNum,
          availableQuantity: availableQty,
          conditionId: selectedConditionId,
          minOrderQuantity: minOrder,
          maxOrderQuantity: maxOrder,
          lowStockThreshold: lowStock,
          barcode: row.barcode ?? "",
          sku: row.sku ?? "",
        };
      });
    } else {
      const salesPriceNum = parseFloat(salePrice);
      const priceNum = parseFloat(costPrice);
      const availableQty = parseInt(stockQuantity, 10) || 0;
      if (Number.isNaN(salesPriceNum) || salesPriceNum < 0) {
        setSaveError("Please enter a valid sale price.");
        return;
      }
      if (availableQty < 0) {
        setSaveError("Please enter a valid stock quantity.");
        return;
      }
      pricings = [
        {
          price: Number.isNaN(priceNum) ? 0 : priceNum,
          salesPrice: salesPriceNum,
          availableQuantity: availableQty,
          conditionId: selectedConditionId,
          minOrderQuantity: 1,
          maxOrderQuantity: 99999,
          lowStockThreshold: parseInt(lowStockAlert, 10) || 0,
          barcode: itemDetail.barcode ?? "",
          sku: itemDetail.sku ?? "",
        },
      ];
    }

    setSaveError(null);
    setSaveLoading(true);
    try {
      const body: VendorItemSaveRequest = {
        itemId: itemDetail.id,
        warehouseId: selectedWarehouseId,
        estimatedDeliveryDays,
        isFreeShipping,
        hasWarranty,
        pricings,
      };
      await customAxios.post("/VendorItem/save", body);
      router.push(`/${locale}/vendor/items`);
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? String((err as { response?: { data?: { message?: string } } }).response?.data?.message ?? "Failed to save offer")
          : "Failed to save offer";
      setSaveError(message);
    } finally {
      setSaveLoading(false);
    }
  }, [
    itemDetail,
    selectedWarehouseId,
    selectedConditionId,
    pricingMode,
    combinations,
    combinationPricing,
    combinationLabel,
    salePrice,
    costPrice,
    stockQuantity,
    lowStockAlert,
    estimatedDeliveryDays,
    isFreeShipping,
    hasWarranty,
    locale,
    router,
  ]);

  // Dynamic calculations for basic pricing
  const salePriceNum = parseFloat(salePrice) || 0;
  const costPriceNum = parseFloat(costPrice) || 0;
  const stockNum = parseInt(stockQuantity, 10) || 0;
  const profitMargin =
    salePriceNum > 0 ? (((salePriceNum - costPriceNum) / salePriceNum) * 100).toFixed(1) : "—";
  const profitPerUnit = (salePriceNum - costPriceNum).toFixed(2);
  const totalValue = (salePriceNum * stockNum).toFixed(2);


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
          <div className="flex flex-col items-end gap-2">
            {saveError && (
              <p className="text-sm text-red-600" role="alert">
                {saveError}
              </p>
            )}
            <button
              type="button"
              onClick={handleSaveOffer}
              disabled={saveLoading}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors disabled:opacity-60 disabled:pointer-events-none">
              {saveLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2" aria-hidden />
                  Saving...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-rocket mr-2" aria-hidden />
                  Publish Offer
                </>
              )}
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
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Condition
                  </label>
                  <select
                    value={selectedConditionId}
                    onChange={(e) => setSelectedConditionId(e.target.value)}
                    disabled={conditionsLoading}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                    aria-label="Item condition">
                    <option value="">
                      {conditionsLoading ? "Loading conditions..." : "Select condition"}
                    </option>
                    {itemConditions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {isArabic ? c.nameAr : c.nameEn}
                      </option>
                    ))}
                  </select>
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
                    value={selectedWarehouseId}
                    onChange={(e) => setSelectedWarehouseId(e.target.value)}
                    disabled={warehousesLoading}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                    aria-label="Warehouse">
                    <option value="">
                      {warehousesLoading ? "Loading warehouses..." : "Select Warehouse"}
                    </option>
                    {warehouses.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.isDefaultPlatformWarehouse
                          ? `Platform — ${w.address}`
                          : (w.vendorName || w.address)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Handling Time
                  </label>
                  <select
                    value={estimatedDeliveryDays}
                    onChange={(e) => setEstimatedDeliveryDays(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    aria-label="Estimated delivery days">
                    <option value={1}>1 business day</option>
                    <option value={2}>2 business days</option>
                    <option value={3}>3 business days</option>
                    <option value={5}>5 business days</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFreeShipping}
                    onChange={(e) => setIsFreeShipping(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary/20"
                    aria-label="Free shipping"
                  />
                  <span className="text-sm text-foreground">Free shipping</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasWarranty}
                    onChange={(e) => setHasWarranty(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary/20"
                    aria-label="Has warranty"
                  />
                  <span className="text-sm text-foreground">Has warranty</span>
                </label>
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

              {pricingMode === "combination" && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Select which combinations you sell and set price, quantity, and identifiers for each.
                  </p>
                  <div className="space-y-6">
                    {combinations.map((c) => {
                      const row = combinationPricing[c.itemCombinationId];
                      if (!row) return null;
                      return (
                        <div
                          key={c.itemCombinationId}
                          className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                          <div className="flex items-center gap-3 mb-4">
                            <input
                              type="checkbox"
                              id={`sell-${c.itemCombinationId}`}
                              checked={row.enabled}
                              onChange={(e) =>
                                updateCombinationPricing(c.itemCombinationId, "enabled", e.target.checked)
                              }
                              className="rounded border-gray-300 text-primary focus:ring-primary/20"
                            />
                            <label
                              htmlFor={`sell-${c.itemCombinationId}`}
                              className="font-medium text-foreground cursor-pointer">
                              {combinationLabel(c)}
                            </label>
                          </div>
                          {row.enabled && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-7">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Cost Price (EGP)
                                </label>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  value={row.price}
                                  onChange={(e) =>
                                    updateCombinationPricing(c.itemCombinationId, "price", e.target.value)
                                  }
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Sale Price (EGP)
                                </label>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  value={row.salesPrice}
                                  onChange={(e) =>
                                    updateCombinationPricing(c.itemCombinationId, "salesPrice", e.target.value)
                                  }
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Quantity
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  value={row.availableQuantity}
                                  onChange={(e) =>
                                    updateCombinationPricing(
                                      c.itemCombinationId,
                                      "availableQuantity",
                                      e.target.value
                                    )
                                  }
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Min order
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  value={row.minOrderQuantity}
                                  onChange={(e) =>
                                    updateCombinationPricing(
                                      c.itemCombinationId,
                                      "minOrderQuantity",
                                      e.target.value
                                    )
                                  }
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Max order
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  value={row.maxOrderQuantity}
                                  onChange={(e) =>
                                    updateCombinationPricing(
                                      c.itemCombinationId,
                                      "maxOrderQuantity",
                                      e.target.value
                                    )
                                  }
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Low stock alert
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  value={row.lowStockThreshold}
                                  onChange={(e) =>
                                    updateCombinationPricing(
                                      c.itemCombinationId,
                                      "lowStockThreshold",
                                      e.target.value
                                    )
                                  }
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  Barcode
                                </label>
                                <input
                                  type="text"
                                  value={row.barcode}
                                  onChange={(e) =>
                                    updateCombinationPricing(c.itemCombinationId, "barcode", e.target.value)
                                  }
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                  SKU
                                </label>
                                <input
                                  type="text"
                                  value={row.sku}
                                  onChange={(e) =>
                                    updateCombinationPricing(c.itemCombinationId, "sku", e.target.value)
                                  }
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Legacy attribute-based combination UI (admin-only) – kept for reference: */}
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
