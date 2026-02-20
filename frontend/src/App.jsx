import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";


function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  // Fetch messages from backend
  const fetchData = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/v1/data");
    const result = await res.json();
    setData(result);
  };

  // Auto refresh every 2 seconds (realtime simulation)
  useEffect(() => {
  fetchData();

  const socket = new WebSocket("ws://localhost:8000/ws");

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


  // Send message to backend
  const sendMessage = async () => {
    if (!text.trim()) return;

    await fetch("http://127.0.0.1:8000/api/v1/data", {
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
