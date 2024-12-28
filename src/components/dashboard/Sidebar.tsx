import { motion } from "framer-motion";
import Link from "next/link";
import { FiMenu, FiHome, FiDollarSign, FiFileText, FiLogOut } from "react-icons/fi";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
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
          <li>
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
            >
              <FiHome size={20} />
              <motion.span
                initial={{ opacity: isCollapsed ? 0 : 1 }}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className={`ml-4 text-sm font-medium ${
                  isCollapsed && "hidden"
                }`}
              >
                Inicio
              </motion.span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/incomes"
              className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
            >
              <FiDollarSign size={20} />
              <motion.span
                initial={{ opacity: isCollapsed ? 0 : 1 }}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className={`ml-4 text-sm font-medium ${
                  isCollapsed && "hidden"
                }`}
              >
                Ingresos
              </motion.span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/expenses"
              className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
            >
              <FiDollarSign size={20} />
              <motion.span
                initial={{ opacity: isCollapsed ? 0 : 1 }}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className={`ml-4 text-sm font-medium ${
                  isCollapsed && "hidden"
                }`}
              >
                Gastos
              </motion.span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/reports"
              className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
            >
              <FiFileText size={20} />
              <motion.span
                initial={{ opacity: isCollapsed ? 0 : 1 }}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className={`ml-4 text-sm font-medium ${
                  isCollapsed && "hidden"
                }`}
              >
                Reportes
              </motion.span>
            </Link>
          </li>
          <li>
            <Link
              href="/logout"
              className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
            >
              <FiLogOut size={20} />
              <motion.span
                initial={{ opacity: isCollapsed ? 0 : 1 }}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className={`ml-4 text-sm font-medium ${
                  isCollapsed && "hidden"
                }`}
              >
                Cerrar Sesión
              </motion.span>
            </Link>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
}