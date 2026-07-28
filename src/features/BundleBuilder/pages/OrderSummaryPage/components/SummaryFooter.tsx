import guaranteeSvgUrl from "@/shared/assets/icons/guarantee.svg?url";
import { Button } from "@/shared/components/ui/button";
import { useMemo } from "react";
import { useBuilderContext } from "../../../context/BuilderContext";
import type { BuilderCatalog } from "../../../types";
import {
  discountedPrice,
  findPlan,
  findProduct,
  findProtection,
  formatMoney,
} from "../../../utils/price";

interface SummaryFooterProps {
  /** Loaded catalog. */
  catalog: BuilderCatalog;
}

/**
 * Footer for the order summary page.
 *
 * Shows totals, savings badge, checkout button and save-for-later link.
 */
export default function SummaryFooter({ catalog }: SummaryFooterProps) {
  const { items, saveSystemForLater, stepEnabled } = useBuilderContext();
  const canCheckout = stepEnabled[2];

  const { originalTotal, finalTotal, monthlyPlanPrice } = useMemo(() => {
    let original = 0;
    let final = 0;
    let planMonthly = 0;

    items.forEach((item) => {
      if (item.quantity <= 0) return;

      if (item.category === "plan") {
        const plan = findPlan(catalog, item.productId);
        if (plan) {
          const planPrice = plan.price;
          original += planPrice;
          final += discountedPrice(planPrice, plan.discountPercentage);
          planMonthly = discountedPrice(planPrice, plan.discountPercentage);
        }
        return;
      }

      if (item.category === "protection") {
        const protection = findProtection(catalog, item.productId);
        if (protection) {
          original += protection.price * item.quantity;
          final +=
            discountedPrice(protection.price, protection.discountPercentage) *
            item.quantity;
        }
        return;
      }

      const product = findProduct(catalog, item.productId);
      if (product) {
        original += product.price * item.quantity;
        final +=
          discountedPrice(product.price, product.discountPercentage) *
          item.quantity;
      }
    });

    // Shipping is always free.
    original += 5.99;

    return {
      originalTotal: original,
      finalTotal: final,
      monthlyPlanPrice: planMonthly,
    };
  }, [catalog, items]);

  const savings = originalTotal - finalTotal;

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <img
          src={guaranteeSvgUrl}
          alt="100% Wyze satisfaction guarantee"
          className="w-20 h-20 flex-shrink-0 object-contain"
        />
        <div className="text-right">
          {monthlyPlanPrice > 0 && (
            <span className="inline-block bg-purple-accent text-white text-xs font-semibold px-3 py-1 rounded mb-2">
              as low as {formatMoney(monthlyPlanPrice)}/mo
            </span>
          )}
          <div className="flex items-center gap-3 justify-end">
            <span className="text-base text-muted-foreground line-through">
              {formatMoney(originalTotal)}
            </span>
            <span className="text-[28px] font-bold text-purple-accent">
              {formatMoney(finalTotal)}
            </span>
          </div>
        </div>
      </div>

      {savings > 0 && (
        <p className="text-sm text-green-600 font-medium text-center mb-6">
          Congrats! You&apos;re saving {formatMoney(savings)} on your security
          bundle!
        </p>
      )}

      <Button
        type="button"
        disabled={!canCheckout}
        className="w-full h-12 text-base font-semibold bg-purple-accent hover:bg-purple-accent/90 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => alert("Proceeding to checkout...")}
      >
        Checkout
      </Button>

      <button
        type="button"
        onClick={() => {
          saveSystemForLater();
          alert("Saved for later!");
        }}
        className="w-full text-center text-sm text-muted-foreground underline mt-4 hover:text-foreground"
      >
        Save my system for later
      </button>
    </div>
  );
}
