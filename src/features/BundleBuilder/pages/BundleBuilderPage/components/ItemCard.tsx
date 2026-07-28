import { memo } from "react";
import type { Plan, Product, Protection } from "../../../types";
import StepCard from "./StepCard";
import ProductCard from "./ProductCard";
import ProtectionCard from "./ProtectionCard";

interface ItemCardProps {
  item: Product | Plan | Protection;
  categoryKey: string;
}

function ItemCard({ item, categoryKey }: ItemCardProps) {
  if (categoryKey === "cameras" || categoryKey === "sensors" || categoryKey === "plan") {
    return <StepCard item={item} categoryKey={categoryKey} />;
  }

  if (categoryKey === "accessories") {
    return <ProductCard product={item as Product} categoryKey={categoryKey} />;
  }

  if (categoryKey === "protection") {
    return <ProtectionCard protection={item as Protection} />;
  }

  return null;
}

export default memo(ItemCard);
