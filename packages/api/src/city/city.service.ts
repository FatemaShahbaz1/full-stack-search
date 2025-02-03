import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import { City } from "utils";

class CityService {
  private db: Db;
  private collection: Collection<City>;

  // Inject the MongoDB client
  constructor(client: MongoClient) {
    this.db = client.db();
    this.collection = this.db.collection("cities");
  }

  // Method to fetch cities matching the search
  public async list(page = 1, limit = 10, search?: string) {
    try {
      const query: any = {};

      if (search) {
        query.name = { $regex: search, $options: "i" };
      }

      // Get the count of matching cities
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
      console.error("Error fetching cities:", error);
      throw new Error("Error fetching cities");
    }
  }

  // Method to fetch a single entry
  public async get(id: string) {
    try {
      const query = { _id: new ObjectId(id) as unknown as string };
      const data = await this.collection.findOne(query);

      return data;
    } catch (error) {
      console.error(`Error fetching city: ${id}`, error);
      throw new Error(`Error fetching city: ${id}.`);
    }
  }
}

export { CityService };
