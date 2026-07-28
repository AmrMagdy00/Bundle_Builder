import { memo } from "react";
import { cn } from "@/shared/lib/utils";
import type { Plan, Product, Protection } from "../../../types";
import type { StepConfig } from "../../../config/steps";
import { useBuilderContext } from "../../../context/BuilderContext";
import StepHeader from "./StepHeader";
import AccordionContent from "./AccordionContent";
import ItemCard from "./ItemCard";
import { Button } from "@/shared/components/ui/button";

interface StepProps {
  /** Step configuration. */
  step: StepConfig;
  /** Catalog items for this step. */
  catalogItems: (Product | Plan | Protection)[];
  /** Whether the step is disabled (gating). */
  isDisabled?: boolean;
  /** Title of the next step for the "Next" button. */
  nextStepTitle?: string;
  /** Called when the "Next" button is clicked. */
  onNext?: () => void;
}

/**
 * A single builder step with a header, accordion content and optional next button.
 */
function Step({ step, catalogItems, isDisabled, nextStepTitle, onNext }: StepProps) {
  const { openStep, selectedCount } = useBuilderContext();
  const isOpen = openStep === step.id;
  const count = selectedCount(step.categoryKey);

  return (
    <div id={`step-${step.id}`} className="mb-3 last:mb-0">
      <span className="text-[11px] font-medium text-muted-foreground tracking-[1.6px] uppercase block mb-2 px-4 leading-[10px] max-w-[360px]">
        Step {step.stepNumber} of 4
      </span>
      <section
        className={cn(
          "border-t border-b border-text-dark",
          isOpen && !isDisabled ? "bg-[#EDF4FF]" : "bg-white",
        )}
      >
        <StepHeader
          icon={step.icon}
          title={step.title}
          stepId={step.id}
          count={count}
          isDisabled={isDisabled}
        />
        <AccordionContent isOpen={isOpen && !isDisabled}>
          {catalogItems.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">
              No options available.
            </p>
          ) : step.categoryKey === "cameras" || step.categoryKey === "sensors" ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
              {catalogItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  categoryKey={step.categoryKey}
                />
              ))}
            </div>
          ) : step.categoryKey === "plan" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {catalogItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  categoryKey={step.categoryKey}
                />
              ))}
            </div>
          ) : (
            catalogItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                categoryKey={step.categoryKey}
              />
            ))
          )}
          {isOpen && !isDisabled && count > 0 && nextStepTitle && (
            <div className="flex justify-center px-4 pt-4 pb-2">
              <Button
                type="button"
                variant="outline"
                onClick={onNext}
                className="h-10 text-base font-semibold rounded-xl border-2 border-purple-accent text-purple-accent bg-transparent hover:bg-purple-accent/5 px-4"
              >
                Next: {nextStepTitle}
              </Button>
            </div>
          )}
        </AccordionContent>
      </section>
    </div>
  );
}

export default memo(Step);
