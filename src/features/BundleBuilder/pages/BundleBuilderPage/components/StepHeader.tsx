import { memo } from "react";
import { cn } from "@/shared/lib/utils";
import { useBuilderContext } from "../../../context/BuilderContext";
import type { StepIcon } from "../../../config/steps";

interface StepHeaderProps {
  icon: StepIcon;
  title: string;
  stepId: number;
  count: number;
  isDisabled?: boolean;
}

/**
 * Clickable accordion header for a builder step.
 */
function StepHeader({ icon: Icon, title, stepId, count, isDisabled }: StepHeaderProps) {
  const { openStep, toggleStep } = useBuilderContext();
  const isOpen = openStep === stepId;

  return (
    <button
      type="button"
      onClick={isDisabled ? undefined : () => toggleStep(stepId)}
      className={cn(
        "w-full flex items-center px-4 py-2 text-left group transition-opacity duration-200",
        isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center w-12 h-12 flex-shrink-0",
          isDisabled ? "text-muted-foreground" : "text-purple-accent",
        )}
      >
        {Icon && <Icon className="w-[28px] h-[28px]" />}
      </span>
      <span
        className={cn(
          "flex-1 text-lg font-[630] min-w-0 leading-[22px] max-w-[201px] ml-3",
          isDisabled ? "text-muted-foreground" : "",
        )}
      >
        {title}
      </span>
      <span className="flex items-center gap-2 ml-auto flex-shrink-0">
        <span className={cn("font-[500]", isDisabled ? "" : "text-purple-accent")}>
          {count} selected
        </span>
        <svg
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200 ease-in-out",
            isDisabled ? "" : "text-purple-accent",
            isOpen && "rotate-180",
          )}
          viewBox="0 0 24 24"
        >
          <path
            d="M12 18 L20 7 L4 7 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

export default memo(StepHeader);
