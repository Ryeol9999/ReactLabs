import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms, checkEnterPassword, createRoom } from "../api/chatApi";
import NicknameModal from "../components/NicknameModal";
import CreateRoomModal from "../components/CreateRoomModal";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ 방 목록 가져오기
  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      console.log("방 목록:", data);
      setRooms(data);
    } catch (err) {
      console.error("방 목록 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // ✅ 입장 모달
  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  // ✅ 방 생성 모달
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  // ✅ 비밀번호 확인 후 입장
  const handleEnter = async (room, nickname, password) => {
    try {
      const result = await checkEnterPassword(room.roomId, password);
      console.log("입장 결과:", result);

      // 백엔드 응답 문자열 기준 (입장 성공 문구 체크)
      if (
        result.includes("입장 비밀번호 일치") ||
        result.includes("입장 가능") ||
        result.includes("성공")
      ) {
        alert("입장 성공!");
        navigate(`/chat/${room.roomId}?name=${encodeURIComponent(nickname)}`);
      } else {
        alert(result);
      }
    } catch (err) {
      console.error("입장 실패:", err);
      alert("입장 중 오류가 발생했습니다.");
    }
  };

  // ✅ 방 생성 로직
  const handleCreateRoom = async (roomData) => {
    try {
      await createRoom(roomData);
      alert("✅ 새 채팅방이 생성되었습니다!");
      closeCreateModal();
      fetchRooms(); // 목록 갱신
    } catch (err) {
      console.error("방 생성 실패:", err);
      alert("채팅방 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">💬 채팅방 목록</h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={openCreateModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + 새 채팅방 만들기
        </button>
      </div>

      {rooms.length === 0 ? (
        <p className="text-center text-gray-500">현재 생성된 채팅방이 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {rooms.map((room) => (
            <li
              key={room.roomId}
              onClick={() => openModal(room)}
              className="cursor-pointer border rounded p-4 hover:bg-gray-100 transition"
            >
              <div className="font-semibold text-lg">{room.roomName}</div>
              <div className="text-sm text-gray-500">
                생성일: {new Date(room.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ 입장 모달 */}
      {isModalOpen && selectedRoom && (
        <NicknameModal
          room={selectedRoom}
          onClose={closeModal}
          onConfirm={handleEnter} // ✅ 수정된 handleEnter 구조
        />
      )}

      {/* ✅ 방 생성 모달 */}
      {isCreateModalOpen && (
        <CreateRoomModal onClose={closeCreateModal} onCreate={handleCreateRoom} />
      )}
    </div>
  );
};

export default RoomList;
