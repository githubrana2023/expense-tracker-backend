import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { familyMemberTable } from "./member-table";
import { amount, createdAt, dateTime, loanDirection, loanStatus, relationBetween, updatedAt } from "@/drizzle/schema-helper/utils";
import { relations } from "drizzle-orm";
import { memberFinancierTable } from "./member-financier-table";
import { memberTrxTable } from "./member-transaction-table";
import { loanRepaymentTable } from "./member-loan-repayment-table";

export const memberLoanTable = pgTable("member_loans", {
    id: uuid('id').primaryKey().unique().notNull().defaultRandom(),

    memberFinancierId: uuid("member_financier_id").notNull().references(() => memberFinancierTable.id, { onDelete: "cascade" }),
    memberId: uuid("member_id").notNull().references(() => familyMemberTable.id, { onDelete: "cascade" }),
    direction: text('loan_direction', { enum: loanDirection }).notNull(),
    principalAmount: amount("principal_amount"),
    loanDate: dateTime('loan_date'),
        takenTransactionId: uuid("taken_member_trx_id")
        .references(() => memberTrxTable.id), // nullable for GIVEN
    givenTransactionId: uuid("given_member_trx_id")
        .references(() => memberTrxTable.id), // nullable for TAKEN

    status: text('loan_status', { enum: loanStatus }).default("ONGOING").notNull(),

    createdAt: createdAt(),
    updatedAt: updatedAt(),
});


export const memberLoanTableRelation = relations(memberLoanTable, ({ one, many }) => ({
    memberFinancier: one(memberFinancierTable, {
        fields: [memberLoanTable.memberFinancierId],
        references: [memberFinancierTable.id],
        relationName: relationBetween('memberLoan and memberFinancier')
    }),

    member: one(familyMemberTable, {
        fields: [memberLoanTable.memberId],
        references: [familyMemberTable.id],
        relationName: relationBetween('memberLoan and member')
    }),

    givenLoanTrx: one(memberTrxTable, {
        fields: [memberLoanTable.givenTransactionId],
        references: [memberTrxTable.id],
        relationName: relationBetween('memberLoan(given) and memberTrx')
    }),

    takenLoanTrx: one(memberTrxTable, {
        fields: [memberLoanTable.takenTransactionId],
        references: [memberTrxTable.id],
        relationName: relationBetween('memberLoan(taken) and memberTrx')
    }),





    memberLoanRepayments: many(loanRepaymentTable, { relationName: relationBetween('loanRepayment and memberLoan') })
}))