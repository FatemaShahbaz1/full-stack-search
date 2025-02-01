import { z } from "zod";

import { hotelSchema, citySchema, countrySchema } from "./schemas";

export type Hotel = z.infer<typeof hotelSchema>;
export type Country = z.infer<typeof countrySchema>;
export type City = z.infer<typeof citySchema>;
