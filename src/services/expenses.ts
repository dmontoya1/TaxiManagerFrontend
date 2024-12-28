import API from "./api";

// Listar gastos
export const fetchExpenses = async () => {
  const response = await API.get("/transactions/expenses/");
  return response.data;
};

// Crear gasto
export const createExpense = async (expenseData: {
  amount: string;
  date: string;
  category: string;
  description: string;
}) => {
  const response = await API.post("/transactions/expenses/", expenseData);
  return response.data;
};

// Actualizar gasto
export const updateExpense = async (
  id: number,
  expenseData: {
    amount: string;
    date: string;
    category: string;
    description: string;
  }
) => {
  const response = await API.put(`/transactions/expenses/${id}/`, expenseData);
  return response.data;
};

// Eliminar gasto
export const deleteExpense = async (id: number) => {
  const response = await API.delete(`/transactions/expenses/${id}/`);
  return response.data;
};