import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, relationBetween, updatedAt } from "@/drizzle/schema-helper/utils"
import { familyTable } from "../family";
import { relations } from "drizzle-orm";
import { memberTrxTypeTable } from "./member-transaction-type-table";
import { memberBankAccounts } from "./member-bank-table";
import { memberTrxTable } from "./member-transaction-table";
import { memberFinancierTable } from "./member-financier-table";
import { memberLoanTable } from "./member-loan-table";


/* ======================================================
   FAMILY MEMBERS
====================================================== */

export const familyMemberTable = pgTable('family_members', {
  id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
  familyId: uuid("family_id").notNull().references(() => familyTable.id, { onDelete: "cascade" }),
  name: varchar('name', { length: 100 }).notNull(),
  phone: varchar('name', { length: 20 }).unique().notNull(),
  password: text('password').notNull(),
  joinedAt: createdAt("joined_at"),
  updatedAt: updatedAt()
})


/**=====================================================
  FAMILY MEMBERS RELATIONS
 =====================================================*/

export const familyMemberTableRelation = relations(familyMemberTable, ({ one, many }) => ({
  family: one(familyTable, {
    fields: [familyMemberTable.familyId],
    references: [familyTable.id],
    relationName: relationBetween('familyMember and family')
  }),



  memberbanks: many(memberBankAccounts, { relationName: relationBetween('memberBank and member') }),
  memberTrxTypes: many(memberTrxTypeTable, { relationName: relationBetween('memberTrxType and member') }),
  memberTransactions: many(memberTrxTable, { relationName: relationBetween('memberTrx and member') }),
  memberFinanciers: many(memberFinancierTable, { relationName: relationBetween('memberFinancier and member') }),
  memberLoans: many(memberLoanTable, { relationName: relationBetween('memberLoan and member') }),

}))