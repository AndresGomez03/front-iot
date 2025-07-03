import axios from "axios";

interface Temperatura {
  valor: number;
  timestamp: string;
  alerta?: string;
}

export async function fetchTemperaturaESP(): Promise<Temperatura> {
  const res = await axios.get("http://esp...");

  return {
    valor: res.data.valor,
    timestamp: new Date().toISOString(), // 🔥 timestamp generado en el frontend
    alerta: res.data.alerta,           // opcional, solo para mostrarlo
  };
}
