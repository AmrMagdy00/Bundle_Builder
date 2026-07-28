import { memo } from "react";
import guaranteeSvgUrl from "@/shared/assets/icons/guarantee.svg?url";
import { findProtection, formatMoney, discountedPrice } from "../../../utils/price";
import type { BuilderCatalog, SelectedItem } from "../../../types";

interface ProtectionRowProps {
  /** Selected protection item to render. */
  item: SelectedItem;
  /** Loaded catalog for protection lookup. */
  catalog: BuilderCatalog;
}

/**
 * A single protection/extra protection row in the summary cart.
 * Renders the guarantee badge as the item thumbnail.
 */
function ProtectionRow({ item, catalog }: ProtectionRowProps) {
  const protection = findProtection(catalog, item.productId);
  if (!protection) return null;

  const original = protection.price * item.quantity;
  const final = discountedPrice(protection.price, protection.discountPercentage) * item.quantity;
  const isFree = final === 0;

  return (
    <div className="flex items-center gap-3 py-4 border-b border-border last:border-0">
      <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
        <img src={guaranteeSvgUrl} alt="100% Wyze satisfaction guarantee" className="w-16 h-16 object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-dark">{protection.title}</p>
      </div>
      <div className="text-right flex flex-col justify-center">
        {!isFree && protection.discountPercentage ? (
          <span className="text-xs text-muted-foreground line-through">
            {formatMoney(original)}
          </span>
        ) : null}
        <span className="text-sm font-semibold text-purple-accent">
          {isFree ? "FREE" : formatMoney(final)}
        </span>
      </div>
    </div>
  );
}

export default memo(ProtectionRow);
