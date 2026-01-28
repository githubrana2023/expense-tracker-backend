import { AppError } from "@/libs/utils";
import { AppType } from "@/types/app-type";
import { ErrorHandler } from "hono";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";

export const globalErrorHandler:ErrorHandler<AppType> =async (error,c)=>{

  console.error({
    from:"global error handler",
    error
  })

     // ZOD ERROR
  if (error instanceof ZodError) {
    return c.json({
      message: error.issues.map(iss => iss.message),
      custom: 422,
      error
    }, 400)
  }

  // JWT ERROR
  if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
    return c.json({ error, from: 'global JWT' }, 401)
  }


  // APP ERROR
  if (error instanceof AppError) {
    const statusCode = error.statusCode
    return c.json({ message: error.message, from: 'global APP INSTANCE' }, 401)
  }

  //UNEXPECTED ERROR
  return c.json({ message: error.message, from: 'global error' }, 500)
}