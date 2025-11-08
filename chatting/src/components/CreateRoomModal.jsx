import React, { useState } from "react";

const CreateRoomModal = ({ onClose, onCreate }) => {
  const [roomName, setRoomName] = useState("");
  const [enterPassword, setEnterPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  const handleCreate = () => {
    if (!roomName.trim()) return alert("방 이름을 입력하세요!");
    if (!enterPassword.trim() || !deletePassword.trim())
      return alert("비밀번호를 모두 입력하세요!");
    onCreate({
      roomName,
      enterPassword: parseInt(enterPassword),
      deletePassword: parseInt(deletePassword),
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80">
        <h2 className="text-lg font-bold mb-3 text-center">🆕 새 채팅방 생성</h2>

        <input
          type="text"
          placeholder="방 이름"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="number"
          placeholder="입장 비밀번호 (숫자)"
          value={enterPassword}
          onChange={(e) => setEnterPassword(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="number"
          placeholder="삭제 비밀번호 (숫자)"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
          className="border w-full p-2 mb-4 rounded"
        />

        <div className="flex justify-between">
          <button
            onClick={handleCreate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            생성
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

export default CreateRoomModal;

