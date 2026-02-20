import { useEffect, useState } from "react";
import Dashboard from "./components/dashboard.jsx";

function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  // ✅ Environment-based URLs (WORKS EVERYWHERE)
  const API_URL = import.meta.env.VITE_API_URL;
  const WS_URL = import.meta.env.VITE_WS_URL;

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/data`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();

    const socket = new WebSocket(WS_URL);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "sentiment_update") {
        setData((prev) =>
          prev.map((item) =>
            item.id === message.data.id ? message.data : item
          )
        );
      }
    };

    return () => socket.close();
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await fetch(`${API_URL}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    setText("");
    fetchData();
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