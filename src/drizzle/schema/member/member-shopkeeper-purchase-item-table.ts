
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { familyMemberTable } from "./member-table";
import { createdAt, relationBetween, updatedAt, amount } from "@/drizzle/schema-helper/utils";
import { relations, Table } from "drizzle-orm";
import { memberShopkeeperTable } from "./member-shopkeeper-table";
import { memberTrxTable } from "./member-transaction-table";
import { memberShopkeeperPurchaseTable } from "./member-shopkeeper-purchase-table";
import { memberPurchaseItemUnit } from "./member-item-unit-table";


export const memberShopkeeperPurchaseItemTable = pgTable(
    "member_shopkeeper_purchase_item",
    {
        id: uuid('id').primaryKey().unique().notNull().defaultRandom(),

        purchaseId: uuid("member_shopkeeper_purchase_id").notNull().references(() => memberShopkeeperPurchaseTable.id, { onDelete: "cascade" }),
        unitId: uuid("member_purchase_item_unit_id").notNull().references(() => memberPurchaseItemUnit.id, { onDelete: "cascade" }),

        name: varchar("name", { length: 255 }).notNull(),   // Rice, Milk, Oil
        quantity: amount("quantity"),
        unitPrice: amount("unit_price"),
        totalPrice: amount("total_price"),

        createdAt: createdAt(),
        updatedAt: updatedAt(),
    }
);

////TODO: ralation