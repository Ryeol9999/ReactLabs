import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// {
//     "id": 1,
//     "title": "게시글 2",
//     "content": "스프링 게시글 테스트 2"
// }


const Detail = () => {
    const { id } = useParams(); // ✅ URL에서 id 추출
    const [detail,setDetail] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
            fetch(`http://localhost:8090/api/posts/${id}`)
            .then(res => res.json())
            .then(data => setDetail(data))
            .catch(err => console.error(err));
            }, [id]);

const handleDelete = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    fetch(`http://localhost:8090/api/posts/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('삭제 실패');
        alert('삭제되었습니다.');
        navigate('/list'); // ✅ 삭제 후 목록 페이지로 이동
      })
      .catch(err => console.error(err));
  };

  const handleUpdate = () =>{
    navigate('/form', { state: detail }); 
  }
    



    return (
        <div className="container">
      <h2>게시글 상세보기</h2>
      {detail ? (
        <div>
          <p><strong>ID:</strong> {detail.id}</p>
          <p><strong>제목:</strong> {detail.title}</p>
          <p><strong>내용:</strong> {detail.content}</p>
          <button onClick={handleDelete}>삭제</button>
          <button onClick={handleUpdate}>수정</button>
          
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
    );
};

export default Detail;