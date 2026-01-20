import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schema-helper/utils";

export const userTable = pgTable('users', {
    id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
    firstName: varchar('first_name', { length: 20 }).notNull(),
    lastName: varchar('last_name', { length: 20 }).notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    phone: varchar('phone', { length: 11 }).unique().notNull(),
    password: text('password').notNull(),
    createdAt,
    updatedAt
})