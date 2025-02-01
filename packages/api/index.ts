import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initRoutes } from "src/routes";

dotenv.config();

if (process.env.NODE_ENV !== "production" && !process.env.DATABASE_URL) {
  await import("./db/startAndSeedMemoryDB");
}

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  app.use(await initRoutes());

  app.listen(PORT, () => {
    console.log(`API Server Started at ${PORT}`);
  });
})();
