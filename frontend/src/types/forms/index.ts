// formularios de autenticacion
export type TAuthForm = {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    token: string;
    uuid_user: string;
}
export type TLoginForm = Pick<TAuthForm, 'email' | 'password'>;
export type TSignupForm = Pick<TAuthForm, 'name' | 'email' | 'password' | 'confirm_password'>;
export type TConfirmAccountForm = Pick<TAuthForm, 'uuid_user' | 'token'>;
export type TForgotPasswordForm = Pick<TAuthForm, 'email'>;
export type TResetPasswordForm = Pick<TAuthForm, 'password' | 'confirm_password' | 'token'>;
