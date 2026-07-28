import { useCallback, useMemo } from "react";
import { STEPS_CONFIG } from "../../../config/steps";
import { useBuilderContext } from "../../../context/BuilderContext";
import { CATALOG_KEY_MAP } from "../../../utils/catalog";
import type { BuilderCatalog } from "../../../types";
import Step from "./Step";

interface StepContainerProps {
  /** Loaded catalog data. */
  catalog: BuilderCatalog;
}

/**
 * Renders all builder steps and wires navigation between them.
 */
export default function StepContainer({ catalog }: StepContainerProps) {
  const { toggleStep, stepEnabled } = useBuilderContext();

  const handleNext = useCallback(
    (currentId: number, nextId: number) => {
      toggleStep(currentId);
      setTimeout(() => {
        toggleStep(nextId);
        requestAnimationFrame(() => {
          document
            .getElementById(`step-${nextId}`)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }, 300);
    },
    [toggleStep],
  );

  const steps = useMemo(
    () =>
      STEPS_CONFIG.map((step, index) => {
        const isLast = index === STEPS_CONFIG.length - 1;
        const nextStep = isLast ? undefined : STEPS_CONFIG[index + 1];
        const catalogKey = CATALOG_KEY_MAP[step.categoryKey] ?? step.categoryKey;
        let catalogItems = (catalog[catalogKey] as (typeof catalog)[typeof catalogKey]) ?? [];

        // Show only the first protection option as the single guarantee package.
        if (step.categoryKey === "protection") {
          catalogItems = catalogItems.slice(0, 1);
        }

        return (
          <Step
            key={step.id}
            step={step}
            catalogItems={catalogItems}
            isDisabled={!stepEnabled[index]}
            nextStepTitle={nextStep?.title}
            onNext={
              nextStep
                ? () => handleNext(step.id, nextStep.id)
                : undefined
            }
          />
        );
      }),
    [catalog, handleNext, stepEnabled],
  );

  return <div className="divide-y divide-border">{steps}</div>;
}
