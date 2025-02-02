import axiosInstance from "./api.service";

// Define the HotelService class
class HotelService {
  private readonly api;
  constructor() {
    this.api = axiosInstance;
  }

  // Fetch list of hotels with pagination and optional search
  async getHotels(page = 1, limit = 10, search = "") {
    try {
      const response = await this.api.get("/hotels", {
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      throw error; // Will be caught by the hook
    }
  }

  // Fetch a single hotel by its ID
  async getHotelById(id: string) {
    try {
      const response = await this.api.get(`/hotel/${id}`);
      return response.data;
    } catch (error) {
      throw error; // Will be caught by the hook
    }
  }
}

// Create an instance of the service
const hotelService = new HotelService();

export default hotelService;
