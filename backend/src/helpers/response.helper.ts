import { Response } from 'express'

type SuccessResponse<T> = {
    success: true;
    message: string;
    data: T | null
}

type ErrorResponse = {
    success: false;
    message: string;
}

export function sendSuccess<T>(res: Response, statusCode: number, message: string, data: T | null = null): Response<SuccessResponse<T>> {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
}

export function sendError(res: Response, statusCode: number, message: string): Response<ErrorResponse> {
    return res.status(statusCode).json({
        success: false,
        message
    });
}

export function normalizeError(err: unknown) {
    return err instanceof Error ? err.message : String(err)
}
