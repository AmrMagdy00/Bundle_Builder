import { BuilderProvider, useBuilderContext } from "./context/BuilderContext";
import BundleBuilderPage from "./pages/BundleBuilderPage";
import LoadingView from "./components/shared/LoadingView";
import ErrorView from "./components/shared/ErrorView";
import EmptyView from "./components/shared/EmptyView";

/**
 * Internal component that reads builder state and renders the appropriate view.
 */
function BuilderContent() {
  const { loading, error, catalog } = useBuilderContext();

  if (loading) return <LoadingView />;
  if (error) return <ErrorView error={error} />;
  if (!catalog) return <EmptyView />;

  return <BundleBuilderPage />;
}

/**
 * Bundle Builder feature entry point.
 *
 * Provides the builder context and renders the builder page with
 * the order summary panel at the bottom.
 */
export default function BundleBuilder() {
  return (
    <BuilderProvider>
      <BuilderContent />
    </BuilderProvider>
  );
}
