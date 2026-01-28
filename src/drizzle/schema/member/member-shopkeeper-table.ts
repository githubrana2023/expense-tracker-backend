import { pgTable, uuid, varchar, boolean } from "drizzle-orm/pg-core";
import { familyMemberTable } from "./member-table";
import { createdAt, relationBetween, updatedAt } from "@/drizzle/schema-helper/utils";
import { relations } from "drizzle-orm";
import { memberShopkeeperPurchaseTable } from "./member-shopkeeper-purchase-table";

export const memberShopkeeperTable = pgTable("member_shopkeeper", {
    id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
    memberId: uuid("member_id").notNull().references(() => familyMemberTable.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    isBlock: boolean('is_block').notNull().default(false),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
});




export const memberShopkeeperTableRelation = relations(memberShopkeeperTable, ({ one, many }) => ({
    member: one(familyMemberTable, {
        fields: [memberShopkeeperTable.memberId],
        references: [familyMemberTable.id],
        relationName: relationBetween('memberShopkeeper and member')
    }),




    memberShopkeeperPurchase: many(memberShopkeeperPurchaseTable, { relationName: relationBetween('memberShopkeeperPurchase and memberShopkeeper') })
}))
