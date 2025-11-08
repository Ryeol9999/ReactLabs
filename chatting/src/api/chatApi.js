import axios from "axios";

const BASE_URL = "http://192.168.2.22:8090/api/chat";;

// ✅ 전체 방 목록 조회
export const getRooms = async () => {
  const res = await axios.get(`${BASE_URL}/rooms`);
  return res.data;
};

// ✅ 방 입장 비밀번호 확인
export const checkEnterPassword = async (roomId, password) => {
  const res = await axios.post(`${BASE_URL}/rooms/${roomId}/check-enter?password=${password}`);
  return res.data;
};

// ✅ 새 채팅방 생성
export const createRoom = async (roomData) => {
  const res = await axios.post(`${BASE_URL}/rooms`, roomData);
  return res.data;
};

export const getMessagesByRoomId = async (roomId) => {
  const res = await axios.get(`${BASE_URL}/messages/${roomId}`);
  return res.data;
};



export const deleteRoom = async (roomId, password) => {
  const res = await axios.delete(
    `${BASE_URL}/rooms/${roomId}?password=${password}`
  );
  return res.data;
};