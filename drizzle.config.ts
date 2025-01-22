import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  out: "./migrations",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.DB_NAME ?? "sqlite.db",
  },
});
