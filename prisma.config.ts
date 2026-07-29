import "dotenv/config";
import { defineConfig, env } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // This takes over the job of connecting to your database
    url: env("DATABASE_URL"),
  },
});