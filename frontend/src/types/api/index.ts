type SuccessResponse<T> = {
    success: true;
    message: string;
    data: T;
}

type ErrorResponse = {
    success: false;
    message: string;
}

export type TApiResponse<T = null> = SuccessResponse<T> | ErrorResponse;

export type TApiResponseLogin = {
    token: string;
}