import API from "./api";

// Listar ingresos
export const fetchIncomes = async () => {
  const response = await API.get("/transactions/incomes/");
  return response.data;
};

// Crear ingreso
// Crear ingreso
export const createIncome = async (incomeData: {
  amount: string;
  date: string;
  payment_method: string;
  description: string;
}) => {
  const response = await API.post("/transactions/incomes/", incomeData);
  return response.data;
};

// Actualizar ingreso
export const updateIncome = async (
  id: number,
  incomeData: {
    amount: string;
    date: string;
    payment_method: string;
    description: string;
  }
) => {
  const response = await API.put(`/transactions/incomes/${id}/`, incomeData);
  return response.data;
};

// Eliminar ingreso
export const deleteIncome = async (id: number) => {
  const response = await API.delete(`/transactions/incomes/${id}/`);
  return response.data;
};