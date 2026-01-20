import { numeric, timestamp } from "drizzle-orm/pg-core";

export const createdAt = timestamp('createdAt', { withTimezone: true }).defaultNow().notNull()
export const updatedAt = timestamp('updatedAt', { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date())
export const dateTime = (name: string) => timestamp(name, { withTimezone: true }).notNull()
export const amount = (name: string, precision: number = 7, scale: number = 2) => numeric(name, { precision, scale, mode: "number" })