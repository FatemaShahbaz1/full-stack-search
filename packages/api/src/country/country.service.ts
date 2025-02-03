import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import { Country } from "utils";

class CountryService {
  private db: Db;
  private collection: Collection<Country>;

  // Inject the MongoDB client
  constructor(client: MongoClient) {
    this.db = client.db();
    this.collection = this.db.collection("countries");
  }

  // Method to fetch countries matching the search
  public async list(page = 1, limit = 10, search?: string) {
    try {
      const query: any = {};

      if (search) {
        query.$or = [
          { country: { $regex: search, $options: "i" } },
          { countryisocode: { $regex: search, $options: "i" } },
        ];
      }

      // Get the count of matching countries
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
      console.error("Error fetching countries:", error);
      throw new Error("Error fetching countries");
    }
  }

  // Method to fetch a single entry
  public async get(id: string) {
    try {
      const query = { _id: new ObjectId(id) as unknown as string };
      const data = await this.collection.findOne(query);

      return data;
    } catch (error) {
      console.error(`Error fetching country: ${id}`, error);
      throw new Error(`Error fetching country: ${id}.`);
    }
  }
}

export { CountryService };
