// SerpAPI Types based on Google Maps & Google search results from TODO.md examples

export interface SerpLocalResult {
  title: string;
  address: string | null;
  rating?: number;
  reviews?: number;
  price?: string;
  type?: string;
  website?: string;
  thumbnail?: string;
  gps_coordinates?: {
    latitude: number;
    longitude: number;
  };
  place_id: string;
}

export interface SerpApiResponse {
  local_results?: SerpLocalResult[];
  recipes_results?: any[];
  error?: {
    code: number;
    message: string;
  };
}
