import { useEffect, useRef, type ReactNode } from "react";

interface AccordionContentProps {
  /** Whether the accordion content is visible. */
  isOpen: boolean;
  children: ReactNode;
}

/**
 * Smooth height accordion wrapper.
 */
export default function AccordionContent({ isOpen, children }: AccordionContentProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    outer.style.maxHeight = isOpen ? `${inner.scrollHeight}px` : "0px";
  }, [isOpen, children]);

  return (
    <div
      ref={outerRef}
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: "0px" }}
    >
      <div ref={innerRef}>
        <div className="px-4 pb-5 space-y-3">{children}</div>
      </div>
    </div>
  );
}
