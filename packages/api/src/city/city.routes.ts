import { Router } from "express";
import { connectToDatabase } from "db/db";
import { CityService } from "./city.service";
import { CityController } from "./city.controller";

export const initCityRoutes = async (): Promise<Router> => {
  const client = await connectToDatabase();
  const service = new CityService(client);
  const controller = new CityController(service);

  const router = Router();

  router.get("/cities", async (req, res) => controller.list(req, res));
  router.get("/city/:id", async (req, res) => controller.get(req, res));

  return router;
};
