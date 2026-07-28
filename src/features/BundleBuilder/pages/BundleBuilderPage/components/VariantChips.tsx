import { cn } from "@/shared/lib/utils";
import type { ProductVariant } from "../../../types";

interface VariantChipsProps {
  /** Available variants for the product. */
  variants: ProductVariant[];
  /** Currently selected variant id, if any. */
  selectedVariantId: string | undefined;
  /** Called when a variant is selected. */
  onSelect: (variantId: string) => void;
}

/**
 * Horizontal list of selectable variant chips (e.g. colors).
 */
export default function VariantChips({
  variants,
  selectedVariantId,
  onSelect,
}: VariantChipsProps) {
  return (
    <div className="flex items-center gap-2 mt-3">
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          onClick={() => onSelect(variant.id)}
          className={cn(
            "px-3 py-1 text-xs rounded-full border transition-colors",
            selectedVariantId === variant.id
              ? "border-primary text-primary font-medium"
              : "border-border text-muted-foreground hover:border-muted-foreground",
          )}
        >
          {variant.color}
        </button>
      ))}
    </div>
  );
}
