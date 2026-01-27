
export class AppError extends Error {
    public statusCode: number

    constructor(statusCode: number, message: string, stack: string = "") {
        super(message)
        this.statusCode = statusCode
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export class TokenExpiredError extends AppError {
    constructor() {
        super(401, 'Token Expired!')
    }
}

export class InvalidTokenError extends AppError {
    constructor() {
        super(401, 'Invalid Token!')
    }
}

export class TokenIssuedAtError extends AppError {
    constructor() {
        super(401, 'Invalid token issued time!')
    }
}