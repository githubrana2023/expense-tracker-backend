




import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  numeric,
  pgEnum,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

/* ======================================================
   ENUMS
====================================================== */

export const familyRoleEnum = pgEnum("family_role", ["OWNER", "MEMBER"]);

export const bankAccountTypeEnum = pgEnum("bank_account_type", [
  "CASH",
  "BANK",
  "MOBILE",
]);

export const transactionTypeEnum = pgEnum("transaction_type", [
  "EXPENSE",
  "INCOME",
  "LOAN_TAKEN",
  "LOAN_GIVEN",
  "LOAN_REPAYMENT",
  "SHOPKEEPER_PAYMENT",
  "TRANSFER",
  "DEPOSIT",
  "WITHDRAWAL",
]);

export const entryTypeEnum = pgEnum("entry_type", ["DEBIT", "CREDIT"]);

export const payLaterStatusEnum = pgEnum("pay_later_status", ["DUE", "PAID"]);

export const loanStatusEnum = pgEnum("loan_status", ["ONGOING", "PAID"]);

export const loanDirectionEnum = pgEnum("loan_direction", ["TAKEN", "GIVEN"]);

/* ======================================================
   USERS
====================================================== */

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ======================================================
   FAMILY
====================================================== */

export const families = pgTable("families", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});



/* ======================================================
   CENTRAL LEDGER (Transactions)
====================================================== */

export const transactions = pgTable(
  "transactions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    familyMemberId: uuid("family_member_id")
      .notNull()
      .references(() => familyMembers.id, { onDelete: "cascade" }),
    type: transactionTypeEnum("type").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    familyIdx: index("transaction_family_idx").on(t.familyMemberId),
  })
);

export const transactionEntries = pgTable(
  "transaction_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    transactionId: uuid("transaction_id")
      .notNull()
      .references(() => transactions.id, { onDelete: "cascade" }),
    bankAccountId: uuid("bank_account_id")
      .notNull()
      .references(() => bankAccounts.id),
    type: entryTypeEnum("type").notNull(), // DEBIT | CREDIT
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    txIdx: index("transaction_entry_tx_idx").on(t.transactionId),
    bankIdx: index("transaction_entry_bank_idx").on(t.bankAccountId),
  })
);

/* ======================================================
   EXPENSES
====================================================== */

export const expenses = pgTable("expenses", {
  id: uuid("id").defaultRandom().primaryKey(),
  familyMemberId: uuid("family_member_id")
    .notNull()
    .references(() => familyMembers.id, { onDelete: "cascade" }),
  transactionId: uuid("transaction_id")
    .notNull()
    .references(() => transactions.id, { onDelete: "cascade" }),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ======================================================
   INCOMES
====================================================== */

export const incomes = pgTable("incomes", {
  id: uuid("id").defaultRandom().primaryKey(),
  familyMemberId: uuid("family_member_id")
    .notNull()
    .references(() => familyMembers.id, { onDelete: "cascade" }),
  transactionId: uuid("transaction_id")
    .notNull()
    .references(() => transactions.id, { onDelete: "cascade" }),
  source: varchar("source", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ======================================================
   FINANCIERS
====================================================== */

export const financiers = pgTable("financiers", {
  id: uuid("id").defaultRandom().primaryKey(),
  familyMemberId: uuid("family_member_id")
    .notNull()
    .references(() => familyMembers.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ======================================================
   LOANS
====================================================== */

export const loans = pgTable("loans", {
  id: uuid("id").defaultRandom().primaryKey(),
  financierId: uuid("financier_id")
    .notNull()
    .references(() => financiers.id, { onDelete: "cascade" }),
  familyMemberId: uuid("family_member_id")
    .notNull()
    .references(() => familyMembers.id, { onDelete: "cascade" }),
  direction: loanDirectionEnum("direction").notNull(), // TAKEN | GIVEN
  principalAmount: numeric("principal_amount", { precision: 14, scale: 2 }).notNull(),
  takenTransactionId: uuid("taken_transaction_id")
    .notNull()
    .references(() => transactions.id),
  status: loanStatusEnum("status").default("ONGOING").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ======================================================
   LOAN REPAYMENTS
====================================================== */

export const loanRepayments = pgTable("loan_repayments", {
  id: uuid("id").defaultRandom().primaryKey(),
  loanId: uuid("loan_id")
    .notNull()
    .references(() => loans.id, { onDelete: "cascade" }),
  transactionId: uuid("transaction_id")
    .notNull()
    .references(() => transactions.id),
  amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ======================================================
   SHOPKEEPERS
====================================================== */

export const shopkeepers = pgTable("shopkeepers", {
  id: uuid("id").defaultRandom().primaryKey(),
  familyMemberId: uuid("family_member_id")
    .notNull()
    .references(() => familyMembers.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ======================================================
   PAY-LATER TRANSACTIONS
====================================================== */

export const payLaterTransactions = pgTable("pay_later_transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  shopkeeperId: uuid("shopkeeper_id")
    .notNull()
    .references(() => shopkeepers.id, { onDelete: "cascade" }),
  familyMemberId: uuid("family_member_id")
    .notNull()
    .references(() => familyMembers.id, { onDelete: "cascade" }),
  transactionId: uuid("transaction_id")
    .references(() => transactions.id),
  status: payLaterStatusEnum("status").default("DUE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});