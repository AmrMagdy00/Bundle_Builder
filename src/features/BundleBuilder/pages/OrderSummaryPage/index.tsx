import { useMemo } from "react";
import { useBuilderContext } from "../../context/BuilderContext";
import ProtectionRow from "./components/ProtectionRow";
import Section from "./components/Section";
import SelectedProductsCart from "./components/SelectedProductsCart";
import ShippingRow from "./components/ShippingRow";
import SummaryFooter from "./components/SummaryFooter";

/**
 * Order summary panel shown at the bottom of the bundle builder page.
 * Lists all selected items by category with pricing, shipping and checkout.
 */
export default function OrderSummaryPage() {
  const { catalog, items } = useBuilderContext();

  const protections = useMemo(
    () =>
      items.filter(
        (item) => item.category === "protection" && item.quantity > 0,
      ),
    [items],
  );

  if (!catalog) return null;

  return (
    <div className="px-5 py-3 lg:px-5  lg:pt-8 pb-0 lg:pb-12 bg-[#EDF4FF] lg:rounded-2xl">
      <span className="text-[11px] font-medium text-muted-foreground tracking-[1.6px] uppercase block mb-8">
        REVIEW
      </span>
      <h1 className="text-[32px] font-bold tracking-tight text-text-dark leading-[1.1]">
        Your security system
      </h1>
      <p className="text-sm text-muted-foreground mt-2 mb-6">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>

      <SelectedProductsCart catalog={catalog} />

      <Section title="SHIPPING" className="border-b-0 pb-0">
        <ShippingRow />
      </Section>

      {protections.length > 0 && (
        <Section title="EXTRA PROTECTION" className="border-b-0 pt-0 pb-0">
          {protections.map((item) => (
            <ProtectionRow key={item.productId} item={item} catalog={catalog} />
          ))}
        </Section>

      )}

      <SummaryFooter catalog={catalog} />
    </div>
  );
}
