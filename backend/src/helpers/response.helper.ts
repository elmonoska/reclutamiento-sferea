import { Response } from 'express'

export function sendSuccess<T>(res: Response, statusCode: number, data: T, message: string) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
}

export function sendError(res: Response, statusCode: number, error: string) {
    return res.status(statusCode).json({
        success: false,
        error
    });
}
