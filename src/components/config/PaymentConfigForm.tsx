import React, { useState, useEffect } from "react";
import { fetchPaymentConfig, updatePaymentConfig } from "../../services/config";
import { toast } from "react-toastify";

export default function PaymentConfigForm() {
  const [isPercentage, setIsPercentage] = useState(true);
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Cargar la configuración actual
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await fetchPaymentConfig();
        setIsPercentage(config.is_percentage);
        setValue(config.value);
      } catch (error) {
        console.error("Error al cargar la configuración:", error);
      }
    };
    loadConfig();
  }, []);
  
  // Guardar la configuración
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updatePaymentConfig({ is_percentage: isPercentage, value });
      toast.success("Configuración guardada exitosamente");
    } catch (error) {
      console.error("Error al guardar la configuración:", error);
      toast.error("Ocurrió un error al guardar la configuración");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de pago</label>
        <select
          value={isPercentage ? "percentage" : "fixed"}
          onChange={(e) => setIsPercentage(e.target.value === "percentage")}
          className="p-2 bg-gray-800 text-white rounded w-full"
        >
          <option value="percentage">Porcentaje</option>
          <option value="fixed">Valor fijo</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Valor</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          className="p-2 bg-gray-800 text-white rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
      >
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}