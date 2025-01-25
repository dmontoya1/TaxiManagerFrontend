import ProtectedRoute from "../../components/auth/ProtectedRoute";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ReportsTable from "../../components/reports/ReportsTable";

export default function ReportsPage() {
  return (
    <ProtectedRoute allowedRoles={["driver", "boss"]}>
      <DashboardLayout>
        <ReportsTable />
      </DashboardLayout>
    </ProtectedRoute>
  );
}