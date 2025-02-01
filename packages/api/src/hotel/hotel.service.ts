import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import { Hotel } from "utils";

class HotelService {
  private db: Db;
  private collection: Collection<Hotel>;

  // Inject the MongoDB client
  constructor(client: MongoClient) {
    this.db = client.db();
    this.collection = this.db.collection("hotels");
  }

  // Method to fetch hotels matching the search
  public async list(page = 1, limit = 10, search?: string) {
    try {
      const query: any = {};

      if (search) {
        query.$or = [
          { chain_name: { $regex: search, $options: "i" } },
          { hotel_name: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
          { country: { $regex: search, $options: "i" } },
        ];
      }

      // Get the count of matching hotels
      const total = await this.collection.countDocuments(query);

      // Pagination logic
      const skip = (page - 1) * limit;
      const data = await this.collection
        .find(query)
        .skip(skip)
        .limit(limit)
        .toArray();

      return {
        total,
        page,
        limit,
        data,
      };
    } catch (error) {
      console.error("Error fetching hotels:", error);
      throw new Error("Error fetching hotels");
    }
  }

  // Method to fetch a single entry
  public async get(id: string) {
    try {
      const query = { _id: new ObjectId(id) as unknown as string };
      const data = await this.collection.findOne(query);

      return data;
    } catch (error) {
      console.error(`Error fetching hotel: ${id}`, error);
      throw new Error(`Error fetching hotel: ${id}.`);
    }
  }
}

export { HotelService };
