import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const List = () => {
  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지 (0부터 시작)
  const [totalPages, setTotalPages] = useState(0);
  const [inputPage, setInputPage] = useState(''); // 입력창용 상태

  useEffect(() => {
    fetch(`http://localhost:8090/api/posts?page=${page}&size=10`)
      .then((res) => res.json())
      .then((data) => {
        setLists(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [page]);

  // ✅ 페이지 이동 함수
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  // ✅ 그룹 이동 함수 (5개 단위)
  const handleGroupMove = (direction) => {
    const newPage = direction === 'prev' ? page - 5 : page + 5;
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    } else if (direction === 'prev') {
      setPage(0);
    } else if (direction === 'next') {
      setPage(totalPages - 1);
    }
  };

  // ✅ 숫자 입력으로 이동
  const handleInputSubmit = (e) => {
    e.preventDefault();
    const targetPage = parseInt(inputPage, 10) - 1;
    if (!isNaN(targetPage) && targetPage >= 0 && targetPage < totalPages) {
      setPage(targetPage);
      setInputPage('');
    } else {
      alert('유효한 페이지 번호를 입력하세요!');
    }
  };

  // ✅ 현재 페이지 기준으로 좌우 2개씩만 보이게
  const startPage = Math.max(0, page - 2);
  const endPage = Math.min(totalPages, page + 3);
  const visiblePages = Array.from({ length: endPage - startPage }, (_, i) => startPage + i);

  return (
    <div className="container">
      <h2>게시글 목록</h2>

      <ul>
        {lists.map((post) => (
          <li key={post.id}>
            <Link to={`/detail/${post.id}`}>
              {post.title} - {post.content}
            </Link>
          </li>
        ))}
      </ul>

      {/* ✅ 페이지네이션 영역 */}
      <div style={{ marginTop: '20px' }}>
        {/* 그룹 단위 이동 */}
        <button onClick={() => handleGroupMove('prev')} disabled={page === 0}>
          «
        </button>

        {/* 한 칸 왼쪽 */}
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
          &lt;
        </button>

        {/* 페이지 번호 */}
        {visiblePages.map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            style={{
              fontWeight: page === p ? 'bold' : 'normal',
              margin: '0 3px',
              color: page === p ? 'red' : 'black',
            }}
          >
            {p + 1}
          </button>
        ))}

        {/* 한 칸 오른쪽 */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page + 1 === totalPages}
        >
          &gt;
        </button>

        {/* 그룹 단위 이동 */}
        <button
          onClick={() => handleGroupMove('next')}
          disabled={page + 5 >= totalPages}
        >
          »
        </button>

        
        
      </div>
      <div>
      <form
          onSubmit={handleInputSubmit}
          style={{ display: 'inline-block', marginLeft: '10px' }}
        >
          <input
            type="number"
            min="1"
            max={totalPages}
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            style={{ width: '50px' }}
          /><br/>
          <button type="submit">이동</button>
        </form>

      <p style={{ marginTop: '10px' }}>
        {page + 1} / {totalPages} 페이지
      </p>
      </div>
    </div>
  );
};

export default List;
