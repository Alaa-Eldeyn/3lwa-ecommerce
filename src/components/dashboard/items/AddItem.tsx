"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/src/i18n/routing";
import { useLocale } from "next-intl";
import { AlertTriangle } from "lucide-react";
import axios from "axios";
import { customAxios } from "@/src/auth/customAxios";
import { CURRENCY_SYMBOL, formatPrice } from "@/src/config/currency";
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

/** GET /Item/combinations/{itemId} – image for a combination */
export type CombinationImage = {
  path: string;
  order: number;
  isDefault: boolean;
  id: string;
};

/** GET /Item/combinations/{itemId} – attribute + value in a combination */
export type CombinationAttribute = {
  attributeTitleAr: string;
  attributeTitleEn: string;
  attributeTitle: string;
  valueTitleAr: string;
  valueTitleEn: string;
  valueTitle: string;
};

/** Single combination from GET /Item/combinations/{itemId} */
export type ItemCombination = {
  id: string;
  itemId: string;
  basePrice: number;
  isDefault: boolean;
  images: CombinationImage[];
  combinationAttributes: CombinationAttribute[];
};

/** Response from GET /Item/combinations/{itemId} */
export type ItemCombinationsResponse = {
  success: boolean;
  statusCode: number;
  data: ItemCombination[];
  message: string;
  errorCode: string | null;
  errors: string[];
};

/** User-entered pricing row for one combination (keyed by combination id) */
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
  conditionId: string;
  taxIncludedInPrice: boolean;
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

/** Confirmation modal for deactivating/deleting a variant (same pattern as ClearCartModal). */
function DeactivateVariantModal({
  isOpen,
  title,
  description,
  confirmLabel = "Deactivate",
  onCancel,
  onConfirm,
}: {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
      onClick={onCancel}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="text-red-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 mb-6">{description}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2.5 px-4 rounded-xl bg-gray-200 text-gray-900 hover:bg-gray-300 transition-colors font-medium">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-2.5 px-4 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

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
  const [combinationPricing, setCombinationPricing] = useState<
    Record<string, CombinationPricingRow>
  >({});

  // Basic pricing state (used when item has no combinations)
  const [salePrice, setSalePrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [lowStockAlert, setLowStockAlert] = useState("");

  // Save offer
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Variants UI: how many to show, expand/collapse, add new form
  const [variantsShownCount, setVariantsShownCount] = useState(10);
  const [expandedCombinationIds, setExpandedCombinationIds] = useState<Set<string>>(new Set());
  const [showNewComboForm, setShowNewComboForm] = useState(false);
  const [basicCardExpanded, setBasicCardExpanded] = useState(true);

  // Deactivate variant confirmation modal: combination id or 'basic' for single-product offer
  const [variantToDeactivate, setVariantToDeactivate] = useState<string | "basic" | null>(null);

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

  // Sync default condition into combination rows when conditions load
  useEffect(() => {
    if (!selectedConditionId || itemConditions.length === 0) return;
    setCombinationPricing((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const id of Object.keys(next)) {
        if (next[id]!.conditionId === "") {
          next[id] = { ...next[id]!, conditionId: selectedConditionId };
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [selectedConditionId, itemConditions.length]);

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
      axios.get<ItemCombinationsResponse>(`${BASE_URL}/Item/combinations/${itemId}`),
    ])
      .then(([detailRes, combRes]) => {
        const detail = detailRes.data?.data;
        if (!detail) return;
        setItemDetail(detail);
        const combList = Array.isArray(combRes.data?.data) ? combRes.data.data : [];
        setCombinations(combList);

        const defaultPrice =
          detail.basePrice != null && !Number.isNaN(Number(detail.basePrice))
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
            const comboPrice =
              c.basePrice != null && !Number.isNaN(Number(c.basePrice)) && c.basePrice > 0
                ? String(c.basePrice)
                : defaultPrice;
            initial[c.id] = {
              enabled: false,
              price: comboPrice,
              salesPrice: defaultSales,
              availableQuantity: defaultQty,
              minOrderQuantity: "1",
              maxOrderQuantity: "99999",
              lowStockThreshold: "0",
              barcode: detail.barcode ?? "",
              sku: detail.sku ?? "",
              conditionId: "",
              taxIncludedInPrice: false,
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
      const parts = (c.combinationAttributes ?? []).map((a) =>
        isArabic ? a.valueTitleAr : a.valueTitleEn
      );
      return parts.length > 0 ? parts.join(" · ") : `Combination ${c.id.slice(0, 8)}`;
    },
    [isArabic]
  );

  /** Attribute tags for variant card header: e.g. [{ label: "Storage", value: "256GB" }] */
  const combinationAttributeTags = useCallback(
    (c: ItemCombination) =>
      (c.combinationAttributes ?? []).map((a) => ({
        label: isArabic ? a.attributeTitleAr : a.attributeTitleEn,
        value: isArabic ? a.valueTitleAr : a.valueTitleEn,
      })),
    [isArabic]
  );

  const displayedVariants = useMemo(
    () => combinations.slice(0, variantsShownCount),
    [combinations, variantsShownCount]
  );
  const hasMoreVariants = combinations.length > variantsShownCount;
  const configuredCount = combinations.filter((c) => combinationPricing[c.id]?.enabled).length;

  const copyToClipboard = useCallback((text: string) => {
    void navigator.clipboard.writeText(text);
  }, []);

  // Static options for warehouse when API returns empty (per requirement: keep UI with fixed data)
  const effectiveWarehouses: VendorWarehouse[] =
    warehouses.length > 0
      ? warehouses
      : [
          {
            id: "main-cairo",
            address: "Main Cairo Warehouse",
            isDefaultPlatformWarehouse: true,
            vendorId: null,
            email: null,
            vendorName: null,
            isActive: true,
          },
          {
            id: "alex-hub",
            address: "Alexandria Hub",
            isDefaultPlatformWarehouse: false,
            vendorId: null,
            email: null,
            vendorName: null,
            isActive: true,
          },
          {
            id: "giza-dc",
            address: "Giza Distribution Center",
            isDefaultPlatformWarehouse: false,
            vendorId: null,
            email: null,
            vendorName: null,
            isActive: true,
          },
        ];

  const handleSaveOffer = useCallback(async () => {
    const effectiveConditionId = selectedConditionId || itemConditions[0]?.id;
    if (!itemDetail || !selectedWarehouseId || !effectiveConditionId) {
      setSaveError("Please select an item, warehouse, and condition.");
      return;
    }

    let pricings: VendorItemSaveRequest["pricings"];

    if (pricingMode === "combination") {
      const enabled = combinations.filter((c) => combinationPricing[c.id]?.enabled);
      if (enabled.length === 0) {
        setSaveError("Please enable at least one combination to sell.");
        return;
      }
      for (const c of enabled) {
        const row = combinationPricing[c.id]!;
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
        const row = combinationPricing[c.id]!;
        const priceNum = parseFloat(row.price) || 0;
        const salesPriceNum = parseFloat(row.salesPrice) || 0;
        const availableQty = parseInt(row.availableQuantity, 10) || 0;
        const minOrder = parseInt(row.minOrderQuantity, 10) || 1;
        const maxOrder = parseInt(row.maxOrderQuantity, 10) || 99999;
        const lowStock = parseInt(row.lowStockThreshold, 10) || 0;
        const conditionId = row.conditionId || selectedConditionId;
        return {
          existingCombinationId: c.id,
          price: priceNum,
          salesPrice: salesPriceNum,
          availableQuantity: availableQty,
          conditionId,
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
          conditionId: effectiveConditionId,
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
    const deliveryDays = estimatedDeliveryDays >= 1 ? estimatedDeliveryDays : 1;
    try {
      const body: VendorItemSaveRequest = {
        itemId: itemDetail.id,
        warehouseId: selectedWarehouseId,
        estimatedDeliveryDays: deliveryDays,
        isFreeShipping,
        hasWarranty,
        pricings,
      };
      await customAxios.post("/VendorItem/save", body);
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? String(
              (err as { response?: { data?: { message?: string } } }).response?.data?.message ??
                "Failed to save offer"
            )
          : "Failed to save offer";
      setSaveError(message);
    } finally {
      setSaveLoading(false);
    }
  }, [
    itemDetail,
    selectedWarehouseId,
    selectedConditionId,
    itemConditions,
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
    if (thumb) return `${process.env.NEXT_PUBLIC_DOMAIN || ""}/${thumb}`.replace(/\/+/g, "/");
    const detail = item as ItemDetail;
    if (Array.isArray(detail.images) && detail.images.length > 0 && detail.images[0]?.path)
      return `${process.env.NEXT_PUBLIC_DOMAIN || ""}/${detail.images[0].path}`.replace(
        /\/+/g,
        "/"
      );
    return "/placeholder.png";
  };

  const unitDisplay = itemDetail
    ? (isArabic ? itemDetail.unitTitleAr : itemDetail.unitTitleEn) ||
      itemDetail.unitTitle ||
      "Piece"
    : "Piece";
  const basePriceDisplay =
    itemDetail?.basePrice != null
      ? Number(itemDetail.basePrice).toLocaleString("en-EG", { minimumFractionDigits: 2 })
      : "—";

  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
      <nav className="flex mb-6 text-sm text-gray-500">
        <Link href={`/${locale}/dashboard/items`} className="hover:text-primary">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Configure Offer</span>
      </nav>

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Configure Item Offer</h1>
            <p className="text-gray-500 mt-1">
              Set up pricing, inventory, and fulfillment for your product variants.
            </p>
          </div>
        </div>

        {/* Empty state: no product selected — search to add an item */}
        {!itemDetail && !itemDetailLoading && (
          <section
            id="empty-state-container"
            className="bg-white rounded-xl shadow-card border border-gray-200">
            <div className="px-6 py-8 md:py-16 flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center">
                <i className="fa-solid fa-box-open text-5xl text-primary" aria-hidden />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">No Product Selected</h2>
              <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                To configure an offer, you need to select a product from the catalog. Search for a
                product by name to get started.
              </p>

              <div className="w-full max-w-2xl mb-8">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fa-solid fa-search text-gray-400 text-lg" aria-hidden />
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
                    placeholder="Search by product name"
                    className="block w-full pl-12 pr-4 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    aria-label="Search items"
                  />
                  {searchDropdownOpen && (itemSearchQuery || searchResults.length > 0) && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-auto">
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
                                  <p className="font-medium text-gray-900 truncate">
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
                <div className="bg-gray-50 rounded-lg p-5 text-left border border-gray-200">
                  <div className="w-11 h-11 py-3 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <i className="fa-solid fa-magnifying-glass text-primary text-lg" aria-hidden />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Search Catalog</h3>
                  <p className="text-xs text-gray-500">Find products by name, category, or brand</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-5 text-left border border-gray-200">
                  <div className="w-11 h-11 py-3 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <i className="fa-solid fa-sliders text-primary text-lg" aria-hidden />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Configure Variants</h3>
                  <p className="text-xs text-gray-500">
                    Set pricing and inventory for each variant
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-5 text-left border border-gray-200">
                  <div className="w-11 h-11 py-3 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <i className="fa-solid fa-rocket text-primary text-lg" aria-hidden />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Publish Offer</h3>
                  <p className="text-xs text-gray-500">Go live and start selling immediately</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {itemDetailLoading && (
          <div className="bg-white rounded-xl shadow-card border border-gray-200 p-8 flex items-center justify-center gap-2 text-gray-600">
            <i className="fa-solid fa-spinner fa-spin" aria-hidden />
            <span>Loading item details...</span>
          </div>
        )}

        {itemDetail && !itemDetailLoading && (
          <>
            {/* Product context card */}
            <section
              id="product-context"
              className="bg-white rounded-xl shadow-card border border-gray-200 overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100">
                  <img
                    src={itemImage(itemDetail)}
                    alt="Product Thumbnail"
                    className="w-full h-full object-contain mix-blend-multiply p-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                          {displayCategory(itemDetail)}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs font-medium text-gray-500">
                          {displayBrand(itemDetail)}
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                        {displayTitle(itemDetail)}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {(isArabic
                          ? itemDetail.shortDescriptionAr
                          : itemDetail.shortDescriptionEn) ||
                          (isArabic ? itemDetail.descriptionAr : itemDetail.descriptionEn) ||
                          "—"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={clearSelectedItem}
                      className="text-sm text-primary font-medium hover:underline whitespace-nowrap ml-4">
                      Change Product
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-medium uppercase">
                        Base Price
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {basePriceDisplay !== "" && !Number.isNaN(Number(basePriceDisplay))
                          ? formatPrice(Number(basePriceDisplay))
                          : `${CURRENCY_SYMBOL} ${basePriceDisplay}`}
                      </span>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-medium uppercase">Unit</span>
                      <span className="text-sm font-semibold text-gray-900">{unitDisplay}</span>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-medium uppercase">
                        Total Variants
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {combinations.length > 0
                          ? `${combinations.length} Combinations`
                          : "1 (No variants)"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Fulfillment Settings */}
            <section
              id="fulfillment-settings"
              className="bg-white rounded-xl shadow-card border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <i className="fa-solid fa-truck-fast text-primary" aria-hidden />
                  Fulfillment Settings
                </h3>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                  Applies to all variants
                </span>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Warehouse <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedWarehouseId}
                      onChange={(e) => setSelectedWarehouseId(e.target.value)}
                      disabled={warehousesLoading}
                      className="block w-full pl-3 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-white shadow-sm appearance-none"
                      aria-label="Warehouse">
                      <option value="">
                        {warehousesLoading ? "Loading..." : "Select Warehouse"}
                      </option>
                      {effectiveWarehouses.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.isDefaultPlatformWarehouse
                            ? `Platform — ${w.address}`
                            : w.vendorName || w.address}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <i className="fa-solid fa-chevron-down text-xs" aria-hidden />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Est. Delivery Days <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <i className="fa-regular fa-calendar text-gray-400 text-sm" aria-hidden />
                    </div>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={estimatedDeliveryDays || ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "") setEstimatedDeliveryDays(0);
                        else {
                          const n = parseInt(v, 10);
                          if (!Number.isNaN(n) && n >= 1 && n <= 99) setEstimatedDeliveryDays(n);
                        }
                      }}
                      className="block w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="e.g. 1-3"
                      aria-label="Estimated delivery days"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Shipping Policy</label>
                  <label className="flex items-center p-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-primary transition-colors group h-[42px]">
                    <input
                      type="checkbox"
                      checked={isFreeShipping}
                      onChange={(e) => setIsFreeShipping(e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      aria-label="Free Shipping"
                    />
                    <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                      Free Shipping
                    </span>
                    <i
                      className="fa-solid fa-tag ml-auto text-gray-400 group-hover:text-primary text-xs"
                      aria-hidden
                    />
                  </label>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Warranty</label>
                  <label className="flex items-center p-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-primary transition-colors group h-[42px]">
                    <input
                      type="checkbox"
                      checked={hasWarranty}
                      onChange={(e) => setHasWarranty(e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      aria-label="Include Warranty"
                    />
                    <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                      Include Warranty
                    </span>
                    <i
                      className="fa-solid fa-shield-check ml-auto text-gray-400 group-hover:text-primary text-xs"
                      aria-hidden
                    />
                  </label>
                </div>
              </div>
            </section>

            {/* Variants & Pricing */}
            <section id="combinations-pricing" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Variants & Pricing</h3>
                <div className="flex items-center gap-3">
                  {pricingMode === "combination" && (
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">
                      <i className="fa-solid fa-circle-info text-primary" aria-hidden />
                      {configuredCount} of {combinations.length} variants configured
                    </div>
                  )}
                </div>
              </div>

              {saveError && (
                <p className="text-sm text-red-600" role="alert">
                  {saveError}
                </p>
              )}

              {pricingMode === "basic" && (
                <div className="bg-white rounded-xl shadow-card border border-gray-200 overflow-hidden">
                  <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>SKU: {itemDetail?.sku ?? "—"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                        <i className="fa-solid fa-circle-check mr-1" aria-hidden /> Active
                      </span>
                      <button
                        type="button"
                        onClick={() => setBasicCardExpanded((e) => !e)}
                        className="text-primary hover:opacity-80 transition-colors"
                        aria-expanded={basicCardExpanded}>
                        <i
                          className={`fa-solid fa-chevron-${basicCardExpanded ? "up" : "down"}`}
                          aria-hidden
                        />
                      </button>
                    </div>
                  </div>
                  {basicCardExpanded && (
                    <>
                      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        <div className="lg:col-span-4 space-y-4">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <i className="fa-solid fa-tag" aria-hidden /> Pricing ({CURRENCY_SYMBOL})
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-gray-600">
                                Cost Price
                              </label>
                              <input
                                type="number"
                                value={costPrice}
                                onChange={(e) => setCostPrice(e.target.value)}
                                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-gray-600">
                                Sale Price <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="number"
                                value={salePrice}
                                onChange={(e) => setSalePrice(e.target.value)}
                                className="block w-full px-3 py-2 text-sm border border-primary rounded-lg focus:ring-primary focus:border-primary bg-primary/5 font-medium text-gray-900"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs px-1">
                            <span className="text-gray-500">
                              Margin:{" "}
                              <span className="text-green-600 font-bold">
                                {profitMargin === "—" ? "—" : `+${profitMargin}%`}
                              </span>
                            </span>
                            <span className="text-gray-500">
                              Profit:{" "}
                              <span className="font-medium text-gray-900">{formatPrice(Number(profitPerUnit) || 0)}</span>
                            </span>
                          </div>
                          <div className="pt-2">
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                              />
                              Tax included in price
                            </label>
                          </div>
                        </div>
                        <div className="lg:col-span-4 space-y-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-8">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <i className="fa-solid fa-boxes-stacked" aria-hidden /> Inventory
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-gray-600">
                                Available Qty <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="number"
                                value={stockQuantity}
                                onChange={(e) => setStockQuantity(e.target.value)}
                                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-gray-600">
                                Low Stock Alert
                              </label>
                              <input
                                type="number"
                                value={lowStockAlert}
                                onChange={(e) => setLowStockAlert(e.target.value)}
                                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-gray-600">Min Order</label>
                              <input
                                type="number"
                                placeholder="1"
                                min={1}
                                value={1}
                                readOnly
                                className="block w-full px-3 py-2 text-sm border border-gray-200 bg-gray-50 rounded-lg text-gray-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-gray-600">Max Order</label>
                              <input
                                type="number"
                                placeholder="No Limit"
                                readOnly
                                className="block w-full px-3 py-2 text-sm border border-gray-200 bg-gray-50 rounded-lg text-gray-500"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="lg:col-span-4 space-y-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-8">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <i className="fa-solid fa-barcode" aria-hidden /> Details
                          </h4>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-gray-600">SKU</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={itemDetail?.sku ?? ""}
                                  readOnly
                                  className="block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50"
                                />
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(itemDetail?.sku ?? "")}
                                  className="absolute right-3 top-2.5 text-gray-400 text-xs cursor-pointer hover:text-primary">
                                  <i className="fa-regular fa-copy" aria-hidden />
                                </button>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-gray-600">
                                Barcode / EAN
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={itemDetail?.barcode ?? ""}
                                  readOnly
                                  className="block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50"
                                />
                                <i
                                  className="fa-solid fa-barcode absolute right-3 top-2.5 text-gray-400 text-xs"
                                  aria-hidden
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-gray-600">Condition</label>
                              <select
                                value={selectedConditionId}
                                onChange={(e) => setSelectedConditionId(e.target.value)}
                                disabled={conditionsLoading}
                                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-white">
                                {itemConditions.map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {isArabic ? c.nameAr : c.nameEn}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <button
                            type="button"
                            onClick={() => setVariantToDeactivate("basic")}
                            className="px-4 py-2 bg-white border border-red-300 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 transition-colors shadow-sm">
                            <i className="fa-solid fa-ban mr-1" aria-hidden /> Deactivate
                          </button>
                        </div>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setBasicCardExpanded(false)}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveOffer}
                            disabled={saveLoading}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors shadow-sm flex items-center gap-2">
                            <i className="fa-solid fa-check" aria-hidden /> Publish Variant
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {pricingMode === "combination" && (
                <>
                  {displayedVariants.map((c) => {
                    const row = combinationPricing[c.id];
                    if (!row) return null;
                    const tags = combinationAttributeTags(c);
                    const isExpanded = expandedCombinationIds.has(c.id);
                    const saleNum = parseFloat(row.salesPrice) || 0;
                    const costNum = parseFloat(row.price) || 0;
                    const margin =
                      saleNum > 0 ? (((saleNum - costNum) / saleNum) * 100).toFixed(1) : "—";
                    const profit = (saleNum - costNum).toFixed(2);
                    return (
                      <div
                        key={c.id}
                        className="bg-white rounded-xl shadow-card border border-gray-200 overflow-hidden">
                        <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start sm:items-center gap-4">
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                {tags.map((t, i) => (
                                  <span
                                    key={i}
                                    className={`px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm border ${
                                      row.enabled
                                        ? "bg-white border-gray-200 text-gray-700"
                                        : "bg-gray-50 border-gray-200 text-gray-600"
                                    }`}>
                                    <span className="text-gray-400 font-normal mr-1">
                                      {t.label}:
                                    </span>{" "}
                                    {t.value}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span>SKU: {row.sku || "—"}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 self-end sm:self-auto">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                row.enabled
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-gray-100 text-gray-500 border-gray-200"
                              }`}>
                              <i
                                className={`fa-solid fa-circle${row.enabled ? "-check" : ""} mr-1`}
                                aria-hidden
                              />
                              {row.enabled ? "Active" : "Draft"}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedCombinationIds((prev) => {
                                  const next = new Set(prev);
                                  if (next.has(c.id)) next.delete(c.id);
                                  else next.add(c.id);
                                  return next;
                                })
                              }
                              className="text-primary hover:opacity-80 transition-colors">
                              <i className="fa-solid fa-chevron-down" aria-hidden />
                            </button>
                          </div>
                        </div>
                        {isExpanded && (
                          <>
                            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                              <div className="lg:col-span-4 space-y-4">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                  <i className="fa-solid fa-tag" aria-hidden /> Pricing ({CURRENCY_SYMBOL})
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-600">
                                      Cost Price
                                    </label>
                                    <input
                                      type="number"
                                      value={row.price}
                                      onChange={(e) =>
                                        updateCombinationPricing(c.id, "price", e.target.value)
                                      }
                                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-600">
                                      Sale Price <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="number"
                                      value={row.salesPrice}
                                      onChange={(e) =>
                                        updateCombinationPricing(c.id, "salesPrice", e.target.value)
                                      }
                                      className={`block w-full px-3 py-2 text-sm border rounded-lg focus:ring-primary focus:border-primary ${
                                        row.enabled
                                          ? "border-primary bg-primary/5 font-medium text-gray-900"
                                          : "border-gray-300"
                                      }`}
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-xs px-1">
                                  <span className="text-gray-500">
                                    Margin:{" "}
                                    <span className="text-green-600 font-bold">+{margin}%</span>
                                  </span>
                                  <span className="text-gray-500">
                                    Profit:{" "}
                                    <span className="font-medium text-gray-900">{formatPrice(Number(profit) || 0)}</span>
                                  </span>
                                </div>
                                <div className="pt-2">
                                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={row.taxIncludedInPrice}
                                      onChange={(e) =>
                                        updateCombinationPricing(
                                          c.id,
                                          "taxIncludedInPrice",
                                          e.target.checked
                                        )
                                      }
                                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    Tax included in price
                                  </label>
                                </div>
                              </div>
                              <div className="lg:col-span-4 space-y-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-8">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                  <i className="fa-solid fa-boxes-stacked" aria-hidden /> Inventory
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-600">
                                      Available Qty <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="number"
                                      value={row.availableQuantity}
                                      onChange={(e) =>
                                        updateCombinationPricing(
                                          c.id,
                                          "availableQuantity",
                                          e.target.value
                                        )
                                      }
                                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-600">
                                      Low Stock Alert
                                    </label>
                                    <input
                                      type="number"
                                      value={row.lowStockThreshold}
                                      onChange={(e) =>
                                        updateCombinationPricing(
                                          c.id,
                                          "lowStockThreshold",
                                          e.target.value
                                        )
                                      }
                                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-600">
                                      Min Order
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="1"
                                      value={row.minOrderQuantity}
                                      onChange={(e) =>
                                        updateCombinationPricing(
                                          c.id,
                                          "minOrderQuantity",
                                          e.target.value
                                        )
                                      }
                                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-600">
                                      Max Order
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="No Limit"
                                      value={row.maxOrderQuantity}
                                      onChange={(e) =>
                                        updateCombinationPricing(
                                          c.id,
                                          "maxOrderQuantity",
                                          e.target.value
                                        )
                                      }
                                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="lg:col-span-4 space-y-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-8">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                  <i className="fa-solid fa-barcode" aria-hidden /> Details
                                </h4>
                                <div className="space-y-3">
                                  <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-600">SKU</label>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        value={row.sku}
                                        onChange={(e) =>
                                          updateCombinationPricing(c.id, "sku", e.target.value)
                                        }
                                        className="block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => copyToClipboard(row.sku)}
                                        className="absolute right-3 top-2.5 text-gray-400 text-xs cursor-pointer hover:text-primary">
                                        <i className="fa-regular fa-copy" aria-hidden />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-600">
                                      Barcode / EAN
                                    </label>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        value={row.barcode}
                                        onChange={(e) =>
                                          updateCombinationPricing(c.id, "barcode", e.target.value)
                                        }
                                        className="block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                      />
                                      <i
                                        className="fa-solid fa-barcode absolute right-3 top-2.5 text-gray-400 text-xs"
                                        aria-hidden
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-xs font-medium text-gray-600">
                                      Condition
                                    </label>
                                    <select
                                      value={row.conditionId || selectedConditionId}
                                      onChange={(e) =>
                                        updateCombinationPricing(
                                          c.id,
                                          "conditionId",
                                          e.target.value
                                        )
                                      }
                                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-white">
                                      {itemConditions.map((cond) => (
                                        <option key={cond.id} value={cond.id}>
                                          {isArabic ? cond.nameAr : cond.nameEn}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                              <div>
                                {row.enabled ? (
                                  <button
                                    type="button"
                                    onClick={() => setVariantToDeactivate(c.id)}
                                    className="px-4 py-2 bg-white border border-red-300 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 transition-colors shadow-sm">
                                    <i className="fa-solid fa-ban mr-1" aria-hidden /> Deactivate
                                  </button>
                                ) : (
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <i className="fa-regular fa-clock" aria-hidden />
                                    <span>Not saved yet</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedCombinationIds((prev) => {
                                      const next = new Set(prev);
                                      next.delete(c.id);
                                      return next;
                                    })
                                  }
                                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    updateCombinationPricing(c.id, "enabled", true);
                                    handleSaveOffer();
                                  }}
                                  disabled={saveLoading}
                                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors shadow-sm flex items-center gap-2">
                                  <i className="fa-solid fa-check" aria-hidden /> Publish Variant
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                        {!isExpanded && !row.enabled && (
                          <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              Enable and fill pricing to sell this variant.
                            </span>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={row.enabled}
                                onChange={(e) =>
                                  updateCombinationPricing(c.id, "enabled", e.target.checked)
                                }
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                              />
                              <span className="text-sm text-gray-700">Enable variant</span>
                            </label>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="flex flex-col items-center py-6 border-t border-gray-100 mt-4">
                    <p className="text-sm text-gray-500 mb-4">
                      Showing {displayedVariants.length} of {combinations.length} variants
                    </p>
                    {hasMoreVariants && (
                      <button
                        type="button"
                        onClick={() => setVariantsShownCount((n) => n + 10)}
                        className="px-8 py-2.5 border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-primary transition-all flex items-center gap-2 shadow-sm">
                        <i className="fa-solid fa-angles-down text-xs" aria-hidden /> Load 10 More
                        Variants
                      </button>
                    )}
                  </div>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setShowNewComboForm((v) => !v)}
                      className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                      <i className="fa-solid fa-plus-circle text-lg" aria-hidden /> Add New Variant
                      Combination
                    </button>
                  </div>
                  {showNewComboForm && (
                    <div className="mt-4 bg-white rounded-xl shadow-card border border-primary overflow-hidden ring-4 ring-primary/20">
                      <div className="px-6 py-4 border-b border-gray-100 bg-primary text-white flex items-center justify-between">
                        <h3 className="text-base font-bold flex items-center gap-2">
                          <i className="fa-solid fa-layer-group" aria-hidden /> Define New Variant
                        </h3>
                        <button
                          type="button"
                          onClick={() => setShowNewComboForm(false)}
                          className="text-white/80 hover:text-white">
                          <i className="fa-solid fa-times" aria-hidden />
                        </button>
                      </div>
                      <div className="p-6">
                        <div className="mb-8">
                          <h4 className="text-sm font-bold text-gray-900 mb-4">
                            Select Attributes
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-gray-600">
                                Storage <span className="text-red-500">*</span>
                              </label>
                              <select className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-white">
                                <option disabled>Select Storage</option>
                                <option>256GB</option>
                                <option>512GB</option>
                                <option>1 TB</option>
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-gray-600">
                                Color <span className="text-red-500">*</span>
                              </label>
                              <select className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-white">
                                <option disabled>Select Color</option>
                                <option>Deep Purple</option>
                                <option>Space Black</option>
                                <option>Silver</option>
                                <option>Gold</option>
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-gray-600">RAM</label>
                              <input
                                type="text"
                                value="6GB"
                                disabled
                                className="block w-full px-3 py-2.5 text-sm border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-8">
                          <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center justify-between">
                            <span>Variant Images (Optional)</span>
                            <span className="text-xs font-normal text-gray-500">
                              Overrides main product images
                            </span>
                          </h4>
                          <div className="flex gap-4 overflow-x-auto pb-2">
                            <label className="w-24 h-24 flex-shrink-0 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors">
                              <i
                                className="fa-solid fa-cloud-upload-alt text-gray-400 text-xl mb-1"
                                aria-hidden
                              />
                              <span className="text-[10px] text-gray-500 font-medium">Upload</span>
                              <input type="file" className="hidden" multiple accept="image/*" />
                            </label>
                          </div>
                        </div>
                        <div className="border-t border-gray-100 pt-6">
                          <h4 className="text-sm font-bold text-gray-900 mb-4">
                            Pricing & Inventory Details
                          </h4>
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-600">
                                  Sale Price <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                  <span className="absolute left-3 top-2 text-gray-500 text-sm">
                                    {CURRENCY_SYMBOL}
                                  </span>
                                  <input
                                    type="number"
                                    className="block w-full pl-12 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-600">
                                  Quantity <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="number"
                                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                />
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-600">
                                  Custom SKU
                                </label>
                                <input
                                  type="text"
                                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-8 flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => setShowNewComboForm(false)}
                            className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="px-6 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:opacity-90 shadow-sm">
                            Add Combination
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </div>

      <DeactivateVariantModal
        isOpen={variantToDeactivate !== null}
        title={variantToDeactivate === "basic" ? "Remove product offer?" : "Deactivate variant?"}
        description={
          variantToDeactivate === "basic"
            ? "This will remove the product from your offer. You can add it again later by searching and configuring again."
            : "This variant will be set to Draft and removed from your active offer. You can re-enable it later."
        }
        confirmLabel={variantToDeactivate === "basic" ? "Remove offer" : "Deactivate"}
        onCancel={() => setVariantToDeactivate(null)}
        onConfirm={() => {
          if (variantToDeactivate === "basic") {
            clearSelectedItem();
          } else if (typeof variantToDeactivate === "string") {
            updateCombinationPricing(variantToDeactivate, "enabled", false);
            setExpandedCombinationIds((prev) => {
              const next = new Set(prev);
              next.delete(variantToDeactivate);
              return next;
            });
          }
          setVariantToDeactivate(null);
        }}
      />
    </main>
  );
}
