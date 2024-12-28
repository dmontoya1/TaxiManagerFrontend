import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Ingresos",
        data: [500, 700, 800, 1200, 1500, 2000],
        backgroundColor: "rgba(34, 197, 94, 0.7)", // Verde
      },
      {
        label: "Gastos",
        data: [300, 500, 600, 800, 900, 1100],
        backgroundColor: "rgba(239, 68, 68, 0.7)", // Rojo
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Ingresos vs Gastos",
      },
    },
  };

  return <Bar data={data} options={options} />;
}