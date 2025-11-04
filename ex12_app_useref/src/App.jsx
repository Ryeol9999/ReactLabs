import { useState ,useRef } from 'react'
import './App.css'

function App() {
  //useState, 지역변수, useRef 차이를 이해하고 (랜더링의미에서 > 함수 재호출)
  
  const [count, setCount] = useState(0)
  const countRef = useRef(0) //내부적으로 {current : 0} >countRef.current 접근방식
  //let countvar = 0;


  console.log("countRef : " + countRef);
  console.log("App 랜더링....");

  const increaseCount = () => {
    setCount(count + 1);
  }

  const increaseRef = () => {
    countRef.current = countRef.current + 1;
    console.log("ref : " + countRef.current)
  }
  
  return (
    <div className="App">
          <p>useState : {count}</p>
          <p>useRef : {countRef.current}</p>

          <button onClick={increaseCount}>useState증가</button>
          <button onClick={increaseRef}>useRef증가</button>
    </div>
  )
}

export default App
