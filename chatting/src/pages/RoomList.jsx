import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms, checkEnterPassword, createRoom } from "../api/chatApi";
import NicknameModal from "../components/NicknameModal";
import CreateRoomModal from "../components/CreateRoomModal";
import RoomCard from "../components/RoomCard";
import "./RoomList.css";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (err) {
      console.error("방 목록 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const handleEnter = async (room, nickname, password) => {
    try {
      const result = await checkEnterPassword(room.roomId, password);

      if (
        result.includes("입장 비밀번호 일치") ||
        result.includes("입장 가능") ||
        result.includes("성공")
      ) {
        navigate(`/chat/${room.roomId}?name=${encodeURIComponent(nickname)}`);
      } else {
        alert(result);
      }
    } catch (err) {
      console.error("입장 실패:", err);
      alert("입장 중 오류가 발생했습니다.");
    }
  };

  const handleCreateRoom = async (roomData) => {
    try {
      await createRoom(roomData);
      closeCreateModal();
      fetchRooms();
    } catch (err) {
      console.error("방 생성 실패:", err);
      alert("채팅방 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="room-list-page">
      <div className="room-list-shell">
        <header className="room-list-header">
          <div className="room-list-heading">
            <p className="room-list-subtitle">오늘의 팀 대화</p>
            <h1 className="room-list-title">채팅방을 선택하세요</h1>
          </div>
          <button className="room-list-create" onClick={openCreateModal}>
            + 새 채팅방 만들기
          </button>
        </header>

        <section className="room-list-content">
          {rooms.length === 0 ? (
            <div className="room-list-empty">
              아직 생성된 채팅방이 없습니다. 첫 번째 대화를 시작해보세요!
            </div>
          ) : (
            <ul className="room-list-grid">
              {rooms.map((room) => (
                <RoomCard key={room.roomId} room={room} onClick={openModal} />
              ))}
            </ul>
          )}
        </section>
      </div>

      {isModalOpen && selectedRoom && (
        <NicknameModal room={selectedRoom} onClose={closeModal} onConfirm={handleEnter} />
      )}

      {isCreateModalOpen && (
        <CreateRoomModal onClose={closeCreateModal} onCreate={handleCreateRoom} />
      )}
    </div>
  );
};

export default RoomList;
