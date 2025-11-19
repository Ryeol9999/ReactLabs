import { useState } from "react";
import axios from "axios";

function App() {

  const [userId, setUserId] = useState(1);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  // ✔ Spring Boot /chat API 호출
  const sendChat = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8090/chat",
        {
          userId: userId,
          message: message
        }
      );
      setResponse(res.data.answer || JSON.stringify(res.data));
    } catch (e) {
      console.error(e);
      setResponse("에러 발생");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Chat Test</h1>

      <div style={{ marginBottom: 20 }}>
        <label>사용자 ID: </label>
        <input 
          type="number" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>메시지: </label>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "300px" }}
        />
        <button onClick={sendChat} style={{ marginLeft: 10 }}>
          전송
        </button>
      </div>

      <h3>AI 응답:</h3>
      <div 
        style={{
          minHeight: "100px",
          padding: "10px",
          background: "#f4f4f4",
          borderRadius: "5px"
        }}
      >
        {response}
      </div>
    </div>
  );
}

export default App;
