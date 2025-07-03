type Props = {
  data: { valor: number; timestamp: string; alerta?: boolean }[];
};

export default function TemperaturaTable({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Historial</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Temperatura</th>
            <th className="p-2">Hora</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t, i) => (
            <tr key={i} className="border-t">
              <td className={`p-2 ${t.valor > 50 ? "text-red-600 font-semibold" : "text-blue-600"}`}>
                {t.valor} °C
              </td>
              <td className="p-2 text-sm text-gray-500">
                {new Date(t.timestamp).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
