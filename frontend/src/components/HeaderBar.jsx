function HeaderBar({ range, setRange, status }) {
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
      <h2 style={{ color: "#6b6b6b" }}>
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
                range === r ? "#ff4586" : "#313131",
              color: "white",
            }}
          >
            {r}
          </button>
        ))}

        {/* Live Badge */}
 <span
  style={{
    backgroundColor:
      status === "ALERT"
        ? "#ef4444"
        : status === "WARNING"
        ? "#f59e0b"
        : "#3b90d6",
    padding: "6px 10px",
    borderRadius: "6px",
    fontWeight: "bold",
  }}
>
  {status}
</span>


      </div>
    </div>
  );
}

export default HeaderBar;
