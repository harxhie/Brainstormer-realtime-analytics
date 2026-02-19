function KPISection({ data }) {
  const totalMessages = data.length;

  // simple fake metric for now
  const messagesPerMinute = totalMessages * 2;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        marginBottom: "30px",
      }}
    >
      {/* KPI Card */}
      <div style={cardStyle}>
        <p style={labelStyle}>Total Messages</p>
        <h2>{totalMessages}</h2>
      </div>

      <div style={cardStyle}>
        <p style={labelStyle}>Messages / Minute</p>
        <h2>{messagesPerMinute}</h2>
      </div>

      <div style={cardStyle}>
        <p style={labelStyle}>System Status</p>
        <h2 style={{ color: "#22c55e" }}>LIVE</h2>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
};

const labelStyle = {
  color: "#94a3b8",
  marginBottom: "6px",
};

export default KPISection;
