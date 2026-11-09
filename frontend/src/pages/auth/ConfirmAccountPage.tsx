import { useState, type FormEvent } from "react";
import { OTPInput} from "input-otp";
import Slot from "./components/Slot";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { confirmAccount } from "../../api/auth";

export default function ConfirmAccountPage() {
    const [code, setCode] = useState("");
    const { uuidUser } =  useParams();
    const navigate = useNavigate();

    const handleComplete = async (value: string) => {
        const uuid_user = uuidUser ?? '';
        const dataForm = {token: value, uuid_user};
        
        const res = await confirmAccount(dataForm);
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        navigate('/auth/iniciar-sesion');
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* encabezado */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Confirmar cuenta
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Ingresa el código de confirmación enviado a tu correo electrónico
                    </p>
                </div>

                {/* formulario */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* código de confirmación */}
                        <div className="flex flex-col items-center">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Código de confirmación
                            </label>

                            <OTPInput
                                maxLength={6}
                                value={code}
                                onChange={(newValue) => setCode(newValue)}
                                onComplete={handleComplete}
                                autoComplete="one-time-code"
                                containerClassName="flex items-center justify-center gap-2"
                                render={({ slots }) => (
                                    <div className="flex gap-2">
                                        {slots.map((slot, index) => (
                                            <Slot key={index} {...slot} />
                                        ))}
                                    </div>
                                )}
                            />
                        </div>

                        {/* boton confirmar */}
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-sm"
                        >
                            Confirmar cuenta
                        </button>

                    </form>

                </div>

            </div>
        </div>
    );
}