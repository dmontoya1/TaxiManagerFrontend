import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../../services/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("driver" | "boss")[]; // Roles permitidos
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");
    
    const validateToken = async () => {
      if (!token) {
        // Redirigir al login si no hay token
        router.push("/login");
        return;
      }
      
      try {
        // Verificar si el token es válido
        await API.get("/accounts/validate-token/"); // Asegúrate de que este endpoint exista en el backend
        setIsLoading(false);
      } catch (error) {
        // Si el token no es válido, redirigir al login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_role");
        router.push("/login");
        toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      }
    };
    
    validateToken();
  }, [router]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="text-xl font-bold">Cargando...</h1>
      </div>
    );
  }
  
  return <>{children}</>;
}