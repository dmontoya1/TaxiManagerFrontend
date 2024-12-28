import dayjs from "dayjs";
import "dayjs/locale/es"; // Importar el idioma español

export const formatPaymentMethod = (method: string): string => {
  const methodMap: { [key: string]: string } = {
    cash: "Efectivo",
    card: "Visas",
  };

  return methodMap[method] || method; // Retorna el valor original si no coincide
};


export function formatDate(dateString: string): string {
  return dayjs(dateString).locale("es").format("dddd, D [de] MMMM [de] YYYY");
}

