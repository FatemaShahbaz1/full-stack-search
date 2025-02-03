import axiosInstance from "./api.service";

// Define the CountryService class
class CountryService {
  private readonly api;
  constructor() {
    this.api = axiosInstance;
  }

  // Fetch list of countries with pagination and optional search
  async getCountries(page = 1, limit = 10, search = "") {
    try {
      const response = await this.api.get("/countries", {
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      throw error; // Will be caught by the hook
    }
  }

  // Fetch a single entry by its ID
  async getCountryById(id: string) {
    try {
      const response = await this.api.get(`/country/${id}`);
      return response.data;
    } catch (error) {
      throw error; // Will be caught by the hook
    }
  }
}

// Create an instance of the service
const countryService = new CountryService();

export default countryService;
