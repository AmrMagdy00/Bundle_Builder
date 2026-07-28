import { memo } from "react";
import ShieldIcon from "@/shared/assets/icons/shield.svg?react";
import { findPlan, formatMoney, discountedPrice } from "../../../utils/price";
import type { BuilderCatalog } from "../../../types";

interface PlanRowProps {
  /** Selected plan id. */
  planId: string;
  /** Loaded catalog for plan lookup. */
  catalog: BuilderCatalog;
}

/**
 * A single plan row in the summary cart.
 */
function PlanRow({ planId, catalog }: PlanRowProps) {
  const plan = findPlan(catalog, planId);
  if (!plan) return null;

  const original = plan.price;
  const final = discountedPrice(original, plan.discountPercentage);
  const isFree = final === 0;

  return (
    <div className="flex items-center gap-3 py-4 border-b border-border last:border-0">
      <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
        <ShieldIcon className="w-8 h-8" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-dark">{plan.title}</p>
      </div>
      <div className="text-right flex flex-col justify-center">
        {!isFree && plan.discountPercentage ? (
          <span className="text-xs text-muted-foreground line-through">
            {formatMoney(original)}/mo
          </span>
        ) : null}
        <span className="text-sm font-semibold text-purple-accent">
          {isFree ? "FREE" : `${formatMoney(final)}/mo`}
        </span>
      </div>
    </div>
  );
}

export default memo(PlanRow);
