import { createdAt, relationBetween, updatedAt } from "@/drizzle/schema-helper/utils";
import { relations } from "drizzle-orm";
import {
    pgTable,
    uuid,
    varchar,
    boolean,
} from "drizzle-orm/pg-core";
import { familyMemberTable } from "./member-table";
import { memberTrxTable } from "./member-transaction-table";

export const memberTrxTypeTable = pgTable("member_trx_types", {
    id: uuid('id').primaryKey().unique().notNull().defaultRandom(),

    // Scope control
    memberId: uuid('member_id').notNull().references(() => familyMemberTable.id, { onDelete: 'cascade' }),

    // Display
    name: varchar("name", { length: 100 }).notNull(), // Transfer, Deposit, Loan, etc
    description: varchar("description", { length: 255 }),

    // Behavior flags
    isSystem: boolean("is_system").default(false).notNull(),
    requiresTwoEntries: boolean("requires_two_entries")
        .default(false)
        .notNull(),

    createdAt: createdAt(),
    updatedAt: updatedAt(),
});



export const memberTrxTypeTableRelation = relations(memberTrxTypeTable, ({ one,many }) => ({
    member: one(familyMemberTable, {
        fields: [memberTrxTypeTable.memberId],
        references: [familyMemberTable.id],
        relationName: relationBetween('memberTrxType and member')
    }),




    transaction:many(memberTrxTable,{relationName:relationBetween('memberTrx and memberTrxType')})
}))