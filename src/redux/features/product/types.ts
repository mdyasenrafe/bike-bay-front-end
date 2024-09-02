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
};

export type TProductsState = {
  products: TProduct[];
};

export type TFilters = {
  searchTerm?: string;
  category?: string;
  brand?: string;
  priceGte?: number;
  priceLte?: number;
  rating?: number;
  price?: string;
  sort?: string;
  limit?: number; // Optional pagination parameter
  page?: number; // Optional pagination parameter
};
