import DeliveryIcon from "@/shared/assets/icons/delivery.svg?react";
import { formatMoney } from "../../../utils/price";

/**
 * Static shipping row with crossed-out price and FREE label.
 */
export default function ShippingRow() {
  const originalShipping = 5.99;

  return (
    <div className="flex items-center gap-3 py-4">
      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
        <DeliveryIcon className="w-8 h-8" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-dark">Fast Shipping</p>
      </div>
      <div className="text-right flex flex-col justify-center">
        <span className="text-xs text-muted-foreground line-through">
          {formatMoney(originalShipping)}
        </span>
        <span className="text-sm font-semibold text-purple-accent">FREE</span>
      </div>
    </div>
  );
}
