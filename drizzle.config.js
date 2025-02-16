import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_3Nz1TKBcGIPF@ep-little-block-a5h09x99-pooler.us-east-2.aws.neon.tech/ai-study-material?'
  }
});
