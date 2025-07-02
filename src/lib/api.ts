import axios from "axios";

const API_BASE = "http://localhost:8080"; // Cambia esto si vas a producción

export async function fetchTemperaturas() {
  const res = await axios.get(`${API_BASE}/temperatura`);
  return res.data;
}
