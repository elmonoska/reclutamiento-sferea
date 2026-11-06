import axios from "axios";

export function apiErrorHandler(err: unknown): string {
    if (axios.isAxiosError(err)) {
        return err.response?.data?.message || err.message
    }
    if (err instanceof Error) {
        return err.message
    }
    return 'Ocurrio un error inesperado';
}