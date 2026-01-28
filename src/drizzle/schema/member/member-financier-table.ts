import { pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { familyMemberTable } from "./member-table";
import { createdAt, relationBetween, updatedAt } from "@/drizzle/schema-helper/utils";
import { relations } from "drizzle-orm";
import { memberLoanTable } from "./member-loan-table";

export const memberFinancierTable = pgTable("member_financier", {
    id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
    memberId: uuid("member_id").notNull().references(() => familyMemberTable.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
}, (table) => [
    unique('unique_member_financier').on(table.memberId, table.phone)
]);

export const memberFinancierTableRelation = relations(memberFinancierTable, ({ one, many }) => ({
    member: one(familyMemberTable, {
        fields: [memberFinancierTable.memberId],
        references: [familyMemberTable.id],
        relationName: relationBetween('memberFinancier and member')
    }),



    memberLoans: many(memberLoanTable, { relationName: relationBetween('memberLoan and memberFinancier') })
}))