"use client";

import { useEffect, useState } from "react";
import { fetchTemperaturaESP } from "@/lib/api";
import TemperaturaChart from "@/components/TemperaturaChart";
import TemperaturaTable from "@/components/TemperaturaTable";
import { AlertaTemperatura } from "@/components/AlertaTemperatura";

type Temperatura = {
  valor: number;
  timestamp: string;
  alerta?: boolean;
};

export default function Home() {
  const [datos, setDatos] = useState<Temperatura[]>([]);
  const [alertaActiva, setAlertaActiva] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nuevoDato = await fetchTemperaturaESP();

        setDatos((prev) => [...prev.slice(-19), nuevoDato]); // mantener últimos 20
        setAlertaActiva(nuevoDato.valor > 50); // alerta basada en valor
      } catch (err) {
        console.error("Error al obtener temperatura:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        {alertaActiva && <AlertaTemperatura />}
        <h1 className="text-2xl font-bold mb-4 text-center">Temperatura ambiente</h1>
        <TemperaturaChart data={datos} />
        <TemperaturaTable data={datos} />
      </div>
    </main>
  );
}
