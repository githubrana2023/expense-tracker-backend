import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, relationBetween, updatedAt } from "@/drizzle/schema-helper/utils"
import { relations } from "drizzle-orm";
import { familyMemberTable } from "../member/member-table";


/* ======================================================
    FAMILY TABLE
====================================================== */
export const familyTable = pgTable('family', {
    id: uuid('id').primaryKey().unique().notNull().defaultRandom(),
    name: varchar('last_name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    password: text('password').notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt()
})

/* ======================================================
    FAMILY TABLE RELATIONS
====================================================== */
export const familyTableRelation = relations(familyTable, ({ one, many }) => ({
    members: many(familyMemberTable, { relationName: relationBetween('familyMember and family') })
}))