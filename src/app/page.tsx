
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
      try {
        const data = await fetchTemperaturas(); // data es un array con 1 elemento

        // Acumula el nuevo dato al historial
        setDatos(prev => [...prev, ...data]);

        // Verifica la última temperatura para la alerta
        const ultima = data[data.length - 1];
        setAlertaActiva(ultima.valor > 50);
      } catch (error) {
        console.error("Error al obtener datos del ESP8266:", error);
      }
    };

    fetchData(); // Llamada inicial
    const interval = setInterval(fetchData, 5000); // Cada 5 segundos

    return () => clearInterval(interval); // Limpieza al desmontar
  }, []);

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

