export interface Venue {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  capacity: number;
  surface: string;
  image: string | null;
}

export interface VenuesParams {
  id?: number;
  name?: string;
  city?: string;
  country?: string;
  search?: string;
}
