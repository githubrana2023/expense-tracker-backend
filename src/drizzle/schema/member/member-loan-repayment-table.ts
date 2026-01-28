import { pgTable, uuid, numeric, timestamp } from "drizzle-orm/pg-core";
import { memberLoanTable } from "./member-loan-table";
import { memberTrxTable } from "./member-transaction-table";
import { amount, createdAt, dateTime, relationBetween, updatedAt } from "@/drizzle/schema-helper/utils";
import { relations } from "drizzle-orm";

export const loanRepaymentTable = pgTable("loan_repayments", {
    id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
    memberLoanId: uuid("member_loan_id").notNull().references(() => memberLoanTable.id, { onDelete: "cascade" }),
    memberTrxId: uuid("member_trx_id").notNull().references(() => memberTrxTable.id, { onDelete: "cascade" }),
    amount: amount('amount'),
    paymentDate: dateTime('loan_payment_date'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
});



export const loanRepaymentTableRelation = relations(loanRepaymentTable, ({ one, many }) => ({
    memberLoan: one(memberLoanTable, {
        fields: [loanRepaymentTable.memberLoanId],
        references: [memberLoanTable.id],
        relationName: relationBetween('loanRepayment and memberLoan')
    }),

    memberLoanRepaymentTrx: one(memberTrxTable, {
        fields: [loanRepaymentTable.memberTrxId],
        references: [memberTrxTable.id],
        relationName: relationBetween('loanRepayment and memberLoanRepaymentTrx')
    }),
}))