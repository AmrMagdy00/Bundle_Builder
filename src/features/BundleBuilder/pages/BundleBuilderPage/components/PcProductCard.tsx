import WyzeCamv4Icon from "@/shared/assets/icons/WyzeCamv4.svg?react";
import { cn } from "@/shared/lib/utils";
import { memo } from "react";
import PriceDisplay from "../../../components/shared/PriceDisplay";
import ProductThumbnail from "../../../components/shared/ProductThumbnail";
import QuantityStepper from "../../../components/shared/QuantityStepper";
import { useBuilderContext } from "../../../context/BuilderContext";
import type { Product } from "../../../types";

interface PcProductCardProps {
  product: Product;
  categoryKey: string;
}

function PcProductCard({ product, categoryKey }: PcProductCardProps) {
  const { getItemsByCategory, updateQuantity } = useBuilderContext();
  const items = getItemsByCategory(categoryKey);
  const selectedVariants = items.filter((i) => i.productId === product.id);
  const selectedItem = selectedVariants.find((i) => i.quantity > 0);
  const isSelected = !!selectedItem;
  const isSingle = categoryKey === "cameras";

  const handleVariantSelect = (variantId: string) => {
    const existing = items.find(
      (i) => i.productId === product.id && i.variantId === variantId,
    );
    if (existing && existing.quantity > 0) {
      updateQuantity(product.id, variantId, 0, categoryKey);
      return;
    }
    if (isSingle) {
      selectedVariants.forEach((v) => {
        if (v.quantity > 0)
          updateQuantity(product.id, v.variantId!, 0, categoryKey);
      });
    }
    updateQuantity(product.id, variantId, 1, categoryKey);
  };

  const handleQuantityChange = (delta: number) => {
    if (delta > 0 && !selectedItem && product.variants.length > 0) {
      updateQuantity(product.id, product.variants[0].id, 1, categoryKey);
      return;
    }
    if (!selectedItem) return;
    const variant = product.variants.find(
      (v) => v.id === selectedItem.variantId,
    );
    const newQuantity = selectedItem.quantity + delta;
    if (newQuantity < 0) return;
    if (variant && newQuantity > variant.stock) return;
    updateQuantity(
      product.id,
      selectedItem.variantId!,
      newQuantity,
      categoryKey,
    );
  };

  const selectedStock =
    product.variants.find((v) => v.id === selectedItem?.variantId)?.stock ??
    product.variants[0]?.stock ??
    0;

  return (
    <div
      className={cn(
        "relative flex gap-3 bg-white rounded-2xl border-2 p-3 transition-colors overflow-hidden",
        isSelected ? "border-purple-accent" : "border-gray-200",
      )}
    >
      {product.discountPercentage ? (
        <span className="absolute top-2 left-2 z-10 bg-purple-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
          Save {product.discountPercentage}%
        </span>
      ) : null}

      {/* Left: Photo only */}
      <ProductThumbnail
        alt={product.title}
        className="w-28 h-28 object-contain rounded-none flex-shrink-0"
      />

      {/* Right: Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-text-dark leading-tight">
            {product.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-1">
            {product.description}
          </p>
          <button
            type="button"
            className="text-xs font-medium text-blueprint underline hover:text-purple-accent"
          >
            Learn More
          </button>

          {/* Color selector chips with product photo - single row */}
          <div className="flex items-center gap-1.5 mt-2 overflow-hidden">
            {product.variants.map((variant) => {
              const isVariantSelected = selectedItem?.variantId === variant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => handleVariantSelect(variant.id)}
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium transition-colors flex-shrink-0 leading-none",
                    isVariantSelected
                      ? "border-purple-accent bg-purple-50 text-purple-accent font-semibold"
                      : "border-gray-200 text-muted-foreground hover:border-gray-400 bg-white",
                  )}
                >
                  <WyzeCamv4Icon
                    className="w-5 h-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {variant.color}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom: Quantity + Price */}
        <div className="flex items-end justify-between mt-2">
          <QuantityStepper
            quantity={selectedItem?.quantity ?? 0}
            max={selectedStock}
            onIncrease={() => handleQuantityChange(1)}
            onDecrease={() => handleQuantityChange(-1)}
            size="compact"
          />
          <PriceDisplay
            originalPrice={product.price}
            discountPercentage={product.discountPercentage}
            quantity={selectedItem?.quantity || 1}
            size="lg"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(PcProductCard);
