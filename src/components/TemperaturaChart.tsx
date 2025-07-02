"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

type Temperatura = {
  valor: number;
  timestamp: string;
};

export function TemperaturaChart({ data }: { data: Temperatura[] }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <h2 className="text-xl font-bold mb-2 text-gray-800">Gráfica de Temperatura</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="valor" stroke="#f97316" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
