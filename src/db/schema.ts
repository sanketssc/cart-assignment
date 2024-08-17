import { pgTable, text, timestamp, unique, uuid, integer, numeric } from "drizzle-orm/pg-core";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/db";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
});
export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const Cart = pgTable("cart", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => userTable.id),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  productPrice: numeric("product_price").notNull()
});



export const adapter = new DrizzlePostgreSQLAdapter(
  db,
  sessionTable,
  userTable
);
