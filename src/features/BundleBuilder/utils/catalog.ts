import type { BuilderCatalog } from "../types";

/**
 * Maps step category keys (used for item state / selectedCount / getItemsByCategory)
 * to catalog keys (plural keys in BuilderCatalog).
 *
 * Example: "plan" -> "plans" so that catalog["plans"] resolves correctly.
 */
export const CATALOG_KEY_MAP: Record<string, keyof BuilderCatalog> = {
  cameras: "cameras",
  plan: "plans",
  sensors: "sensors",
  protection: "protections",
  accessories: "accessories",
};
