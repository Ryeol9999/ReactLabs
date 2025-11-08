import React, { useState } from "react";
import "./Modal.css";
import "./CreateRoomModal.css";

const CreateRoomModal = ({ onClose, onCreate }) => {
  const [roomName, setRoomName] = useState("");
  const [enterPassword, setEnterPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  const handleCreate = () => {
    if (!roomName.trim()) return alert("방 이름을 입력하세요!");
    if (!enterPassword.trim() || !deletePassword.trim()) {
      alert("비밀번호를 모두 입력하세요!");
      return;
    }

    onCreate({
      roomName,
      enterPassword: parseInt(enterPassword, 10),
      deletePassword: parseInt(deletePassword, 10),
    });
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <header className="modal-header">
          <span className="modal-icon" aria-hidden>
            🆕
          </span>
          <div>
            <h2 className="modal-title">새 채팅방 생성</h2>
            <p className="modal-description">
              서로 다른 입장/삭제 비밀번호를 설정해 안전하게 관리하세요.
            </p>
          </div>
        </header>

        <div className="modal-body">
          <label className="modal-label" htmlFor="roomName">
            방 이름
          </label>
          <input
            id="roomName"
            type="text"
            className="modal-input"
            placeholder="예: 프로젝트 논의방"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />

          <label className="modal-label" htmlFor="enterPassword">
            입장 비밀번호
          </label>
          <input
            id="enterPassword"
            type="number"
            className="modal-input"
            placeholder="숫자 비밀번호"
            value={enterPassword}
            onChange={(e) => setEnterPassword(e.target.value)}
          />

          <label className="modal-label" htmlFor="deletePassword">
            삭제 비밀번호
          </label>
          <input
            id="deletePassword"
            type="number"
            className="modal-input"
            placeholder="숫자 비밀번호"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="modal-button" type="button" onClick={onClose}>
            닫기
          </button>
          <button
            className="modal-button modal-button--primary"
            type="button"
            onClick={handleCreate}
          >
            생성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;
