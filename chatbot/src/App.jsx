import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userId, setUserId] = useState("kim");
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);

  const chatBoxRef = useRef(null);

  // 🔥 새로운 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatList]);

  const sendChat = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    setChatList((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://192.168.2.57:8090/chat", {
        userId,
        message,
      });

      const apiMessages = res.data.messages || [];

      if (apiMessages.length > 0) {
        const lastMsg = apiMessages[apiMessages.length - 1];
        setChatList((prev) => [...prev, lastMsg]);
      }
    } catch (error) {
      setChatList((prev) => [
        ...prev,
        { sender: "ai", text: "⚠ 서버 오류 발생" },
      ]);
    }

    setMessage("");
  };

  return (
    <div className="app-container">
      {/* 헤더 */}
      <h1 className="chat-header">AI Chat</h1>

      {/* 채팅 내역 (스크롤 영역) */}
      <div ref={chatBoxRef} className="chat-list">
        {chatList.map((msg, idx) => (
          <div
            key={idx}
            className={`message-row ${msg.sender === "user" ? "message-user" : "message-ai"
              }`}
          >
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="input-area">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
          className="chat-input"
          onKeyDown={(e) => e.key === "Enter" && sendChat()}
        />
        <button onClick={sendChat} className="send-button">
          전송
        </button>
      </div>
    </div>
  );
}

export default App;
