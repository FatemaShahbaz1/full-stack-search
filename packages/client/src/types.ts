import { City, Country, Hotel } from "utils";

export type AccomodationResponse = {
  hotels: { total: number; page: number; limit: number; data: Hotel[] };
  countries: { total: number; page: number; limit: number; data: Country[] };
  cities: { total: number; page: number; limit: number; data: City[] };
  error?: string;
};
