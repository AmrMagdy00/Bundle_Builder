import { cn } from "@/shared/lib/utils";

interface QuantityStepperProps {
  /** Current quantity value. */
  quantity: number;
  /** Maximum allowed quantity. */
  max: number;
  /** Called when the increase button is pressed. */
  onIncrease: () => void;
  /** Called when the decrease button is pressed. */
  onDecrease: () => void;
  /** Visual size variant. `default` keeps the existing responsive sizing.
   *  `compact` uses a smaller, consistently small footprint for PC cards. */
  size?: "default" | "compact";
}

/**
 * Compact +/- stepper for adjusting item quantities.
 */
export default function QuantityStepper({
  quantity,
  max,
  onIncrease,
  onDecrease,
  size = "default",
}: QuantityStepperProps) {
  const atMax = quantity >= max;
  const atMin = quantity <= 0;

  const sizeClasses = {
    default: {
      root: "gap-1.5 lg:gap-3 mt-3",
      button:
        "w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-2xl text-base lg:text-2xl",
      value: "text-base lg:text-2xl w-5 lg:w-8",
    },
    compact: {
      root: "gap-1 mt-0",
      button: "w-6 h-6 rounded border border-gray-700 text-sm",
      buttonMinus: "bg-white text-gray-700 hover:bg-gray-50",
      buttonPlus: "bg-gray-200 text-gray-700 hover:bg-gray-300",
      value: "text-sm w-4",
    },
  };

  if (size === "compact") {
    return (
      <div className={cn("flex items-center", sizeClasses.compact.root)}>
        <button
          type="button"
          onClick={atMin ? undefined : onDecrease}
          className={cn(
            "flex items-center justify-center transition-colors",
            sizeClasses.compact.button,
            sizeClasses.compact.buttonMinus,
            atMin && "opacity-40 cursor-not-allowed",
          )}
        >
          −
        </button>
        <span
          className={cn(
            "font-medium tabular-nums text-center text-text-dark",
            sizeClasses.compact.value,
          )}
        >
          {quantity}
        </span>
        <button
          type="button"
          onClick={atMax ? undefined : onIncrease}
          className={cn(
            "flex items-center justify-center transition-colors",
            sizeClasses.compact.button,
            sizeClasses.compact.buttonPlus,
            atMax && "opacity-40 cursor-not-allowed",
          )}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", sizeClasses.default.root)}>
      <button
        type="button"
        onClick={atMin ? undefined : onDecrease}
        className={cn(
          "flex items-center justify-center transition-colors",
          sizeClasses.default.button,
          atMin
            ? "bg-[#EDF4FF] text-muted-foreground opacity-40 cursor-not-allowed"
            : "bg-[#EDF4FF] text-[#5F6B7A] hover:bg-[#E0E8F7] cursor-pointer",
        )}
      >
        −
      </button>
      <span
        className={cn(
          "font-medium tabular-nums text-center text-text-dark",
          sizeClasses.default.value,
        )}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={atMax ? undefined : onIncrease}
        className={cn(
          "flex items-center justify-center transition-colors",
          sizeClasses.default.button,
          atMax
            ? "bg-[#EDF4FF] text-muted-foreground opacity-40 cursor-not-allowed"
            : "bg-[#EDF4FF] text-[#5F6B7A] hover:bg-[#E0E8F7] cursor-pointer",
        )}
      >
        +
      </button>
    </div>
  );
}
