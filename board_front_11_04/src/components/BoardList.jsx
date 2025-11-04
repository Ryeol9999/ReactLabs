import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function BoardList() {
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const size = 10;

  useEffect(() => {
    axios
      .get(`http://192.168.2.13:8090/api/boards?page=${page}&size=${size}`)
      .then((res) => {
        setBoards(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => console.error(err));
  }, [page]);

  const totalPages = Math.ceil(total / size);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">📋 게시판 목록</h2>
      <table className="table table-bordered table-hover text-center">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board) => (
            <tr key={board.id}>
              <td>{board.id}</td>
              <td>{board.title}</td>
              <td>{board.writer}</td>
              <td>
                {board.createdAt
                  ? new Date(board.createdAt).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${page === i + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default BoardList;
