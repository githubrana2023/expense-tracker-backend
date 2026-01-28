import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";
import { familyMemberTable } from "./member-table";
import { memberTrxTypeTable } from "./member-transaction-type-table";
import { createdAt, relationBetween, updatedAt } from "@/drizzle/schema-helper/utils";
import { relations } from "drizzle-orm";

export const memberTrxTable = pgTable("member_trx", {
    id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
    memberId: uuid("member_id").notNull().references(() => familyMemberTable.id, { onDelete: 'cascade' }),
    memberTrxTypeId: uuid("member_trx_type_id").notNull().references(() => memberTrxTypeTable.id),
    note: varchar("note", { length: 255 }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
});

export const memberTrxTableRelation = relations(memberTrxTable, ({ one, many }) => ({
    member: one(familyMemberTable, {
        fields: [memberTrxTable.memberId],
        references: [familyMemberTable.id],
        relationName:relationBetween('memberTrx and member')
    }),
    memberTrxType:one(memberTrxTypeTable,{
        fields: [memberTrxTable.memberTrxTypeId],
        references: [memberTrxTypeTable.id],
        relationName:relationBetween('memberTrx and memberTrxType')
    })
}))