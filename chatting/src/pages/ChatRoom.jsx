import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { deleteRoom, getMessagesByRoomId } from "../api/chatApi"; // ✅ 추가

let stompClient = null;

const ChatRoom = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const nickname = searchParams.get("name");
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const [connected, setConnected] = useState(false);
  const chatBoxRef = useRef(null);
  const socketRef = useRef(null);

  const waitForSocketConnection = (callback) => {
    const interval = setInterval(() => {
      if (socketRef.current?.readyState === 1 && stompClient?.connected) {
        clearInterval(interval);
        callback();
      }
    }, 100);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesByRoomId(roomId);
        console.log("📜 기존 메시지:", data);
        setChatList(data);
      } catch (err) {
        console.error("❌ 메시지 로드 실패:", err);
      }
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    console.log("Opening Web Socket...");
    const socket = new SockJS("http://localhost:8090/ws/chat");
    socketRef.current = socket;
    stompClient = over(socket);

    stompClient.connect(
      {},
      () => {
        console.log("✅ WebSocket 연결 성공");
        setConnected(true);

        stompClient.subscribe(`/sub/chat/room/${roomId}`, (msg) => {
          const received = JSON.parse(msg.body);
          setChatList((prev) => [...prev, received]);
        });

        waitForSocketConnection(() => {
          stompClient.send(
            "/pub/chat/message",
            {},
            JSON.stringify({
              roomId,
              sender: "System",
              message: `${nickname}님이 입장했습니다.`,
            })
          );
        });
      },
      (err) => console.error("❌ WebSocket 연결 실패:", err)
    );

    return () => {
      waitForSocketConnection(() => {
        stompClient.send(
          "/pub/chat/message",
          {},
          JSON.stringify({
            roomId,
            sender: "System",
            message: `${nickname}님이 퇴장했습니다.`,
          })
        );
        stompClient.disconnect(() => {
          console.log("🔴 WebSocket 종료");
        });
      });
    };
  }, [roomId, nickname]);

  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatList]);

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

  const handleExit = () => navigate("/");

  // ✅ 방 삭제 함수
  const handleDeleteRoom = async () => {
    const password = prompt("삭제 비밀번호를 입력하세요:");
    if (!password) return;

    try {
      const result = await deleteRoom(roomId, password);
      alert(result);
      navigate("/"); // 목록으로 이동
    } catch (err) {
      console.error("방 삭제 실패:", err);
      alert("❌ 방 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center p-5 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-3">💬 Room #{roomId}</h2>
      <div className="text-gray-500 mb-3">닉네임: {nickname}</div>

      {/* 채팅창 */}
      <div
        ref={chatBoxRef}
        className="border w-full h-96 rounded p-3 overflow-y-auto bg-white shadow-inner"
      >
        {chatList.map((chat, idx) => (
          <div key={idx} className="mb-2">
            {chat.sender === "System" ? (
              <p className="text-center text-sm text-gray-400 italic">
                {chat.message}
              </p>
            ) : (
              <p>
                <strong>{chat.sender}: </strong>
                {chat.message}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="flex w-full mt-3">
        <input
          type="text"
          className="flex-1 border rounded-l p-2"
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
        >
          전송
        </button>
      </div>

      {/* 버튼 그룹 */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleExit}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          나가기
        </button>

        {/* ✅ 방 삭제 버튼 */}
        <button
          onClick={handleDeleteRoom}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          방 삭제
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
