export interface ProductVariant {
  id: string;
  color: string;
  icon: string;
  stock: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  discountPercentage?: number;
  variants: ProductVariant[];
}

export interface Plan {
  id: string;
  icon: string;
  title: string;
  price: number;
  discountPercentage?: number;
}

export interface Protection {
  id: string;
  icon: string;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
}

export interface BuilderCatalog {
  cameras: Product[];
  sensors: Product[];
  accessories: Product[];
  plans: Plan[];
  protections: Protection[];
}

export interface SelectedItem {
  productId: string;
  variantId: string | null;
  quantity: number;
  category: string;
}
