import { useState, useEffect } from "react";
import { fetchIncomes, createIncome, deleteIncome } from "../../services/incomes";

export default function IncomesPage() {
  const [incomes, setIncomes] = useState([]);
  const [formData, setFormData] = useState({ amount: 0, description: "", date: "" });

  useEffect(() => {
    const loadIncomes = async () => {
      const data = await fetchIncomes();
      setIncomes(data);
    };

    loadIncomes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount > 0 && formData.description.trim() && formData.date) {
      const newIncome = await createIncome(formData);
      setIncomes([...incomes, newIncome]);
      setFormData({ amount: 0, description: "", date: "" });
    }
  };

  const handleDelete = async (id: number) => {
    await deleteIncome(id);
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">Gestión de Ingresos</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="number"
            placeholder="Monto (€)"
            className="p-2 rounded bg-gray-800 text-white"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: +e.target.value })}
          />
          <input
            type="text"
            placeholder="Descripción"
            className="p-2 rounded bg-gray-800 text-white"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <input
            type="date"
            className="p-2 rounded bg-gray-800 text-white"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Agregar
          </button>
        </div>
      </form>

      <ul className="space-y-4">
        {incomes.map((income) => (
          <li
            key={income.id}
            className="flex justify-between items-center bg-gray-800 p-4 rounded"
          >
            <div>
              <p className="text-white font-bold">{formatCurrency(income.amount)}</p>
              <p className="text-gray-400">{income.description}</p>
              <p className="text-gray-500 text-sm">{income.date}</p>
            </div>
            <button
              onClick={() => handleDelete(income.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}