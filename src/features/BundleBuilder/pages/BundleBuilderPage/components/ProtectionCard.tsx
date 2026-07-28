import { memo } from "react";
import { cn } from "@/shared/lib/utils";
import GuaranteeIcon from "@/shared/assets/icons/guarantee.svg?react";
import PriceDisplay from "../../../components/shared/PriceDisplay";
import { useBuilderContext } from "../../../context/BuilderContext";
import type { Protection } from "../../../types";

interface ProtectionCardProps {
  protection: Protection;
}

/**
 * Single guarantee package card for extra protection.
 */
function ProtectionCard({ protection }: ProtectionCardProps) {
  const { getItemsByCategory, updateQuantity } = useBuilderContext();
  const isSelected = !!getItemsByCategory("protection").find(
    (item) => item.productId === protection.id && item.quantity > 0,
  );

  const handleClick = () => {
    updateQuantity(protection.id, null, isSelected ? 0 : 1, "protection");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "w-full text-left p-3 rounded-lg border transition-colors bg-white",
        isSelected
          ? "border-purple-accent"
          : "border-border/60 hover:border-purple-accent/40",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <GuaranteeIcon className="w-14 h-14" aria-hidden="true" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-purple-accent">
            {protection.title}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {protection.description}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <PriceDisplay
              originalPrice={protection.price}
              discountPercentage={protection.discountPercentage}
            />
          </div>
        </div>

        <div
          className={cn(
            "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0",
            isSelected ? "border-primary bg-primary" : "border-muted-foreground",
          )}
        >
          {isSelected && (
            <svg
              className="w-3 h-3 text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

export default memo(ProtectionCard);
