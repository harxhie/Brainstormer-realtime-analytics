import { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar.jsx";
import PieChartPanel from "./PieChartPanel.jsx";
import KPISection from "./KPISection.jsx";
import LineChartPanel from "./LineChartPanel.jsx";

function Dashboard({ data, text, setText, sendMessage }) {
  const [highlightId, setHighlightId] = useState(null);
  const [range, setRange] = useState("5m");

  // ===== SYSTEM STATUS ENGINE =====
  const getStatus = () => {
    if (data.length > 15) return "ALERT";
    if (data.length > 7) return "WARNING";
    return "LIVE";
  };

  const status = getStatus();

  // ===== NEW MESSAGE HIGHLIGHT EFFECT =====
  useEffect(() => {
    if (data.length > 0) {
      const lastId = data[data.length - 1].id;
      setHighlightId(lastId);

      setTimeout(() => {
        setHighlightId(null);
      }, 800);
    }
  }, [data]);

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        backgroundColor: "#000000",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* TITLE */}
      <h1 style={{ marginBottom: "20px" }}>
        Real-time Analytics Dashboard
      </h1>

      <HeaderBar range={range} setRange={setRange} status={status} />

      {/* KPI CARDS */}
      <KPISection data={data} />

      {/* ===== MAIN GRID ===== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          alignItems: "start",
        }}
      >
        {/* ================= LEFT SIDE ================= */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* LINE CHART */}
          <div
            style={{
              backgroundColor: "#313131",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <LineChartPanel data={data} />
          </div>

          {/* ===== LIVE ACTIVITY FEED ===== */}
          <div>
            <h3 style={{ marginBottom: "10px" }}>Live Activity Feed</h3>

            {/* INPUT */}
            <div style={{ marginBottom: "20px" }}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type message..."
                style={{
                  padding: "10px",
                  marginRight: "10px",
                  borderRadius: "6px",
                  border: "none",
                  width: "220px",
                }}
              />

              <button
                onClick={sendMessage}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#ff4586",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </div>

            {/* LIVE FEED LIST */}
            {data.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor:
                    highlightId === item.id ? "#161616" : "#191919",
                  padding: "12px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  transition: "all 0.4s ease",
                  boxShadow:
                    highlightId === item.id
                      ? "0px 0px 12px #ffd3e2"
                      : "none",
                }}
              >
                <strong style={{ color: "#ff4586" }}>
                  Live Activity
                </strong>

                <p style={{ marginTop: "6px" }}>{item.text}</p>

                <span
                  style={{
                    fontSize: "12px",
                    color:
                      item.sentiment === "Pending"
                        ? "#f59e0b"
                        : item.sentiment === "Positive"
                        ? "#22c55e"
                        : item.sentiment === "Neutral"
                        ? "#38bdf8"
                        : "#ef4444",
                  }}
                >
                  Sentiment: {item.sentiment}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <PieChartPanel data={data} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
