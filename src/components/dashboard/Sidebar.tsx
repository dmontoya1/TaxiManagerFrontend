import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiMenu, FiHome, FiDollarSign, FiFileText, FiLogOut, FiSettings } from "react-icons/fi";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const router = useRouter();

  const menuItems = [
    { name: "Inicio", path: "/dashboard", icon: <FiHome size={20} /> },
    { name: "Ingresos", path: "/dashboard/incomes", icon: <FiDollarSign size={20} /> },
    { name: "Gastos", path: "/dashboard/expenses", icon: <FiDollarSign size={20} /> },
    { name: "Reportes", path: "/dashboard/reports", icon: <FiFileText size={20} /> },
    { name: "Configuración", path: "/dashboard/config", icon: <FiSettings size={20} /> },
    { name: "Cerrar Sesión", path: "/logout", icon: <FiLogOut size={20} /> },
  ];

  return (
    <motion.div
      initial={{ width: isCollapsed ? "4rem" : "16rem" }}
      animate={{ width: isCollapsed ? "4rem" : "16rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-gray-800 text-gray-300 fixed top-0 left-0 z-50"
    >
      {/* Botón de Colapsar */}
      <div className="flex items-center justify-between p-4 text-yellow-400">
        <motion.div
          initial={{ opacity: isCollapsed ? 0 : 1 }}
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className={`text-2xl font-bold whitespace-nowrap overflow-hidden ${
            isCollapsed && "hidden"
          }`}
        >
          Taxi España
        </motion.div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Navegación */}
      <nav className="mt-6">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path}>
                <div
                  className={`flex items-center px-4 py-2 rounded transition-colors cursor-pointer ${
                    router.pathname === item.path
                      ? "bg-gray-700 text-white"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {item.icon}
                  <motion.span
                    initial={{ opacity: isCollapsed ? 0 : 1 }}
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className={`ml-4 text-sm font-medium ${
                      isCollapsed && "hidden"
                    }`}
                  >
                    {item.name}
                  </motion.span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}