import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, relationBetween, updatedAt } from "@/drizzle/schema-helper/utils"
import { familyTable } from "../family";
import { familyMemberTable } from "./member-table";
import { relations } from "drizzle-orm";




/* ======================================================
   MEMBER BANK ACCOUNTS TABLE
====================================================== */


export const memberBankAccounts = pgTable("member_bank_accounts", {
    id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
    memberId: uuid("member_id").notNull().references(() => familyMemberTable.id, { onDelete: "cascade" }),

    name: varchar("name", { length: 255 }).notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
});


/* ======================================================
   MEMBER BANK ACCOUNTS TABLE RELATION
====================================================== */

export const memberBankAccountsRelation = relations(memberBankAccounts, ({ one }) => ({
    member: one(familyMemberTable, {
        fields: [memberBankAccounts.memberId],
        references: [familyMemberTable.id],
        relationName: relationBetween('memberBank and member')
    }),
}))