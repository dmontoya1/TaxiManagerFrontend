import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      // Redirigir al login si no hay token
      router.push("/login");
    } else {
      // Si hay token, permitir el acceso
      setIsLoading(false);
    }
  }, [router]);

  // Mostrar un indicador de carga mientras se valida el acceso
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="text-xl font-bold">Cargando...</h1>
      </div>
    );
  }

  return <>{children}</>;
}