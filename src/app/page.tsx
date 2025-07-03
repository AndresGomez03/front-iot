"use client";

import { useEffect, useState } from "react";
import { fetchTemperaturas } from "@/lib/api";
import { TemperaturaChart } from "@/components/TemperaturaChart";
import { TemperaturaTable } from "@/components/TemperaturaTable";
import { AlertaTemperatura } from "@/components/AlertaTemperatura";

type Temperatura = {
  valor: number;
  timestamp: string;
  alerta: boolean;
};

export default function Home() {
  const [datos, setDatos] = useState<Temperatura[]>([]);
  const [alertaActiva, setAlertaActiva] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTemperaturas();
      setDatos(data);

      // Asegurarse de que hay datos antes de leerlos
      if (data && data.length > 0) {
        // Obtener el valor de la última lectura de temperatura
        const ultimaTemperatura = data[data.length - 1];
        
        // Activar la alerta si el último valor es > 50, desactivarla en caso contrario
        if (ultimaTemperatura.valor > 50) {
          setAlertaActiva(true);
        } else {
          setAlertaActiva(false);
        }
      }
    };

    fetchData(); // Llama una vez al cargar
    const interval = setInterval(fetchData, 5000); // Y luego configura el intervalo

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []); // El array de dependencias vacío asegura que esto se ejecute solo una vez

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {alertaActiva && <AlertaTemperatura />}
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-700">
          Dashboard de Temperatura
        </h1>
        <TemperaturaChart data={datos} />
        <TemperaturaTable data={datos} />
      </div>
    </main>
  );
}