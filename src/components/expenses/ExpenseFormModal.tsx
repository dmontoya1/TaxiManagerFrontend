import React, { useState, useEffect } from "react";
import { createExpense, updateExpense } from "../../services/expenses";
import { toast } from "react-toastify";

interface ExpenseFormModalProps {
  expense?: {
    id: number;
    amount: string;
    date: string;
    category: string;
    description: string;
  };
  onClose: () => void;
  onExpenseUpdated?: (expense: { id: number; amount: string; date: string; category: string; description: string }) => void;
  onExpenseAdded?: (expense: { id: number; amount: string; date: string; category: string; description: string }) => void;
}

export default function ExpenseFormModal({
  expense,
  onClose,
  onExpenseUpdated,
  onExpenseAdded,
}: ExpenseFormModalProps) {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    category: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount.toString(),
        date: expense.date,
        category: expense.category,
        description: expense.description,
      });
    }
  }, [expense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Limpiar errores anteriores

    try {
      if (expense) {
        const updatedExpense = await updateExpense(expense.id, {
          amount: formData.amount,
          date: formData.date,
          category: formData.category,
          description: formData.description,
        });
        onExpenseUpdated?.(updatedExpense);
        toast.success("Gasto actualizado exitosamente"); // Popup verde
      } else {
        const newExpense = await createExpense({
          amount: formData.amount,
          date: formData.date,
          category: formData.category,
          description: formData.description,
        });
        onExpenseAdded?.(newExpense);
        toast.success("Gasto creado exitosamente"); // Popup verde
      }
      onClose();
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error("Error inesperado:", error);
        toast.error("Ocurrió un error al procesar el gasto"); // Popup rojo
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-yellow-400 text-xl font-bold mb-4">
          {expense ? "Editar Gasto" : "Agregar Gasto"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Campo para cantidad */}
            <div>
              <input
                type="number"
                placeholder="Cantidad (€)"
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount[0]}</p>
              )}
            </div>

            {/* Campo para fecha */}
            <div>
              <input
                type="date"
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date[0]}</p>
              )}
            </div>

            {/* Campo para categoría */}
            <div>
              <input
                type="text"
                placeholder="Categoría"
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category[0]}</p>
              )}
            </div>

            {/* Campo para descripción */}
            <div>
              <textarea
                placeholder="Descripción"
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description[0]}
                </p>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}