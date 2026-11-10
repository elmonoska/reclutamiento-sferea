import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { resetPassword } from "../../api/auth";
import type { TResetPasswordForm } from "../../types/forms";

const initialValues: TResetPasswordForm = {
    password: '',
    confirm_password: '',
    token: '',
};

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { uuidUser } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isValid }
    } = useForm<TResetPasswordForm>({defaultValues: initialValues, mode: 'onChange'});

    const sendForm = async (dataForm: TResetPasswordForm) => {
        const { password, confirm_password, token } = dataForm;
        const payload = {
            password,
            confirm_password,
            token,
            uuid_user: uuidUser ?? '',
        };

        const res = await resetPassword(payload);
        if (!res.success) {
            toast.error(res.message);
            return;
        }

        toast.success(res.message);
        navigate('/auth/iniciar-sesion');
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* encabezado */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Restablecer contraseña
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Ingresa tu nuevo token y una nueva contraseña
                    </p>
                </div>

                {/* formulario */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-8">

                    <form
                        onSubmit={handleSubmit(sendForm)}
                        className="space-y-5"
                    >

                        {/* token */}
                        <div>
                            <label
                                htmlFor="token"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Token
                            </label>

                            <input
                                id="token"
                                type="text"
                                inputMode="numeric"
                                placeholder="Ej. 123456"
                                {...register("token", {
                                    required: "El token es obligatorio",
                                    pattern: {
                                        value: /^\d{6}$/,
                                        message: "Token invalido"
                                    }
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />

                            {errors.token && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.token.message}
                                </p>
                            )}
                        </div>

                        {/* nueva contraseña */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Nueva contraseña
                            </label>

                            <div className="relative">

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ej. juan.perez"
                                    {...register("password", {
                                        required: "La contraseña es obligatoria",
                                        minLength: {
                                            value: 6,
                                            message: "La contraseña debe tener al menos 6 caracteres"
                                        }
                                    })}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* confirmar contraseña */}
                        <div>
                            <label
                                htmlFor="confirm_password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Confirmar contraseña
                            </label>

                            <div className="relative">

                                <input
                                    id="confirm_password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ej. juan.perez"
                                    {...register("confirm_password", {
                                        required: "Confirma tu contraseña",
                                        validate: (valor) =>
                                            valor === getValues("password") ||
                                            "Las contraseñas no coinciden"
                                    })}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>

                            {errors.confirm_password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.confirm_password.message}
                                </p>
                            )}
                        </div>

                        {/* boton restablecer */}
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-sm cursor-pointer disabled:bg-orange-200 disabled:cursor-not-allowed disabled:text-white"
                        >
                            Restablecer contraseña
                        </button>

                    </form>

                </div>

            </div>
        </div>
    );
}
