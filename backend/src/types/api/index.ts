export type TApiResponse<T = any> = {
    success: boolean;
    message?: string;
    error?: string;
    data?: T;
}