function HeaderBar({ range, setRange }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      {/* LEFT SIDE */}
      <h2 style={{ color: "#94a3b8" }}>
        Live Analytics
      </h2>

      {/* RIGHT SIDE CONTROLS */}
      <div style={{ display: "flex", gap: "10px" }}>
        {["5m", "15m", "1h"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              backgroundColor:
                range === r ? "#22c55e" : "#1e293b",
              color: "white",
            }}
          >
            {r}
          </button>
        ))}

        {/* Live Badge */}
        <span
          style={{
            backgroundColor: "#22c55e",
            padding: "6px 10px",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          LIVE
        </span>
      </div>
    </div>
  );
}

export default HeaderBar;
