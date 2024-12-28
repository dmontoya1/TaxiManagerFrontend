import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const data = {
    labels: ["Combustible", "Mantenimiento", "Otros"],
    datasets: [
      {
        label: "Gastos",
        data: [300, 200, 150],
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)", // Rojo
          "rgba(59, 130, 246, 0.7)", // Azul
          "rgba(234, 179, 8, 0.7)", // Amarillo
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}