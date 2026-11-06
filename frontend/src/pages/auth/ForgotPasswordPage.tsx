import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { forgotPassword } from "../../api/auth";
import type { TForgotPasswordForm } from "../../types/forms";

const initialValues: TForgotPasswordForm = {
    email: '',
};

export default function ForgotPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm<TForgotPasswordForm>({defaultValues: initialValues, mode: 'onChange'});

    const sendForm = async (dataForm: TForgotPasswordForm) => {
        const res = await forgotPassword(dataForm);
        if (!res.success) {
            toast.error(res.message);
            return;
        }

        toast.success(res.message);
        reset()
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* encabezado */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Recuperar contraseña
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Ingresa tu correo electrónico para recibir un enlace de recuperación
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

                        {/* boton enviar enlace */}
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-sm cursor-pointer disabled:bg-orange-200 disabled:cursor-not-allowed disabled:text-white"
                        >
                            Enviar enlace
                        </button>

                    </form>

                </div>

            </div>
        </div>
    );
}
