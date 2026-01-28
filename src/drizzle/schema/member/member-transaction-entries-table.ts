import { amount, createdAt, relationBetween, transactionEntriesType, updatedAt } from "@/drizzle/schema-helper/utils";
import { relations } from "drizzle-orm";
import {
    pgTable,
    uuid,
    varchar,
    boolean,
    text,
} from "drizzle-orm/pg-core";

export const transactionEntries = pgTable("transaction_entries", {
    id: uuid("id").defaultRandom().primaryKey(),

    transactionId: uuid("transaction_id").notNull(),
    bankAccountId: uuid("bank_account_id").notNull(),

    type: text("type", { enum: transactionEntriesType }).notNull(), // DEBIT | CREDIT
    amount: amount('amount'),

    createdAt: createdAt(),
    updatedAt: updatedAt(),
});