import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type { TLoginForm } from "../../types/forms";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { login } from "../../api/auth";
import { toast } from "react-toastify";

const initialValues: TLoginForm = {
    email: '',
    password: ''
};

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<TLoginForm>({defaultValues: initialValues, mode: 'onChange'});

    const sendForm = async (dataForm: TLoginForm) => {
        const res = await login(dataForm);
        if (!res.success) {
            toast.error(res.message);
            return;
        }

        toast.success(res.message);
        localStorage.setItem('token', res.data.token);
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* encabezado */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Iniciar sesión
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Ingresa a tu cuenta para continuar
                    </p>
                </div>

                {/* formulario */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-8">

                    <form
                        onSubmit={handleSubmit(sendForm)}
                        className="space-y-5"
                    >

                        {/* correo */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Correo electrónico
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Ej. juan.perez@correo.com"
                                {...register("email", {
                                    required: "El correo electrónico es obligatorio",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Ingresa un correo electrónico válido"
                                    }
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* contraseña */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Contraseña
                            </label>

                            <div className="relative">

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
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
                                    aria-label={
                                        showPassword
                                            ? "Ocultar contraseña"
                                            : "Mostrar contraseña"
                                    }
                                >
                                    {showPassword ? (
                                        <FiEyeOff size={20} />
                                    ) : (
                                        <FiEye size={20} />
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* recuperar contraseña */}
                        <div className="flex justify-end">
                            <Link
                                to="/auth/olvide-contrasena"
                                className="text-sm font-medium text-orange-500 hover:text-orange-600 transition"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        {/* boton iniciar sesion */}
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-sm cursor-pointer disabled:bg-orange-200 disabled:cursor-not-allowed disabled:text-white"
                        >
                            Iniciar sesión
                        </button>

                    </form>

                    {/* crear cuenta */}
                    <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500">
                            ¿No tienes una cuenta?
                        </p>

                        <Link
                            to="/auth/crear-cuenta"
                            className="mt-1 inline-block text-sm font-semibold text-orange-500 hover:text-orange-600 transition"
                        >
                            Crear una cuenta
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}