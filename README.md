# Instalacion
- git clone
- npm install
- npm run dev

# Modificar API
Para que este front consuma de tu api, cambia en 'src/lib/api.ts' la url y el endpoint de tu api

Por ejemplo, const API_BASE = "http://esp8266.local"
y
export async function fetchTemperaturas() {
  const res = await axios.get(`${API_BASE}/*tu-endpoint*`);
  return res.data;
}

  
