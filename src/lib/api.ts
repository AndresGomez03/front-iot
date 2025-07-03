import axios from "axios";

const API_BASE = "http://esp8266.local"; // Cambia esto si vas a producción

export async function fetchTemperaturas() {
    const res = await axios.get(`${API_BASE}/`);

    const datos = res.data; // { temp: number, alerta: boolean }

    return [
        {
            valor: datos.temp,
            timestamp: new Date().toISOString(), // timestamp generado en frontend
            alerta: datos.alerta
        }
    ];
}
