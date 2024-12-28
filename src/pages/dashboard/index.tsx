import ProtectedRoute from "../../components/auth/ProtectedRoute";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Carga dinámica de gráficos (evita problemas de SSR)
const BarChart = dynamic(() => import("../../components/charts/BarChart"), {
  ssr: false,
});
const PieChart = dynamic(() => import("../../components/charts/PieChart"), {
  ssr: false,
});

export default function DashboardHome() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resumen de Métricas */}
          <motion.div
            className="bg-gray-800 text-white rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-yellow-400">Ingresos Totales</h3>
            <p className="text-3xl font-bold mt-2">€1,250.00</p>
          </motion.div>
          <motion.div
            className="bg-gray-800 text-white rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-red-400">Gastos Totales</h3>
            <p className="text-3xl font-bold mt-2">€850.00</p>
          </motion.div>
          <motion.div
            className="bg-gray-800 text-white rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold text-green-400">Balance</h3>
            <p className="text-3xl font-bold mt-2">€400.00</p>
          </motion.div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Gráfico de Barras */}
          <motion.div
            className="bg-gray-800 text-white rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-4">Ingresos y Gastos Mensuales</h3>
            <BarChart />
          </motion.div>

          {/* Gráfico Circular */}
          <motion.div
            className="bg-gray-800 text-white rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4">Distribución de Gastos</h3>
            <PieChart />
          </motion.div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}