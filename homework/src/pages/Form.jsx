import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Form = () => {
  const location = useLocation();
  const existingData =location.state;
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  useEffect(() => {
    if (existingData) {
      setTitle(existingData.title);
      setContent(existingData.content);
    }
  }, [existingData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = existingData ? 'PUT' : 'POST';
    const url = existingData
      ? `http://localhost:8090/api/posts/${existingData.id}`
      : 'http://localhost:8090/api/posts';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('등록 성공:', data);
        alert(existingData ? '수정 완료' : '등록 완료');
        navigate(!existingData ? '/list' : `/detail/${data.id}`);
      })
      .catch((err) => console.error('에러:', err));
  };

  return (
    <div className="container">
      <h2>{existingData ? '게시글 수정' : '새 글 작성'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">{existingData ? '수정' : '등록'}</button>
      </form>
    </div>
  );
};

export default Form;
