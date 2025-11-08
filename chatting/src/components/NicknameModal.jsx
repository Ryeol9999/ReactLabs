import React, { useState } from "react";
import "./Modal.css";
import "./NicknameModal.css";

const NicknameModal = ({ room, onClose, onConfirm }) => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력하세요!");
      return;
    }
    if (!password.trim()) {
      alert("비밀번호를 입력하세요!");
      return;
    }

    onConfirm(room, nickname, password);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card nickname-modal">
        <header className="modal-header">
          <span className="modal-icon" aria-hidden>
            🔐
          </span>
          <div>
            <h3 className="modal-title">채팅방 입장</h3>
            <p className="modal-description">
              <strong>{room.roomName}</strong>에 입장하기 위해 정보를 입력해주세요.
            </p>
          </div>
        </header>

        <div className="modal-body">
          <label className="modal-label" htmlFor="nickname">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            className="modal-input"
            placeholder="사용할 닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <label className="modal-label" htmlFor="roomPassword">
            입장 비밀번호
          </label>
          <input
            id="roomPassword"
            type="password"
            className="modal-input"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="modal-button" type="button" onClick={onClose}>
            취소
          </button>
          <button
            className="modal-button modal-button--primary"
            type="button"
            onClick={handleConfirm}
          >
            입장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NicknameModal;
