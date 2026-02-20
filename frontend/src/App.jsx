import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  // ✅ PRODUCTION BACKEND URL (Render)
  const API_URL = "https://brainstormer-backend.onrender.com/api/v1";
  const WS_URL = "wss://brainstormer-backend.onrender.com/ws";

  // 🔄 Fetch messages from backend
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/data`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // ⚡ Realtime WebSocket + Initial Load
  useEffect(() => {
    fetchData();

    const socket = new WebSocket(WS_URL);

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === "sentiment_update") {
          setData((prev) =>
            prev.map((item) =>
              item.id === message.data.id ? message.data : item
            )
          );
        }
      } catch (err) {
        console.error("WebSocket parse error:", err);
      }
    };

    socket.onerror = () => {
      console.log("WebSocket connection error");
    };

    return () => socket.close();
  }, []);

  // 📤 Send message
  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await fetch(`${API_URL}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      setText("");
      fetchData();
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  return (
    <Dashboard
      data={data}
      text={text}
      setText={setText}
      sendMessage={sendMessage}
    />
  );
}

export default App;