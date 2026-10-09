import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import type { TSignupForm } from "../../types";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignupPage() {

    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<TSignupForm>();

    const crearCuenta = (datos: TSignupForm) => {
        console.log(datos);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* encabezado */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Crear cuenta
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Crea tu cuenta para comenzar
                    </p>
                </div>

                {/* formulario */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-8">

                    <form
                        onSubmit={handleSubmit(crearCuenta)}
                        className="space-y-5"
                    >

                        {/* nombre */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Nombre
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="Ej. Juan Perez"
                                {...register("name", {
                                    required: "El nombre es obligatorio"
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

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
                                    type={mostrarContrasena ? "text" : "password"}
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
                                    onClick={() => setMostrarContrasena(!mostrarContrasena)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition"
                                    aria-label={
                                        mostrarContrasena
                                            ? "Ocultar contraseña"
                                            : "Mostrar contraseña"
                                    }
                                >
                                    {mostrarContrasena ? (
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

                        {/* confirmar contraseña */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Confirmar contraseña
                            </label>

                            <div className="relative">

                                <input
                                    id="confirmPassword"
                                    type={mostrarConfirmacion ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("confirmPassword", {
                                        required: "Confirma tu contraseña",
                                        validate: (valor) =>
                                            valor === getValues("password") ||
                                            "Las contraseñas no coinciden"
                                    })}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />

                                <button
                                    type="button"
                                    onClick={() => setMostrarConfirmacion(!mostrarConfirmacion)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition"
                                    aria-label={
                                        mostrarConfirmacion
                                            ? "Ocultar contraseña"
                                            : "Mostrar contraseña"
                                    }
                                >
                                    {mostrarConfirmacion ? (
                                        <FiEyeOff size={20} />
                                    ) : (
                                        <FiEye size={20} />
                                    )}
                                </button>

                            </div>

                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* boton crear cuenta */}
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-sm"
                        >
                            Crear cuenta
                        </button>

                    </form>

                    {/* iniciar sesion */}
                    <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500">
                            ¿Ya tienes una cuenta?
                        </p>

                        <Link
                            to="/auth/iniciar-sesion"
                            className="mt-1 inline-block text-sm font-semibold text-orange-500 hover:text-orange-600 transition"
                        >
                            Iniciar sesión
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}