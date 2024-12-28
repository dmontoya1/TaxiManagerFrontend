import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../../services/auth";

export default function LoginForm() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Autenticar al usuario y almacenar el token
      await login(credentials);

      // Redirigir al Dashboard
      router.push("/dashboard");
    } catch (err) {
      // Mostrar mensaje de error
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* Campo de username */}
        <input
          type="text"
          placeholder="Nombre de usuario"
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        {/* Campo de contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full mt-6 bg-yellow-400 text-black p-3 rounded hover:bg-yellow-500 transition font-bold"
      >
        Iniciar Sesión
      </button>

      {/* Mensaje de error */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </form>
  );
}