import { Skeleton } from "@/shared/components/ui/skeleton";

/**
 * Full-screen loading placeholder for the bundle builder.
 */
export default function LoadingView() {
  return (
    <div className="flex flex-col min-h-dvh bg-background px-4 pt-12 max-w-xl mx-auto">
      <Skeleton className="h-10 w-48 mx-auto mb-10" />
      <div className="space-y-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  );
}
