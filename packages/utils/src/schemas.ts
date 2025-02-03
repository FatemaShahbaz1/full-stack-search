import { z } from "zod";

// Define the schema for Hotel
export const hotelSchema = z.object({
  _id: z.string(),
  chain_name: z.string(),
  hotel_name: z.string(),
  addressline1: z.string(),
  addressline2: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  countryisocode: z.string(),
  star_rating: z.number(),
});

// Define the schema for City
export const citySchema = z.object({
  _id: z.string(), // _id is a string (you can change this to `z.string().uuid()` if it's a UUID)
  name: z.string(), // name is a string
});

// Define the schema for Country
export const countrySchema = z.object({
  _id: z.string(), // _id is a string (you can change this to `z.string().uuid()` if it's a UUID)
  country: z.string(), // country is a string
  countryisocode: z.string(),
});

export const searchParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
});

export const getByIdSchema = z.object({
  id: z.string(),
});
