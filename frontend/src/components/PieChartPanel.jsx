import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#38bdf8", "#ef4444"];

function PieChartPanel({ data }) {
  // Fake sentiment distribution for now
  const sentimentData = [
    { name: "Positive", value: Math.ceil(data.length * 0.4) },
    { name: "Neutral", value: Math.ceil(data.length * 0.3) },
    { name: "Negative", value: Math.ceil(data.length * 0.3) },
  ];

  return (
    <div>
      <h3 style={{ marginBottom: "10px" }}>
        🧠 Sentiment Distribution
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={sentimentData}
            dataKey="value"
            outerRadius={80}
            label
          >
            {sentimentData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartPanel;
