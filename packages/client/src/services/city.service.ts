import axiosInstance from "./api.service";

// Define the CityService class
class CityService {
  private readonly api;
  constructor() {
    this.api = axiosInstance;
  }

  // Fetch list of cities with pagination and optional search
  async getCities(page = 1, limit = 10, search = "") {
    try {
      const response = await this.api.get("/cities", {
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      throw error; // Will be caught by the hook
    }
  }

  // Fetch a single entry by its ID
  async getCityById(id: string) {
    try {
      const response = await this.api.get(`/city/${id}`);
      return response.data;
    } catch (error) {
      throw error; // Will be caught by the hook
    }
  }
}

// Create an instance of the service
const cityService = new CityService();

export default cityService;
