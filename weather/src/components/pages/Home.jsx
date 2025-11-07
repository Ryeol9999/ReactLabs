import React, { useEffect, useState } from 'react';

const Detail = () => {
  const [inputCity, setInputCity] = useState('Seoul'); // 입력창용
  const [city, setCity] = useState('Seoul'); // 실제 API 요청용
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!city) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a6ca586553e2f2cb5bec3986dc7a85bd&units=metric&lang=kr`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('날씨 데이터:', data);
        setWeather(data);
      })
      .catch((err) => console.error('오류:', err));
  }, [city]); // ✅ city가 바뀔 때만 새로 요청

  if (!weather) return <p>불러오는 중...</p>;

  // ✅ 엔터를 눌렀을 때 city 변경
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setCity(inputCity);
    }
  };

  return (
    <div className="text-center mt-10">
      <input
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
        onKeyDown={handleKeyPress} // ✅ 엔터 입력 감지
        placeholder="도시 이름 입력 (예: Seoul)"
        className="border px-2 py-1"
      />
      <h2>{weather.name}의 날씨</h2>
      <p>{weather.weather[0].description}</p>
      <p>🌡 온도: {weather.main.temp}°C</p>
      <p>💧 습도: {weather.main.humidity}%</p>
    </div>
  );
};

export default Detail;
