import { TokenKey } from "@/types/token";
import { AppError, TokenExpiredError, TokenIssuedAtError } from "../utils";
import { JsonWebTokenError, JwtPayload, verify } from "jsonwebtoken";
import envConfig from "@/config/envConfig";

export const verifyToken = ({ token, secret = 'ACCESS_TOKEN_SECRET' }: { token: string; secret?: TokenKey }) => {
    try {
        const now = Math.floor(Date.now() / 1000)

        const payload = verify(token, envConfig[secret]) as JwtPayload

        if (payload.iat && payload.iat > now) {
            throw new TokenIssuedAtError();
        }

        return payload

    } catch (error) {
        if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) throw new AppError(401, error.message);
        throw error;
    }
}