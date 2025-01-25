import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../../services/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("driver" | "boss")[]; // Asegúrate de usar esta prop
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  console.log(allowedRoles);
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    
    const validateToken = async () => {
      if (!token) {
        router.push("/login");
        return;
      }
      
      try {
        await API.get("/accounts/validate-token/");
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("access_token");
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