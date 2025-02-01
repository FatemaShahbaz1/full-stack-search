import { Request, Response } from "express";

import { AccomodationService } from "./accomodation.service";
import { searchParamsSchema } from "utils";

export class AccomodationController {
  constructor(private service: AccomodationService) {}

  // Handler for fetching the list of accomodations with pagination and search
  public async list(req: Request, res: Response): Promise<void> {
    try {
      // Validate query parameters
      const { search } = searchParamsSchema.parse(req.query);

      if (!search) {
        res.status(400).json({
          hotels: { total: 0, data: [] },
          countries: { total: 0, data: [] },
          cities: { total: 0, data: [] },
          error: "Missing argument: search",
        });
        return;
      }

      // Fetch data from the service layer
      const accomodations = await this.service.list(search);

      // Return the response
      res.json(accomodations);
    } catch (error) {
      console.error("Error:", error);
      res.status(400).json({
        message: error instanceof Error ? error.message : "Bad Request",
      });
    }
  }
}
