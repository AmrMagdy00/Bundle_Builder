import { memo } from "react";
import ProductThumbnail from "../../../components/shared/ProductThumbnail";
import PriceDisplay from "../../../components/shared/PriceDisplay";
import QuantityStepper from "../../../components/shared/QuantityStepper";
import VariantChips from "./VariantChips";
import { useBuilderContext } from "../../../context/BuilderContext";
import type { Product } from "../../../types";

interface ProductCardProps {
  product: Product;
  categoryKey: string;
}

/**
 * Card for a camera, sensor or accessory product.
 *
 * Supports single-select mode (cameras) and multi-select mode (sensors).
 */
function ProductCard({ product, categoryKey }: ProductCardProps) {
  const { getItemsByCategory, updateQuantity } = useBuilderContext();
  const items = getItemsByCategory(categoryKey);
  const isSingle = categoryKey === "cameras";
  const selectedVariants = items.filter((item) => item.productId === product.id);

  const handleVariantSelect = (variantId: string) => {
    const existing = items.find(
      (item) => item.productId === product.id && item.variantId === variantId,
    );

    if (existing && existing.quantity > 0) {
      // Toggle off for single-select; toggle off for multi-select too.
      updateQuantity(product.id, variantId, 0, categoryKey);
      return;
    }

    // For single-select, clear other variants first.
    if (isSingle) {
      selectedVariants.forEach((item) => {
        if (item.quantity > 0) {
          updateQuantity(product.id, item.variantId!, 0, categoryKey);
        }
      });
    }

    updateQuantity(product.id, variantId, 1, categoryKey);
  };

  return (
    <div className="flex items-start gap-4 py-2">
      <ProductThumbnail alt={product.title} />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium">{product.title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <PriceDisplay
            originalPrice={product.price}
            discountPercentage={product.discountPercentage}
          />
        </div>
        <VariantChips
          variants={product.variants}
          selectedVariantId={
            selectedVariants.find((item) => item.quantity > 0)?.variantId ??
            undefined
          }
          onSelect={handleVariantSelect}
        />
        {selectedVariants.map((item) => {
          const variant = product.variants.find((v) => v.id === item.variantId);
          return (
            <QuantityStepper
              key={`${item.productId}-${item.variantId}`}
              quantity={item.quantity}
              max={variant?.stock ?? 0}
              onIncrease={() =>
                updateQuantity(product.id, item.variantId!, item.quantity + 1, categoryKey)
              }
              onDecrease={() =>
                updateQuantity(product.id, item.variantId!, item.quantity - 1, categoryKey)
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default memo(ProductCard);
