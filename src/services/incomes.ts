import API from "./api";

// Listar ingresos
export const fetchIncomes = async (params: { page: number; page_size: number }) => {
  const response = await API.get("/transactions/incomes/", { params });
  return {
    results: response.data.results, // Lista de ingresos
    count: response.data.count, // Total de ingresos
    next: response.data.next, // Link a la siguiente página (si existe)
    previous: response.data.previous, // Link a la página anterior (si existe)
  };
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