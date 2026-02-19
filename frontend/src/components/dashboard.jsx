import { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar";
import PieChartPanel from "./PieChartPanel";


import KPISection from "./KPISection";
import LineChartPanel from "./LineChartPanel";

function Dashboard({ data, text, setText, sendMessage }) {
    const [highlightId, setHighlightId] = useState(null);
    const [range, setRange] = useState("5m");

    useEffect(() => {
  if (data.length > 0) {
    const lastId = data[data.length - 1].id;
    setHighlightId(lastId);

    setTimeout(() => {
      setHighlightId(null);
    }, 800); // glow duration
  }
}, [data]);


  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Title */}
      <h1 style={{ marginBottom: "20px" }}>
        Realtime Analytics Dashboard 
      </h1>
      <HeaderBar range={range} setRange={setRange} />


      {/* KPI Cards */}
      <KPISection data={data} />

      {/* GRID LAYOUT */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        {/* LEFT PANEL - LINE CHART */}
        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <LineChartPanel data={data} />
        </div>
        <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  }}
>
  <div
    style={{
      backgroundColor: "#1e293b",
      borderRadius: "10px",
      padding: "20px",
    }}
  >
    <LineChartPanel data={data} />
  </div>

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


        {/* RIGHT PANEL - ACTIVITY FEED */}
        <div>
          <h3 style={{ marginBottom: "10px" }}>Live Activity Feed</h3>

          {/* INPUT BOX */}
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
                width: "200px",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                padding: "10px 16px",
                backgroundColor: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>

          {/* LIVE FEED */}
          {data.map((item) => (
            <div
              key={item.id}
             style={{
  backgroundColor:
    highlightId === item.id ? "#334155" : "#1e293b",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  transition: "all 0.4s ease",
  boxShadow:
    highlightId === item.id
      ? "0px 0px 12px #22c55e"
      : "none",
}}

            >
              <strong style={{ color: "#38bdf8" }}>
                Live Activity
              </strong>
              <p style={{ marginTop: "6px" }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
