import { defineConfig } from "drizzle-kit";
require("dotenv").config();

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL!,
  },
})
