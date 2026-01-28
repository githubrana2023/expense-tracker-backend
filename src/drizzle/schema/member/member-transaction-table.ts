import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { familyMemberTable } from "./member-table";
import { memberTrxTypeTable } from "./member-transaction-type-table";
import { createdAt, dateTime, relationBetween, updatedAt } from "@/drizzle/schema-helper/utils";
import { relations } from "drizzle-orm";
import { memberLoanTable } from "./member-loan-table";
import { loanRepaymentTable } from "./member-loan-repayment-table";
import { memberShopkeeperPurchaseTable } from "./member-shopkeeper-purchase-table";

export const memberTrxTable = pgTable("member_trx", {
    id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
    memberId: uuid("member_id").notNull().references(() => familyMemberTable.id, { onDelete: 'cascade' }),
    memberTrxTypeId: uuid("member_trx_type_id").notNull().references(() => memberTrxTypeTable.id),
    titile: text('title').notNull(),
    trxDate: dateTime('trx_date'),
    note: varchar("note", { length: 255 }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
});

export const memberTrxTableRelation = relations(memberTrxTable, ({ one, many }) => ({
    member: one(familyMemberTable, {
        fields: [memberTrxTable.memberId],
        references: [familyMemberTable.id],
        relationName: relationBetween('memberTrx and member')
    }),
    memberTrxType: one(memberTrxTypeTable, {
        fields: [memberTrxTable.memberTrxTypeId],
        references: [memberTrxTypeTable.id],
        relationName: relationBetween('memberTrx and memberTrxType')
    }),



    givenLoans: many(memberLoanTable, { relationName: relationBetween('memberLoan(given) and memberTrx') }),
    takenLoans: many(memberLoanTable, { relationName: relationBetween('memberLoan(taken) and memberTrx') }),
    memberLoanRepayments: many(loanRepaymentTable, { relationName: relationBetween('loanRepayment and memberLoanRepaymentTrx') }),
    memberShopkeeperPurchases: many(memberShopkeeperPurchaseTable, { relationName: relationBetween('memberShopkeeperPurchase and memberTrx') }),
}))