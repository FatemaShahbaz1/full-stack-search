import { Router } from "express";
import { connectToDatabase } from "db/db";
import { AccomodationService } from "./accomodation.service";
import { AccomodationController } from "./accomodation.controller";

export const initAccomodationRoutes = async (): Promise<Router> => {
  const client = await connectToDatabase();
  const service = new AccomodationService(client);
  const controller = new AccomodationController(service);

  const router = Router();

  router.get("/accomodations", async (req, res) => controller.list(req, res));

  return router;
};
