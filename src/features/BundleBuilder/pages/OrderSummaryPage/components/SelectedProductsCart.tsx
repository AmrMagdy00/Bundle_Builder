import { useMemo } from "react";
import { useBuilderContext } from "../../../context/BuilderContext";
import type { BuilderCatalog } from "../../../types";
import Section from "./Section";
import ProductRow from "./ProductRow";
import PlanRow from "./PlanRow";

interface SelectedProductsCartProps {
  /** Loaded catalog. */
  catalog: BuilderCatalog;
}

/**
 * Groups selected items by category and renders each non-empty section.
 */
export default function SelectedProductsCart({ catalog }: SelectedProductsCartProps) {
  const { items } = useBuilderContext();

  const groups = useMemo(() => {
    return {
      cameras: items.filter((item) => item.category === "cameras" && item.quantity > 0),
      sensors: items.filter((item) => item.category === "sensors" && item.quantity > 0),
      accessories: items.filter(
        (item) => item.category === "accessories" && item.quantity > 0,
      ),
      plans: items.filter((item) => item.category === "plan" && item.quantity > 0),
    };
  }, [items]);

  return (
    <div>
      {groups.cameras.length > 0 && (
        <Section title="CAMERAS" className="border-t border-border">
          {groups.cameras.map((item) => (
            <ProductRow key={`${item.productId}-${item.variantId}`} item={item} catalog={catalog} />
          ))}
        </Section>
      )}

      {groups.sensors.length > 0 && (
        <Section title="SENSORS">
          {groups.sensors.map((item) => (
            <ProductRow key={`${item.productId}-${item.variantId}`} item={item} catalog={catalog} />
          ))}
        </Section>
      )}

      {groups.accessories.length > 0 && (
        <Section title="ACCESSORIES">
          {groups.accessories.map((item) => (
            <ProductRow key={`${item.productId}-${item.variantId}`} item={item} catalog={catalog} />
          ))}
        </Section>
      )}

      {groups.plans.length > 0 && (
        <Section title="HOME MONITORING PLAN">
          {groups.plans.map((item) => (
            <PlanRow key={item.productId} planId={item.productId} catalog={catalog} />
          ))}
        </Section>
      )}

    </div>
  );
}
