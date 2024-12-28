import React, { useState, useEffect } from "react";
import { fetchIncomes } from "../../services/incomes";
import IncomeFormModal from "./IncomeFormModal";
import { FiEdit2 } from "react-icons/fi";
import { formatPaymentMethod, formatDate } from "../../utils/format";

interface Income {
  id: number;
  amount: number;
  date: string;
  payment_method: string;
  description: string;
}

export default function IncomesTable() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [methodFilter, setMethodFilter] = useState<string>(""); // Filtro por método
  const [startDateFilter, setStartDateFilter] = useState<string>(""); // Filtro por fecha inicial
  const [endDateFilter, setEndDateFilter] = useState<string>(""); // Filtro por fecha final
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);

  // Fetch los ingresos desde el backend
  useEffect(() => {
    const loadIncomes = async () => {
      const data = await fetchIncomes();
      setIncomes(data);
    };
    loadIncomes();
  }, []);

  // Aplicar filtros combinados
  const filteredIncomes = incomes.filter((income) => {
    const matchesMethod =
      !methodFilter || income.payment_method.includes(methodFilter);

    const matchesDate =
      (!startDateFilter || income.date >= startDateFilter) &&
      (!endDateFilter || income.date <= endDateFilter);

    return matchesMethod && matchesDate;
  });

  // Calcular totales dinámicamente
  const calculateTotals = () => {
    const totalCash = filteredIncomes
      .filter((income) => income.payment_method === "cash")
      .reduce((sum, income) => sum + parseFloat(income.amount), 0);

    const totalCard = filteredIncomes
      .filter((income) => income.payment_method === "card")
      .reduce((sum, income) => sum + parseFloat(income.amount), 0);

    const total = totalCash + totalCard;

    return { totalCash, totalCard, total };
  };

  const { totalCash, totalCard, total } = calculateTotals();

  const handleEdit = (income: Income) => {
    setSelectedIncome(income);
    setIsModalOpen(true);
  };

  const handleIncomeUpdated = (updatedIncome: Income) => {
    setIncomes(
      incomes.map((income) =>
        income.id === updatedIncome.id ? updatedIncome : income
      )
    );
    setIsModalOpen(false);
    setSelectedIncome(null);
  };

  const handleIncomeAdded = (newIncome: Income) => {
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    setIsModalOpen(false);
    setSelectedIncome(null);
  };

  return (
    <div className="p-4 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-4 space-x-4">
        {/* Filtro por método */}
        <select
          className="p-2 bg-gray-800 text-white rounded"
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="cash">Efectivo</option>
          <option value="card">Tarjeta</option>
        </select>

        {/* Filtros por fechas */}
        <input
          type="date"
          className="p-2 bg-gray-800 text-white rounded"
          value={startDateFilter}
          onChange={(e) => setStartDateFilter(e.target.value)}
          placeholder="Desde"
        />
        <input
          type="date"
          className="p-2 bg-gray-800 text-white rounded"
          value={endDateFilter}
          onChange={(e) => setEndDateFilter(e.target.value)}
          placeholder="Hasta"
        />

        {/* Botón para agregar ingreso */}
        <button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedIncome(null);
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
            <th className="p-2">Método de Pago</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredIncomes.map((income) => (
            <tr key={income.id} className="border-b border-gray-700">
              <td className="p-2">{formatDate(income.date)}</td>
              <td className="p-2">
                {isNaN(Number(income.amount))
                  ? "0.00"
                  : Number(income.amount).toFixed(2)}
              </td>
              <td className="p-2 capitalize">
                {formatPaymentMethod(income.payment_method)}
              </td>
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
        <tfoot className="bg-gray-800">
          <tr>
            <td className="p-2 font-bold text-yellow-400" colSpan={5}>
              Total Efectivo: €{totalCash.toFixed(2)} | Total Tarjeta: €
              {totalCard.toFixed(2)} | Total General: €{total.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Modal para editar o agregar ingreso */}
      {isModalOpen && (
        <IncomeFormModal
          income={selectedIncome}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedIncome(null);
          }}
          onIncomeUpdated={handleIncomeUpdated}
          onIncomeAdded={handleIncomeAdded}
        />
      )}
    </div>
  );
}