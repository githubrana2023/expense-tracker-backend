import { JwtPayload } from "jsonwebtoken"

export type AppType = {
    Variables:{
        user:JwtPayload
    }
}