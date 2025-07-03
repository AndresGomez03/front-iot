import axios from "axios";

const API_BASE = "http://localhost:8080"; // Cambia esto si vas a producción

export async function fetchTemperaturas(): Promise<{ valor: number; timestamp: string; alerta: boolean }[]> {
  const res = await axios.get(`${API_BASE}/temperatura`);
  if (!res.ok) throw new Error("Error al obtener temperatura");

  const data = await res.json();

  return {
    valor: res.data.valor,
    timestamp: new Date().toISOString(), // 🔥 timestamp generado en el frontend
    alerta: res.data.valor
  };
}
