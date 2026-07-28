import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { STEPS_CONFIG } from "../config/steps";
import { useBuilderCatalog } from "../hooks/useBuilderCatalog";
import { useBundleBuilder } from "../hooks/useBundleBuilder";
import type { BuilderCatalog, SelectedItem } from "../types";

interface BuilderContextValue {
  /** Catalog data fetched from the JSON server. */
  catalog: BuilderCatalog | null;
  /** True while catalog is being fetched. */
  loading: boolean;
  /** Error message if catalog fetch failed. */
  error: string | null;

  /** All selected items in the bundle. */
  items: SelectedItem[];
  /** Id of the currently open accordion step. */
  openStep: number;
  /** Whether each step is enabled based on previous selections. */
  stepEnabled: boolean[];
  /** Count distinct selected products for a category. */
  selectedCount: (category: string) => number;
  /** Get all selected items for a category. */
  getItemsByCategory: (category: string) => SelectedItem[];
  /** Get a single selected item by product + variant id. */
  getItem: (productId: string, variantId: string | null) => SelectedItem | undefined;

  /** Toggle an accordion step open/closed. */
  toggleStep: (stepId: number) => void;
  /** Add, update or remove an item quantity. */
  updateQuantity: (
    productId: string,
    variantId: string | null,
    quantity: number,
    category: string,
  ) => void;
  /** Persist current selections to localStorage. */
  saveSystemForLater: () => void;
}

const BuilderContext = createContext<BuilderContextValue | null>(null);

interface BuilderProviderProps {
  children: ReactNode;
}

/**
 * Provides catalog data, bundle selection state and navigation between
 * builder and summary views to all descendants.
 *
 * The context value is memoized to avoid unnecessary re-renders of consumers.
 */
export function BuilderProvider({ children }: BuilderProviderProps) {
  const { catalog, isLoading, error } = useBuilderCatalog();
  const {
    items,
    openStep,
    toggleStep,
    updateQuantity,
    saveSystemForLater,
    getItem,
    selectedCount,
    getItemsByCategory,
  } = useBundleBuilder();

  /** Step gating: each step is enabled only if the previous step has selections. */
  const stepEnabled = useMemo(() => {
    return STEPS_CONFIG.map((_, index) => {
      if (index === 0) return true;
      return selectedCount(STEPS_CONFIG[index - 1].categoryKey) > 0;
    });
  }, [selectedCount]);

  const value = useMemo<BuilderContextValue>(
    () => ({
      catalog,
      loading: isLoading,
      error,
      items,
      openStep,
      stepEnabled,
      selectedCount,
      getItemsByCategory,
      getItem,
      toggleStep,
      updateQuantity,
      saveSystemForLater,
    }),
    [
      catalog,
      isLoading,
      error,
      items,
      openStep,
      stepEnabled,
      selectedCount,
      getItemsByCategory,
      getItem,
      toggleStep,
      updateQuantity,
      saveSystemForLater,
    ],
  );

  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
}

/**
 * Hook to access the builder context. Must be used within a `BuilderProvider`.
 */
export function useBuilderContext(): BuilderContextValue {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilderContext must be used within a BuilderProvider");
  }
  return context;
}
