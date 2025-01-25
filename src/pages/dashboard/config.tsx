import ProtectedRoute from "../../components/auth/ProtectedRoute";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import PaymentConfigForm from "../../components/config/PaymentConfigForm";

export default function ConfigPage() {
  return (
    <ProtectedRoute allowedRoles={["boss"]}> {/* Solo el jefe puede acceder */}
      <DashboardLayout>
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Configuración de pago</h1>
        <PaymentConfigForm />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
