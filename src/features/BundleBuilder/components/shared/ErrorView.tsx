import { Button } from "@/shared/components/ui/button";

interface ErrorViewProps {
  /** Error message to display. */
  error: string;
}

/**
 * Error state with retry action.
 */
export default function ErrorView({ error }: ErrorViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <span className="text-destructive text-xl">!</span>
      </div>
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">{error}</p>
      <Button onClick={() => window.location.reload()} variant="default">
        Try again
      </Button>
    </div>
  );
}
