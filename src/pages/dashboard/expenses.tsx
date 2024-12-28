import ProtectedRoute from "../../components/auth/ProtectedRoute";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ExpensesTable from "../../components/expenses/ExpensesTable";

export default function ExpensesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Gastos</h1>
        <ExpensesTable />
      </DashboardLayout>
    </ProtectedRoute>
  );
}