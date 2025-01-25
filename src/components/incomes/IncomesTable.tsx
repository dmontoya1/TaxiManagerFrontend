import React, { useState, useEffect, useCallback } from "react";
import { fetchIncomes } from "../../services/incomes";
import IncomeFormModal from "./IncomeFormModal";
import { FiEdit2 } from "react-icons/fi";
import { formatPaymentMethod, formatDate } from "../../utils/format";

interface Income {
  id: number;
  amount: string;
  date: string;
  payment_method: string;
  description: string;
}

export default function IncomesTable() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | undefined>(undefined);

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize] = useState<number>(10);
  
  const loadIncomes = useCallback(async (page: number) => {
    const data = await fetchIncomes({ page, page_size: pageSize });
    setIncomes(data.results);
    setTotalItems(data.count);
  }, [pageSize]);
  
  useEffect(() => {
    loadIncomes(currentPage);
  }, [currentPage, loadIncomes]);

  const handleEdit = (income: Income) => {
    setSelectedIncome(income);
    setIsModalOpen(true);
  };

  const handleIncomeUpdated = (updatedIncome: Income) => {
    setIncomes((prev) =>
      prev.map((income) =>
        income.id === updatedIncome.id ? updatedIncome : income
      )
    );
    setIsModalOpen(false);
    setSelectedIncome(undefined);
  };

  const handleIncomeAdded = () => {
    loadIncomes(currentPage); // Recargar la página actual
    setIsModalOpen(false);
    setSelectedIncome(undefined);
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="p-4 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-4">
        {/* Filtro */}
        <select
          className="p-2 bg-gray-800 text-white rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="cash">Efectivo</option>
          <option value="card">Tarjeta</option>
        </select>

        {/* Botón para agregar ingreso */}
        <button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedIncome(undefined);
          }}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
        >
          Crear Ingreso
        </button>
      </div>

      {/* Tabla */}
      <table className="w-full text-left bg-gray-800 rounded">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">Fecha</th>
            <th className="p-2">Cantidad (€)</th>
            <th className="p-2">Método</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income) => (
            <tr key={income.id} className="border-b border-gray-700">
              <td className="p-2">{formatDate(income.date)}</td>
              <td className="p-2">{Number(income.amount).toFixed(2)}</td>
              <td className="p-2 capitalize">{formatPaymentMethod(income.payment_method)}</td>
              <td className="p-2">{income.description}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(income)}>
                  <FiEdit2
                    className="text-yellow-400 hover:text-yellow-300"
                    size={20}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 bg-gray-700 text-white rounded ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className={`px-4 py-2 bg-gray-700 text-white rounded ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>

      {/* Modal para editar o agregar ingreso */}
      {isModalOpen && (
        <IncomeFormModal
          income={selectedIncome}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedIncome(undefined);
          }}
          onIncomeUpdated={handleIncomeUpdated}
          onIncomeAdded={handleIncomeAdded}
        />
      )}
    </div>
  );
}