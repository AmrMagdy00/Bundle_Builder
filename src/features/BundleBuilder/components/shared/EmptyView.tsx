/**
 * Empty state shown when no catalog data is returned.
 */
export default function EmptyView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-4 text-center">
      <h2 className="text-lg font-semibold mb-2">No data available</h2>
      <p className="text-sm text-muted-foreground">Please try again later.</p>
    </div>
  );
}
