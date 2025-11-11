import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { deleteRoom, getMessagesByRoomId } from "../api/chatApi";
import "./ChatRoom.css";

let stompClient = null;

const ChatRoom = () => {
  // -------------------- [1] 기본 설정 --------------------
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const nickname = searchParams.get("name");
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const [connected, setConnected] = useState(false);
  const chatBoxRef = useRef(null);
  const socketRef = useRef(null);

  // WebSocket 연결 확인용 유틸
  const waitForSocketConnection = (callback) => {
    const interval = setInterval(() => {
      if (socketRef.current?.readyState === 1 && stompClient?.connected) {
        clearInterval(interval);
        callback();
      }
    }, 100);
  };

  // -------------------- [2] 채팅 내역 불러오기 --------------------
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesByRoomId(roomId);
        setChatList(data);
      } catch (err) {
        console.error("❌ 메시지 로드 실패:", err);
      }
    };
    fetchMessages();
  }, [roomId]);

  // -------------------- [3] WebSocket 연결 및 구독 --------------------
  useEffect(() => {
    const socket = new SockJS("http://192.168.2.22:8090/ws/chat");
    socketRef.current = socket;
    stompClient = over(socket);

    stompClient.connect(
      {},
      () => {
        console.log("WebSocket 연결 성공");
        setConnected(true);

        //구독: 서버 → 클라이언트
        stompClient.subscribe(`/sub/chat/room/${roomId}`, (msg) => {
          const received = JSON.parse(msg.body);
          setChatList((prev) => [...prev, received]);
        });

        //입장 알림 전송
        waitForSocketConnection(() => {
          sendSystemMessage(`${nickname}님이 입장했습니다.`);
        });
      },
      (err) => console.error("❌ WebSocket 연결 실패:", err)
    );

    // -------------------- [4] Cleanup: 퇴장 처리 --------------------
    return () => {
      waitForSocketConnection(() => {
        sendSystemMessage(`${nickname}님이 퇴장했습니다.`);
        stompClient.disconnect(() => {
          console.log("WebSocket 연결 해제 완료");
        });
      });
    };
  }, [roomId, nickname]);

  // -------------------- [5] 스크롤 자동 이동 --------------------
  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatList]);

  // -------------------- [6] 메시지 전송 함수 --------------------
  const sendMessage = () => {
    if (!message.trim()) return;
    if (!connected || !stompClient?.connected) {
      alert("서버 연결이 아직 완료되지 않았습니다.");
      return;
    }

    const chat = {
      roomId: Number(roomId),
      sender: nickname,
      message,
    };

    stompClient.send("/pub/chat/message", {}, JSON.stringify(chat));
    setMessage("");
  };

  // -------------------- [7] System 메시지 전송 함수 --------------------
  const sendSystemMessage = (msg) => {
    stompClient.send(
      "/pub/chat/message",
      {},
      JSON.stringify({
        roomId,
        sender: "System",
        message: msg,
      })
    );
  };

  // -------------------- [8] 방 나가기 / 삭제 --------------------
  const handleExit = () => navigate("/");

  const handleDeleteRoom = async () => {
    const password = prompt("삭제 비밀번호를 입력하세요:");
    if (!password) return;

    try {
      const result = await deleteRoom(roomId, password);
      alert(result);
      if(result==="✅ 채팅방이 삭제되었습니다."){
      navigate("/");}
    } catch (err) {
      console.error("방 삭제 실패:", err);
      alert("❌ 방 삭제 중 오류가 발생했습니다.");
      navigate("/");
    }
  };

  // -------------------- [9] 렌더링 --------------------
  return (
    <div className="chat-room-page">
      <div className="chat-room-shell">
        {/* 헤더 영역 */}
        <header className="chat-room-header">
          <div className="chat-room-heading">
            <p className="chat-room-subtitle">Room #{roomId}</p>
            <h2 className="chat-room-title">{nickname}님의 채팅 공간</h2>
          </div>
          <div className="chat-room-controls">
            <button className="chat-room-button" onClick={handleExit}>
              나가기
            </button>
            <button
              className="chat-room-button chat-room-button--danger"
              onClick={handleDeleteRoom}
            >
              방 삭제
            </button>
          </div>
        </header>

        {/* 메시지 영역 */}
        <section className="chat-room-messages" ref={chatBoxRef}>
          {chatList.map((chat, idx) =>
            chat.sender === "System" ? (
              <p key={idx} className="chat-room-system">
                {chat.message}
              </p>
            ) : (
              <div
                key={idx}
                className={`chat-room-message ${
                  chat.sender === nickname ? "chat-room-message--me" : ""
                }`}
              >
                <span className="chat-room-message__sender">
                  {chat.sender}
                </span>
                <span className="chat-room-message__bubble">
                  {chat.message}
                </span>
              </div>
            )
          )}
        </section>

        {/* 입력창 */}
        <div className="chat-room-input">
          <input
            type="text"
            className="chat-room-field"
            placeholder="메시지를 입력하세요..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="chat-room-send"
            onClick={sendMessage}
            disabled={!connected}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
