import React, { useState, useEffect } from "react";
import { createIncome, updateIncome } from "../../services/incomes";

interface Income {
  id: number;
  amount: string;
  date: string;
  payment_method: string;
  description: string;
}

interface IncomeFormModalProps {
  income?: Income;
  onClose: () => void;
  onIncomeUpdated?: (income: Income) => void;
  onIncomeAdded?: (income: Income) => void;
}

export default function IncomeFormModal({
  income,
  onClose,
  onIncomeUpdated,
  onIncomeAdded,
}: IncomeFormModalProps) {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    payment_method: "cash",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (income) {
      setFormData({
        amount: income.amount.toString(),
        date: income.date,
        payment_method: income.payment_method,
        description: income.description,
      });
    }
  }, [income]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Limpiar errores anteriores

    try {
      if (income) {
        const updatedIncome = await updateIncome(income.id, {
          amount: formData.amount,
          date: formData.date,
          payment_method: formData.payment_method,
          description: formData.description,
        });
        onIncomeUpdated?.(updatedIncome);
      } else {
        const newIncome = await createIncome({
          amount: formData.amount,
          date: formData.date,
          payment_method: formData.payment_method,
          description: formData.description,
        });
        onIncomeAdded?.(newIncome);
      }
      onClose();
    } catch (error) {
      // @ts-ignore
      if (error.response && error.response.data) {
        setErrors(error.response.data); // Guardar errores del servidor
      } else {
        console.error("Error inesperado:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-yellow-400 text-xl font-bold mb-4">
          {income ? "Editar Ingreso" : "Agregar Ingreso"}
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

            {/* Campo para método */}
            <div>
              <select
                className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
              >
                <option value="cash">Efectivo</option>
                <option value="card">Tarjeta</option>
              </select>
              {errors.payment_method && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.payment_method[0]}
                </p>
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