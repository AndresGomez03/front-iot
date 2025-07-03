"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  data: { valor: number; timestamp: string }[];
};

export default function TemperaturaChart({ data }: Props) {
  return (
    <div className="h-64 bg-white rounded-xl shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2">Gráfico de temperatura</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="timestamp" tickFormatter={(ts) => new Date(ts).toLocaleTimeString()} />
          <YAxis domain={[0, 'dataMax + 5']} />
          <Tooltip labelFormatter={(ts) => new Date(ts).toLocaleString()} />
          <Line type="monotone" dataKey="valor" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
