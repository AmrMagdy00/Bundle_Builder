interface PromoBadgeProps {
  /** Savings percentage shown inside the badge. */
  percent: number;
}

/**
 * Circular promotional badge showing the bundle savings percentage.
 */
export default function PromoBadge({ percent }: PromoBadgeProps) {
  return (
    <div className="w-16 h-16 rounded-full bg-purple-accent text-white flex flex-col items-center justify-center text-[10px] font-bold leading-tight text-center p-1">
      <span>SAVE</span>
      <span className="text-lg">{percent}%</span>
    </div>
  );
}
