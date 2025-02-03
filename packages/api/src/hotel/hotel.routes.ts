import { Router } from "express";
import { connectToDatabase } from "db/db";
import { HotelController } from "./hotel.controller";
import { HotelService } from "./hotel.service";

export const initHotelRoutes = async (): Promise<Router> => {
  const client = await connectToDatabase();
  const service = new HotelService(client);
  const controller = new HotelController(service);

  const router = Router();

  router.get("/hotels", async (req, res) => controller.list(req, res));
  router.get("/hotel/:id", async (req, res) => controller.get(req, res));

  return router;
};
