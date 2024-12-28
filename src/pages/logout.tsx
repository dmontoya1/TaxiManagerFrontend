import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Eliminar el token del almacenamiento
    localStorage.removeItem("access_token");

    // Redirigir al usuario al login
    router.push("/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <h1 className="text-2xl font-bold text-yellow-400">Cerrando sesión...</h1>
    </div>
  );
}