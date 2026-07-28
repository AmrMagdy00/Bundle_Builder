import { memo } from "react";
import { cn } from "@/shared/lib/utils";
import ShieldIcon from "@/shared/assets/icons/shield.svg?react";
import ProductThumbnail from "../../../components/shared/ProductThumbnail";
import PriceDisplay from "../../../components/shared/PriceDisplay";
import QuantityStepper from "../../../components/shared/QuantityStepper";
import PcProductCard from "./PcProductCard";
import { useBuilderContext } from "../../../context/BuilderContext";
import { discountedPrice, formatMoney } from "../../../utils/price";
import type { Product, Plan } from "../../../types";

interface StepCardProps {
  item: Product | Plan;
  categoryKey: string;
}

function StepCard({ item, categoryKey }: StepCardProps) {
  const { getItemsByCategory, updateQuantity } = useBuilderContext();

  // Plan-specific logic
  if (categoryKey === "plan") {
    const plan = item as Plan;
    const planItems = getItemsByCategory("plan");
    const selectedPlan = planItems.find(
      (p) => p.productId === plan.id,
    );
    const isSelected = !!selectedPlan && selectedPlan.quantity > 0;
    const qty = isSelected ? selectedPlan.quantity : 0;

    const handleClick = () => {
      if (isSelected) {
        updateQuantity(plan.id, null, 0, "plan");
        return;
      }
      planItems
        .filter((p) => p.category === "plan" && p.quantity > 0)
        .forEach((p) => updateQuantity(p.productId, null, 0, "plan"));
      updateQuantity(plan.id, null, 1, "plan");
    };

    const handlePlanQuantity = (delta: number) => {
      if (delta > 0 && !isSelected) {
        planItems
          .filter((p) => p.category === "plan" && p.quantity > 0)
          .forEach((p) => updateQuantity(p.productId, null, 0, "plan"));
        updateQuantity(plan.id, null, 1, "plan");
      } else if (delta < 0 && isSelected) {
        updateQuantity(plan.id, null, 0, "plan");
      }
    };

    const final = discountedPrice(plan.price, plan.discountPercentage);
    const isFree = final === 0;

    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "relative w-full text-left transition-colors lg:rounded-xl lg:border lg:bg-white lg:p-4",
          isSelected ? "lg:border-purple-accent" : "lg:border-border/60 hover:lg:border-purple-accent/40",
        )}
      >
        <div className="grid lg:hidden grid-cols-[1fr_96px_96px] items-center gap-3 py-2 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
              <ShieldIcon className="w-8 h-8" aria-hidden="true" />
            </div>
            <h4 className="text-sm font-semibold text-text-dark truncate">{plan.title}</h4>
          </div>
          <QuantityStepper
            quantity={qty}
            max={1}
            onIncrease={() => handlePlanQuantity(1)}
            onDecrease={() => handlePlanQuantity(-1)}
          />
          <PriceDisplay
            originalPrice={plan.price}
            discountPercentage={plan.discountPercentage}
            isMonthly
          />
        </div>

        <div className="hidden lg:flex flex-col h-full gap-0 items-center text-center">
          <div className="flex-shrink-0 w-full h-40 flex items-center justify-center py-4">
            <ShieldIcon className="w-28 h-28" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-semibold text-purple-accent">{plan.title}</h4>
            <div className="flex flex-col items-center justify-center mt-3">
              {!isFree && plan.discountPercentage ? (
                <span className="text-xs text-muted-foreground line-through">
                  {formatMoney(plan.price)}/mo
                </span>
              ) : null}
              <span className="text-sm font-semibold text-purple-accent">
                {isFree ? "FREE" : `${formatMoney(final)}/mo`}
              </span>
            </div>
          </div>
        </div>
      </button>
    );
  }

  // Product logic (cameras / sensors)
  const product = item as Product;
  const items = getItemsByCategory(categoryKey);
  const selectedVariants = items.filter((i) => i.productId === product.id);
  const selectedItem = selectedVariants.find((i) => i.quantity > 0);
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
        if (v.quantity > 0) {
          updateQuantity(product.id, v.variantId!, 0, categoryKey);
        }
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
    const variant = product.variants.find((v) => v.id === selectedItem.variantId);
    const newQuantity = selectedItem.quantity + delta;
    if (newQuantity < 0) return;
    if (variant && newQuantity > variant.stock) return;
    updateQuantity(product.id, selectedItem.variantId!, newQuantity, categoryKey);
  };

  return (
    <div
      className="relative transition-colors"
    >
      {/* Mobile horizontal row */}
      <div className="grid lg:hidden grid-cols-[1fr_96px_96px] items-center gap-3 py-2 border-b border-border">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
            <ProductThumbnail alt={product.title} className="w-12 h-12" />
          </div>
          <h4 className="text-sm font-semibold text-text-dark truncate">{product.title}</h4>
        </div>
        <QuantityStepper
          quantity={selectedItem?.quantity ?? 0}
          max={
            product.variants.find((v) => v.id === selectedItem?.variantId)?.stock
            ?? product.variants[0]?.stock
            ?? 0
          }
          onIncrease={() => handleQuantityChange(1)}
          onDecrease={() => handleQuantityChange(-1)}
        />
        <PriceDisplay
          originalPrice={product.price}
          discountPercentage={product.discountPercentage}
          quantity={selectedItem?.quantity ?? 1}
        />
      </div>

      {/* PC horizontal product card */}
      <div className="hidden lg:block">
        <PcProductCard product={product} categoryKey={categoryKey} />
      </div>
    </div>
  );
}

export default memo(StepCard);
