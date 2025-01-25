import React, { useState, useEffect } from "react";
import { fetchExpenses } from "../../services/expenses";
import ExpenseFormModal from "./ExpenseFormModal";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { formatDate } from "../../utils/format";

interface Expense {
  id: number;
  amount: string;
  category: string;
  description: string;
  date: string;
}

export default function ExpensesTable() {
  const [expenses, setExpenses] = useState<Expense[]>([]); // Inicializar como array vacío
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carga
  
  // Fetch los gastos desde el backend
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await fetchExpenses();
        setExpenses(data); // data ya es el array de gastos
      } catch (error) {
        console.error("Error al cargar los gastos:", error);
      } finally {
        setIsLoading(false); // Finalizar la carga
      }
    };
    loadExpenses();
  }, []);
  
  // Si está cargando, mostrar un indicador
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="text-xl font-bold">Cargando gastos...</h1>
      </div>
    );
  }
  
  // Si no hay gastos, mostrar un mensaje
  if (!expenses || expenses.length === 0) {
    return (
      <div className="p-4 bg-gray-900 text-white">
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Gastos</h1>
        <p className="text-gray-300">No hay gastos registrados.</p>
      </div>
    );
  }
  
  // Calcular totales dinámicamente
  const calculateTotals = () => {
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    return { total };
  };
  
  const { total } = calculateTotals();
  
  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };
  
  const handleDelete = async (id: number) => {
    // Lógica para eliminar el gasto
    setExpenses(expenses.filter((expense) => expense.id !== id));
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
    setExpenses([...expenses, newExpense]);
    setIsModalOpen(false);
    setSelectedExpense(null);
  };
  
  return (
    <div className="p-4 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-yellow-400">Gastos</h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedExpense(null);
          }}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
        >
          Agregar Gasto
        </button>
      </div>
      
      {/* Tabla de gastos */}
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
        {expenses.map((expense) => (
          <tr key={expense.id} className="border-b border-gray-700">
            <td className="p-2">{formatDate(expense.date)}</td>
            <td className="p-2">{expense.amount}</td>
            <td className="p-2">{expense.category}</td>
            <td className="p-2">{expense.description}</td>
            <td className="p-2">
              <button onClick={() => handleEdit(expense)}>
                <FiEdit2 className="text-yellow-400 hover:text-yellow-300" size={20} />
              </button>
              <button onClick={() => handleDelete(expense.id)} className="ml-2">
                <FiTrash2 className="text-red-500 hover:text-red-400" size={20} />
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