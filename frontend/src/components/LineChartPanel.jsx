import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function LineChartPanel({ data }) {
  // Convert messages into chart data
  const chartData = data.map((item, index) => ({
  time: item.timestamp || `#${index}`,
  value: index + 1,
}));


  return (
    <div>
      <h3 style={{ marginBottom: "10px" }}>
        📈 Message Volume
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" stroke="#ffffff" />
          <YAxis stroke="#c8c8c8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ff4586"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartPanel;
