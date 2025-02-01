import { Router } from "express";
import { initAccomodationRoutes } from "src/accomodation/accomodation.routes";
import { initHotelRoutes } from "./hotel/hotel.routes";
import { initCountryRoutes } from "./country/country.routes";
import { initCityRoutes } from "./city/city.routes";

export const initRoutes = async () => {
  const router = Router();

  router.use(await initAccomodationRoutes());
  router.use(await initHotelRoutes());
  router.use(await initCountryRoutes());
  router.use(await initCityRoutes());

  return router;
};
