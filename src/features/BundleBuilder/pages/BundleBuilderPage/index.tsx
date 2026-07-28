import { useBuilderContext } from "../../context/BuilderContext";
import OrderSummaryPage from "../OrderSummaryPage";
import StepContainer from "./components/StepContainer";

/**
 * Builder wizard page where users pick cameras, plans, sensors and protections.
 * The full order summary is rendered at the bottom of the page.
 */
export default function BundleBuilderPage() {
  const { catalog } = useBuilderContext();

  if (!catalog) return null;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1 max-w-xl mx-auto lg:max-w-7xl w-full lg:px-4 pt-12 pb-6">
        <h1 className="text-[44px] font-bold tracking-tight mb-10 text-text-dark leading-[35px] text-center lg:hidden">
          Let&apos;s get started!
        </h1>
        <div className="grid grid-cols-1 gap-0 lg:gap-6 lg:grid-cols-[1fr_420px]">
          <div className="space-y-4 lg:bg-[#EDF4FF] lg:rounded-2xl lg:p-4">
            <StepContainer catalog={catalog} />
          </div>
          <div className="lg:sticky lg:top-6 lg:self-start">
            <OrderSummaryPage />
          </div>
        </div>
      </main>
    </div>
  );
}
