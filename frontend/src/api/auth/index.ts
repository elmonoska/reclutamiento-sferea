import api from "../../lib/axios";
import type { TApiResponse, TApiResponseLogin } from "../../types/api";
import type { TLoginForm, TSignupForm, TForgotPasswordForm, TResetPasswordForm, TConfirmAccountForm } from "../../types/forms";
import { apiErrorHandler } from "../../utils/apiErrorHandler";

export async function createAccount(dataForm: TSignupForm): Promise<TApiResponse> {
    try {
        const { data } = await api.post('/auth/create-account', dataForm)
        return data;
    } catch (err) {
        return { success: false, message: apiErrorHandler(err)};
    }
}

export async function confirmAccount(dataForm: TConfirmAccountForm): Promise<TApiResponse> {
    try {
        const {data} = await api.post('/auth/confirm-account', {...dataForm});
        return data;
    } catch (err) {
        return { success: false, message: apiErrorHandler(err) };
    }
}

export async function login(dataForm: TLoginForm): Promise<TApiResponse<TApiResponseLogin>> {
    try {
        const { data } = await api.post('/auth/login', dataForm);
        return data;
    } catch (err) {
        return { success: false, message: apiErrorHandler(err) };
    }
}

export async function forgotPassword(dataForm: TForgotPasswordForm): Promise<TApiResponse> {
    try {
        const { data } = await api.post('/auth/forgot-password', dataForm);
        return data;
    } catch (err) {
        return { success: false, message: apiErrorHandler(err) };
    }
}

export async function resetPassword(dataForm: TResetPasswordForm & { uuid_user: string }): Promise<TApiResponse> {
    try {
        const { data } = await api.post('/auth/reset-password', dataForm);
        return data;
    } catch (err) {
        return { success: false, message: apiErrorHandler(err) };
    }
}