"use client";

type Temperatura = {
  valor: number;
  timestamp: string;
};

function getColor(valor: number) {
  if (valor <= 10) return "text-blue-600";
  if (valor <= 25) return "text-green-600";
  if (valor <= 35) return "text-yellow-600";
  if (valor <= 50) return "text-orange-600";
  return "text-red-700"; // > 50
}

export function TemperaturaTable({ data }: { data: Temperatura[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-4 w-full mt-4">
        <p className="text-gray-800">No hay datos disponibles.</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full mt-4">
      <h2 className="text-xl font-bold mb-2 text-gray-800">Tabla de Temperaturas</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="px-2 py-1 text-gray-800">Fecha</th>
            <th className="px-2 py-1 text-gray-700">Valor (°C)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t, i) => (
            <tr key={i} className="border-b">
              <td className="px-2 py-1 text-gray-700">{new Date(t.timestamp).toLocaleString()}</td>
              <td className={`px-2 py-1 ${getColor(t.valor)}`}>{t.valor.toFixed(2)} °C</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
