import {
  pgTable,
  integer,
  varchar,
  timestamp,
  text,
  boolean,
} from "drizzle-orm/pg-core";

//UserTable//
export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  password: varchar("password", { length: 255 }).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

//VideoTable
export const videosTable = pgTable("video", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description"),

  videoUrl: varchar("video_url", { length: 500 }).notNull(),

  thumbnailUrl: varchar("thumbnail_url", { length: 500 }),

  controls: boolean("controls").notNull().default(true),

  width: integer("width").notNull().default(1080),

  height: integer("height").notNull().default(1920),
  
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
