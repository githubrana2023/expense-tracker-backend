import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { familyMemberTable } from "./member-table";
import { createdAt, relationBetween, updatedAt, amount } from "@/drizzle/schema-helper/utils";
import { relations, Table } from "drizzle-orm";
import { memberShopkeeperTable } from "./member-shopkeeper-table";
import { memberTrxTable } from "./member-transaction-table";

export const memberShopkeeperPurchaseTable = pgTable("member_shopkeeper_purchase", {
  id: uuid('id').primaryKey().unique().notNull().defaultRandom(),

  memberShopkeeperId: uuid("member_shopkeeper_id").notNull().references(() => memberShopkeeperTable.id, { onDelete: "cascade" }),
  memberId: uuid("member_id").notNull().references(() => familyMemberTable.id, { onDelete: "cascade" }),
  memberPurchaseTrxId: uuid("member_purchase_trx_id").notNull().references(() => memberTrxTable.id, { onDelete: "cascade" }),

  totalAmount: amount('amount'),
  note: text("note"),

  createdAt: createdAt(),
  updateAt: updatedAt(),
});

export const memberShopkeeperPurchaseTableRelation = relations(memberShopkeeperPurchaseTable, ({ one, many }) => ({
  memberShopkeeper: one(memberShopkeeperTable, {
    fields: [memberShopkeeperPurchaseTable.memberShopkeeperId],
    references: [memberShopkeeperTable.id],
    relationName: relationBetween('memberShopkeeperPurchase and memberShopkeeper')
  }),

  member: one(familyMemberTable, {
    fields: [memberShopkeeperPurchaseTable.memberId],
    references: [familyMemberTable.id],
    relationName: relationBetween('memberShopkeeperPurchase and member')
  }),
  memberPurchaseTrx: one(memberTrxTable, {
    fields: [memberShopkeeperPurchaseTable.memberPurchaseTrxId],
    references: [memberTrxTable.id],
    relationName: relationBetween('memberShopkeeperPurchase and memberTrx')
  }),

}))