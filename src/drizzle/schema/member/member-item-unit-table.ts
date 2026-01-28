
import { pgTable, uuid, text, varchar, boolean } from "drizzle-orm/pg-core";
import { createdAt, relationBetween, updatedAt, amount } from "@/drizzle/schema-helper/utils";
import { relations, Table } from "drizzle-orm";
import { familyMemberTable } from "./member-table";


export const memberPurchaseItemUnit = pgTable(
    "member_purchase_item_unit",
    {
        id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
        memberId: uuid('member_id').notNull().references(() => familyMemberTable.id, { onDelete: 'cascade' }),
        name: varchar("name", { length: 255 }).notNull(),   // Rice, Milk, Oil
        isDeleted: boolean('is_deleted').notNull().default(false),
        createdAt: createdAt(),
        updatedAt: updatedAt(),
    }
);


////TODO: ralation