import API from "./api";

// Listar gastos
export const fetchExpenses = async () => {
  const response = await API.get("/expenses/");
  return response.data;
};

// Crear gasto
export const createExpense = async (expenseData: { amount: number; description: string; date: string }) => {
  const response = await API.post("/expenses/", expenseData);
  return response.data;
};

// Actualizar gasto
export const updateExpense = async (
  id: number,
  expenseData: { amount: number; description: string; date: string }
) => {
  const response = await API.put(`/expenses/${id}/`, expenseData);
  return response.data;
};

// Eliminar gasto
export const deleteExpense = async (id: number) => {
  const response = await API.delete(`/expenses/${id}/`);
  return response.data;
};