import React, { useState, useEffect } from "react";
import { fetchExpenses } from "../../services/expenses";
import ExpenseFormModal from "./ExpenseFormModal";
import { FiEdit2 } from "react-icons/fi";
import { formatDate } from "../../utils/format";

interface Expense {
  id: number;
  amount: number;
  date: string;
  category: string;
  description: string;
}

export default function ExpensesTable() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>(""); // Filtro por categoría
  const [startDateFilter, setStartDateFilter] = useState<string>(""); // Filtro por fecha inicial
  const [endDateFilter, setEndDateFilter] = useState<string>(""); // Filtro por fecha final
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  // Fetch los gastos desde el backend
  useEffect(() => {
    const loadExpenses = async () => {
      const data = await fetchExpenses();
      setExpenses(data);
    };
    loadExpenses();
  }, []);

  // Aplicar filtros combinados
  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      !categoryFilter || expense.category.includes(categoryFilter);

    const matchesDate =
      (!startDateFilter || expense.date >= startDateFilter) &&
      (!endDateFilter || expense.date <= endDateFilter);

    return matchesCategory && matchesDate;
  });

  // Calcular totales dinámicamente
  const calculateTotals = () => {
    const total = filteredExpenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount),
      0
    );

    return { total };
  };

  const { total } = calculateTotals();

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleExpenseUpdated = (updatedExpense: Expense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  const handleExpenseAdded = (newExpense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  return (
    <div className="p-4 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-4 space-x-4">
        {/* Filtro por categoría */}
        <select
          className="p-2 bg-gray-800 text-white rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="food">Comida</option>
          <option value="transport">Transporte</option>
          <option value="misc">Misceláneo</option>
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

        {/* Botón para agregar gasto */}
        <button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedExpense(null);
          }}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
        >
          Crear Gasto
        </button>
      </div>

      {/* Tabla */}
      <table className="w-full text-left bg-gray-800 rounded">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">Fecha</th>
            <th className="p-2">Cantidad (€)</th>
            <th className="p-2">Categoría</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.id} className="border-b border-gray-700">
              <td className="p-2">{formatDate(expense.date)}</td>
              <td className="p-2">
                {isNaN(Number(expense.amount))
                  ? "0.00"
                  : Number(expense.amount).toFixed(2)}
              </td>
              <td className="p-2">{expense.category}</td>
              <td className="p-2">{expense.description}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(expense)}>
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
              Total Gastos: €{total.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Modal para editar o agregar gasto */}
      {isModalOpen && (
        <ExpenseFormModal
          expense={selectedExpense}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedExpense(null);
          }}
          onExpenseUpdated={handleExpenseUpdated}
          onExpenseAdded={handleExpenseAdded}
        />
      )}
    </div>
  );
}