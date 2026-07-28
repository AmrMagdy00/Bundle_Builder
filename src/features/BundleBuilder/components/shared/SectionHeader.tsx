interface SectionHeaderProps {
  /** Section title text. */
  title: string;
}

/**
 * Uppercase, muted section header used in summary and step lists.
 */
export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h2 className="text-[11px] font-medium text-muted-foreground tracking-[1.6px] uppercase mb-2">
      {title}
    </h2>
  );
}
