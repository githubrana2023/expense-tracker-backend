import 'jsonwebtoken'

declare module "jsonwebtoken" {
    export interface JwtPayload {
        id:string;
        email:string;
        phone:string;
    }
}