import Link from "next/link";
import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-4">
          Inicia Sesión
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Accede a tu cuenta para gestionar tus ingresos y gastos.
        </p>

        {/* Formulario */}
        <LoginForm />

        {/* Registro */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-400 underline transition"
            >
              Regístrate aquí
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