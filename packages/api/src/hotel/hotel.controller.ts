import { Request, Response } from "express";

import { HotelService } from "./hotel.service";
import { getByIdSchema, searchParamsSchema } from "utils";

export class HotelController {
  constructor(private service: HotelService) {}

  // Handler for fetching the list of hotels with pagination and search
  public async list(req: Request, res: Response): Promise<void> {
    try {
      // Validate query parameters
      const { page, limit, search } = searchParamsSchema.parse(req.query);

      if (!search) {
        res
          .status(400)
          .json({ total: 0, data: [], error: "Missing argument: search" });
        return;
      }

      // Fetch data from the service layer
      const data = await this.service.list(page, limit, search);

      // Return the response
      res.json(data);
    } catch (error) {
      console.error("Error:", error);
      res.status(400).json({
        message: error instanceof Error ? error.message : "Bad Request",
      });
    }
  }

  // Handler for fetching a single entry
  public async get(req: Request, res: Response): Promise<void> {
    try {
      // Validate params
      const { id } = getByIdSchema.parse(req.params);

      if (!id) {
        res.status(400).json({ data: null, error: "Missing argument: id" });
        return;
      }

      // Fetch data from the service layer
      const data = await this.service.get(id);

      // Return the response
      res.json({ data });
    } catch (error) {
      console.error("Error:", error);
      res.status(400).json({
        message: error instanceof Error ? error.message : "Bad Request",
      });
    }
  }
}
