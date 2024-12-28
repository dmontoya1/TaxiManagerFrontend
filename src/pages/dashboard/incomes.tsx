import ProtectedRoute from "../../components/auth/ProtectedRoute";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import IncomesTable from "../../components/incomes/IncomesTable";

export default function IncomesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Ingresos</h1>
        <IncomesTable />
      </DashboardLayout>
    </ProtectedRoute>
  );
}