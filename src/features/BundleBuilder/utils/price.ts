import type { BuilderCatalog, Plan, Product, Protection } from "../types";

/**
 * Format a number as USD currency string ($XX.XX).
 */
export function formatMoney(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Calculate the discounted price. Returns the original price when no discount is provided.
 */
export function discountedPrice(price: number, discountPercentage?: number): number {
  return discountPercentage ? price * (1 - discountPercentage / 100) : price;
}

/**
 * Find a product across cameras, sensors and accessories arrays.
 */
export function findProduct(
  catalog: BuilderCatalog,
  productId: string,
): Product | undefined {
  return [...catalog.cameras, ...catalog.sensors, ...catalog.accessories].find(
    (p) => p.id === productId,
  );
}

/**
 * Find a plan by id.
 */
export function findPlan(catalog: BuilderCatalog, planId: string): Plan | undefined {
  return catalog.plans.find((p) => p.id === planId);
}

/**
 * Find a protection by id.
 */
export function findProtection(
  catalog: BuilderCatalog,
  protectionId: string,
): Protection | undefined {
  return catalog.protections.find((p) => p.id === protectionId);
}
