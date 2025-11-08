import React, { useState } from "react";

const NicknameModal = ({ room, onClose, onConfirm }) => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    if (!nickname.trim()) return alert("닉네임을 입력하세요!");
    if (!password.trim()) return alert("비밀번호를 입력하세요!");
    onConfirm(room, nickname, password); // ✅ RoomList와 인자 일치시킴
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-center">🔐 채팅방 입장</h3>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />
        <input
          type="password"
          placeholder="입장 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />
        <div className="flex justify-between">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            입장
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NicknameModal;
