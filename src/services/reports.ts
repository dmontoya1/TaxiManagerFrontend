import API from "./api";

export interface Report {
  incomes: {
    total: number;
    cash: number;
    card: number;
  };
  expenses: {
    total: number;
  };
  payment_to_boss: number;
  driver_earnings: number;
}

export const fetchReports = async (date?: string, startDate?: string, endDate?: string): Promise<Report> => {
  const params = { date, start_date: startDate, end_date: endDate };
  const response = await API.get("/reports/", { params });
  return response.data;
};