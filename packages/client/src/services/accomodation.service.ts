import { AccomodationResponse } from "../types";
import axiosInstance from "./api.service";

// Define the HotelService class
class AccomodationService {
  private readonly api;
  constructor() {
    this.api = axiosInstance;
  }

  // Fetch list of accomodation with pagination and optional search
  async getAccomodations(search = "") {
    try {
      const response = await this.api.get(`/accomodations?search=${search}`);
      return response.data as AccomodationResponse;
    } catch (error) {
      throw error; // Will be caught by the hook
    }
  }
}

// Create an instance of the service
const accomodationService = new AccomodationService();

export default accomodationService;
