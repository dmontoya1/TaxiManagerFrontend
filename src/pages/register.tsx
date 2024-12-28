import Link from "next/link";
import RegisterForm from "../components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-4">
          Regístrate
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Crea tu cuenta para comenzar a gestionar tus ingresos y gastos.
        </p>

        {/* Formulario */}
        <RegisterForm />

        {/* Iniciar sesión */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-400 underline transition"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-300 underline transition"
          >
            Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}