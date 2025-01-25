import API from "./api";

export interface PaymentConfig {
  is_percentage: boolean;
  value: number;
}

export const fetchPaymentConfig = async (): Promise<PaymentConfig> => {
  const response = await API.get("/accounts/payment-config/");
  return response.data;
};

export const updatePaymentConfig = async (config: PaymentConfig) => {
  const response = await API.post("/accounts/payment-config/", config);
  return response.data;
};