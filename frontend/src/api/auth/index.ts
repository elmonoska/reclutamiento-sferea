import api from "../../lib/axios";
import type { TLoginForm, TSignupForm } from "../../types";
import { apiErrorHandler } from "../../utils/apiErrorHandler";

export async function createAccount(dataForm: TSignupForm) {
    try {
        const { data } = await api.post('/auth/create-account', dataForm)
        return data;
    } catch (err) {
        return { success: false, error: apiErrorHandler(err)};
    }
}

export async function confirmAcconut(token: string, uuidUser: string) {
    try {
        const {data} = await api.post('/auth/confirm-account', {token, uuid_user: uuidUser});
        return data;
    } catch (err) {
        return { success: false, error: apiErrorHandler(err) };
    }
}

export async function login(dataForm: TLoginForm) {
    try {
        const { data } = await api.post('/auth/login', dataForm);
        return data;
    } catch (err) {
        return { success: false, error: apiErrorHandler(err) };
    }
}