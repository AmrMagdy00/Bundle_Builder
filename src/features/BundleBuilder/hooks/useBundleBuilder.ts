import { useState, useCallback, useEffect } from "react";
import type { SelectedItem } from "../types";

const STORAGE_KEY = "bundle-builder";

function defaultItems(): SelectedItem[] {
  return [];
}

function loadSavedItems(): SelectedItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* ignore corrupt data */
  }
  return defaultItems();
}

function persistItems(items: SelectedItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage full */
  }
}

export function useBundleBuilder() {
  const [items, setItems] = useState<SelectedItem[]>(loadSavedItems);
  const [openStep, setOpenStep] = useState<number>(1);

  useEffect(() => {
    persistItems(items);
  }, [items]);

  const toggleStep = useCallback((stepId: number) => {
    setOpenStep((prev) => (prev === stepId ? 0 : stepId));
  }, []);

  const updateQuantity = useCallback(
    (
      productId: string,
      variantId: string | null,
      quantity: number,
      category: string,
    ) => {
      setItems((prev) => {
        const key = (item: SelectedItem) =>
          item.productId === productId &&
          item.variantId === variantId &&
          item.category === category;
        const existing = prev.find(key);
        if (!existing) {
          if (quantity <= 0) return prev;
          return [...prev, { productId, variantId, quantity, category }];
        }
        if (quantity <= 0) return prev.filter((item) => !key(item));
        return prev.map((item) => (key(item) ? { ...item, quantity } : item));
      });
    },
    [],
  );

  const saveSystemForLater = useCallback(() => {
    persistItems(items);
  }, [items]);

  const getItem = useCallback(
    (productId: string, variantId: string | null): SelectedItem | undefined =>
      items.find(
        (item) => item.productId === productId && item.variantId === variantId,
      ),
    [items],
  );

  const selectedCount = useCallback(
    (category: string): number => {
      const filtered = items.filter(
        (item) => item.category === category && item.quantity > 0,
      );
      return new Set(filtered.map((item) => item.productId)).size;
    },
    [items],
  );

  const getItemsByCategory = useCallback(
    (category: string): SelectedItem[] =>
      items.filter((item) => item.category === category),
    [items],
  );

  return {
    items,
    openStep,
    toggleStep,
    updateQuantity,
    saveSystemForLater,
    getItem,
    selectedCount,
    getItemsByCategory,
  };
}
