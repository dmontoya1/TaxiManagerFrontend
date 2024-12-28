import API from "./api";

// Listar ingresos
export const fetchIncomes = async () => {
  const response = await API.get("/incomes/");
  return response.data;
};

// Crear ingreso
export const createIncome = async (incomeData: { amount: number; description: string; date: string }) => {
  const response = await API.post("/incomes/", incomeData);
  return response.data;
};

// Actualizar ingreso
export const updateIncome = async (
  id: number,
  incomeData: { amount: number; description: string; date: string }
) => {
  const response = await API.put(`/incomes/${id}/`, incomeData);
  return response.data;
};

// Eliminar ingreso
export const deleteIncome = async (id: number) => {
  const response = await API.delete(`/incomes/${id}/`);
  return response.data;
};