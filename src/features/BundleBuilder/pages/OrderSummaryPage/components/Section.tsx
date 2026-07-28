import { type ReactNode } from "react";
import SectionHeader from "../../../components/shared/SectionHeader";

interface SectionProps {
  /** Section title displayed above the divider. */
  title: string;
  /** Section contents. */
  children: ReactNode;
  /** Optional wrapper className. */
  className?: string;
}

/**
 * Reusable section wrapper with a title and subtle divider.
 */
export default function Section({ title, children, className }: SectionProps) {
  return (
    <div className={`border-b border-border py-4 ${className ?? ""}`}>
      <SectionHeader title={title} />
      {children}
    </div>
  );
}
