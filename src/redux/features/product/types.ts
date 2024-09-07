export type TProduct = {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  cc: number;
  model: string;
  brand: string;
  thumb: string;
  year: number;
  updatedAt: string;
  status: "active" | "inactive";
};

export type TProductsState = {
  products: TProduct[];
};

export type TFilters = {
  searchTerm?: string;
  brand?: string;
  priceGte?: number;
  priceLte?: number;
  pricePerHour?: string;
  sort?: string;
  limit?: number;
  page?: number;
  isAvailable?: boolean;
  model?: string;
  status?: "active" | "inactive";
};

export type OptionType = { value: string | boolean; label: string };
