import React, { useState, useEffect } from "react";
import { fetchReports } from "../../services/reports";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReportsTable() {
  const [reports, setReports] = useState({
    incomes: { total: 0, cash: 0, card: 0 },
    expenses: { total: 0 },
    payment_to_boss: 0,
    driver_earnings: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  // Fetch los reportes desde el backend
  const loadReports = async () => {
    try {
      const data = await fetchReports(
        date?.toISOString().split("T")[0],
        startDate?.toISOString().split("T")[0],
        endDate?.toISOString().split("T")[0]
      );
      setReports(data);
    } catch (error) {
      console.error("Error al cargar los reportes:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadReports();
  }, [date, startDate, endDate]);
  
  return (
    <div className="p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">Reportes</h1>
      
      {/* Filtros de Fecha */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Fecha específica</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="p-2 bg-gray-800 text-white rounded"
            dateFormat="yyyy-MM-dd"
            isClearable
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Rango de fechas</label>
          <div className="flex space-x-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="p-2 bg-gray-800 text-white rounded"
              dateFormat="yyyy-MM-dd"
              isClearable
              placeholderText="Fecha inicial"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="p-2 bg-gray-800 text-white rounded"
              dateFormat="yyyy-MM-dd"
              isClearable
              placeholderText="Fecha final"
            />
          </div>
        </div>
      </div>
      
      {/* Reporte */}
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <h1 className="text-xl font-bold">Cargando reportes...</h1>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Resumen de Ingresos */}
          <div>
            <h2 className="text-xl font-bold text-blue-400 mb-2">Ingresos</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-bold">Total</h3>
                <p className="text-2xl">€{reports.incomes.total.toFixed(2)}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-bold">Efectivo</h3>
                <p className="text-2xl">€{reports.incomes.cash.toFixed(2)}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-bold">Tarjeta</h3>
                <p className="text-2xl">€{reports.incomes.card.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          {/* Resumen de Gastos */}
          <div>
            <h2 className="text-xl font-bold text-red-400 mb-2">Gastos</h2>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-bold">Total</h3>
              <p className="text-2xl">€{reports.expenses.total.toFixed(2)}</p>
            </div>
          </div>
          
          {/* Pago al Jefe y Ganancias del Conductor */}
          <div>
            <h2 className="text-xl font-bold text-green-400 mb-2">Pagos</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-bold">Pago al Jefe</h3>
                <p className="text-2xl">€{reports.payment_to_boss.toFixed(2)}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-bold">Ganancias del Conductor</h3>
                <p className="text-2xl">€{reports.driver_earnings.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}