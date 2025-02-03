import { Router } from "express";
import { connectToDatabase } from "db/db";
import { CountryService } from "./country.service";
import { CountryController } from "./country.controller";

export const initCountryRoutes = async (): Promise<Router> => {
  const client = await connectToDatabase();
  const service = new CountryService(client);
  const controller = new CountryController(service);

  const router = Router();

  router.get("/countries", async (req, res) => controller.list(req, res));
  router.get("/country/:id", async (req, res) => controller.get(req, res));

  return router;
};
