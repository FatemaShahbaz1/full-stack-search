import { MongoClient } from "mongodb";
import { CityService } from "src/city/city.service";
import { CountryService } from "src/country/country.service";
import { HotelService } from "src/hotel/hotel.service";

class AccomodationService {
  private hotelService: HotelService;
  private countryService: CountryService;
  private cityService: CityService;

  // Inject the MongoDB client
  constructor(client: MongoClient) {
    this.hotelService = new HotelService(client);
    this.countryService = new CountryService(client);
    this.cityService = new CityService(client);
  }

  // Method to fetch hotels with pagination and search
  public async list(search?: string) {
    try {
      const hotels = await this.hotelService.list(1, 10, search);
      const countries = await this.countryService.list(1, 10, search);
      const cities = await this.cityService.list(1, 10, search);

      return { hotels, countries, cities };
    } catch (error) {
      console.error("Error fetching accomodations:", error);
      throw new Error("Error fetching accomodations");
    }
  }
}

export { AccomodationService };
