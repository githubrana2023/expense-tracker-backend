import { numeric, timestamp } from "drizzle-orm/pg-core";

export const createdAt = (name:string='createdAt')=>timestamp(name, { withTimezone: true }).defaultNow().notNull()
export const updatedAt = (name:string='updatedAt')=>timestamp(name, { withTimezone: true }).defaultNow().notNull().$onUpdateFn(() => new Date())
export const dateTime = (name: string) => timestamp(name, { withTimezone: true }).notNull()
export const amount = (name: string, precision: number = 7, scale: number = 2) => numeric(name, { precision, scale, mode: "number" }).notNull()

export const relationBetween = (tablesName:`${string} and ${string}`) => {
    const spliter = ' and '
    const [firstTable,secondTable]=tablesName.split(spliter)
    
    return `relation_between_${firstTable}_table_and_${secondTable}_table`
}



export const transactionEntriesType = ['DEBIT','CREDIT'] as const