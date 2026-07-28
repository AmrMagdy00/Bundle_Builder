import { memo } from "react";
import ProductThumbnail from "../../../components/shared/ProductThumbnail";
import { useBuilderContext } from "../../../context/BuilderContext";
import { findProduct, formatMoney, discountedPrice } from "../../../utils/price";
import type { BuilderCatalog, SelectedItem } from "../../../types";

interface ProductRowProps {
  /** Selected item to render. */
  item: SelectedItem;
  /** Loaded catalog for product lookup. */
  catalog: BuilderCatalog;
}

/**
 * A single product row in the summary cart.
 */
function ProductRow({ item, catalog }: ProductRowProps) {
  const { updateQuantity } = useBuilderContext();
  const product = findProduct(catalog, item.productId);
  if (!product) return null;

  const variant = product.variants.find((v) => v.id === item.variantId);
  const original = product.price * item.quantity;
  const final = discountedPrice(product.price, product.discountPercentage) * item.quantity;
  const isFree = final === 0;

  return (
    <div className="flex items-start gap-3 py-4 border-b border-border last:border-0">
      <ProductThumbnail alt={product.title} className="w-12 h-12" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-dark">{product.title}</p>
        {variant && (
          <p className="text-xs text-muted-foreground mt-0.5">{variant.color}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={() =>
              updateQuantity(item.productId, item.variantId, item.quantity - 1, item.category)
            }
            className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors"
          >
            −
          </button>
          <span className="text-sm font-medium tabular-nums w-4 text-center">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              updateQuantity(item.productId, item.variantId, item.quantity + 1, item.category)
            }
            className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors"
          >
            +
          </button>
        </div>
      </div>
      <div className="text-right flex flex-col justify-center">
        {!isFree && product.discountPercentage ? (
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

export default memo(ProductRow);
