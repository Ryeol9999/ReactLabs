import React from "react";
import "./RoomCard.css";

const RoomCard = ({ room, onClick }) => {
  const createdAt = room.createdAt
    ? new Date(room.createdAt).toLocaleString()
    : "생성일 정보를 불러올 수 없습니다.";
  const initial = room.roomName ? room.roomName.charAt(0).toUpperCase() : "?";

  return (
    <li className="room-card" onClick={() => onClick(room)}>
      <div className="room-card__avatar" aria-hidden>
        {initial}
      </div>
      <div className="room-card__content">
        <h3 className="room-card__name">{room.roomName}</h3>
        <p className="room-card__meta">{createdAt}</p>
      </div>
      <div className="room-card__cta">입장하기</div>
    </li>
  );
};

export default RoomCard;
