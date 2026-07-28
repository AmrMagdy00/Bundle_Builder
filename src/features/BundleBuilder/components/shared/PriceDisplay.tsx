import { cn } from "@/shared/lib/utils";
import { discountedPrice, formatMoney } from "../../utils/price";

interface PriceDisplayProps {
  /** Original price before discount. */
  originalPrice: number;
  /** Optional discount percentage. */
  discountPercentage?: number;
  /** Quantity multiplier. Defaults to 1. */
  quantity?: number;
  /** Whether to show monthly suffix (e.g. /mo). */
  isMonthly?: boolean;
  /** Visual size variant. */
  size?: "default" | "lg";
  /** Optional className for the root. */
  className?: string;
}

/**
 * Displays original (crossed-out) and final (accent) prices.
 * Shows "FREE" when the final price is 0.
 */
export default function PriceDisplay({
  originalPrice,
  discountPercentage,
  quantity = 1,
  isMonthly = false,
  size = "default",
  className,
}: PriceDisplayProps) {
  const final = discountedPrice(originalPrice, discountPercentage) * quantity;
  const original = originalPrice * quantity;
  const suffix = isMonthly ? "/mo" : "";
  const isFree = final === 0;

  const sizeClasses = {
    default: {
      original: "text-xs",
      final: "text-sm font-semibold",
    },
    lg: {
      original: "text-base text-[#D8392B]",
      final: "text-base font-semibold text-[#575757] leading-none",
    },
  };

  const finalEl = (
    <span className={cn(size === "lg" ? "" : "text-purple-accent", sizeClasses[size].final)}>
      {isFree ? "FREE" : `${formatMoney(final)}${suffix}`}
    </span>
  );

  const originalEl = !isFree && discountPercentage ? (
    <span
      className={cn(
        "text-muted-foreground line-through",
        sizeClasses[size].original,
      )}
    >
      {formatMoney(original)}
      {suffix}
    </span>
  ) : null;

  return (
    <div className={cn("text-right flex flex-col justify-center", className)}>
      {originalEl}
      {finalEl}
    </div>
  );
}
