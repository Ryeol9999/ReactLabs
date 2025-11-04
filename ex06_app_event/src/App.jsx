import { useState } from 'react';
import './App.css'

function App() {
  //event
  console.log("App 함수 호출");

  const [count, setCount] = useState(0);
  const [text, setText] =  useState('');
  
  let nomalCount = 0 ; //지역변수 (상태변수로 저장이안됨 리랜더링될때마다 초기화됨)
  const handleClick= () =>{
    nomalCount += 1;
    setCount(count +1);
    console.log("nomalCount : " + nomalCount);
    console.log("Count :" + count);
  }
  const inputClick = (e) =>{
    setText(e.target.value);
  }
  return (
    <div className='App'>
      <p> count : {count}</p>
      <button onClick={handleClick} >count 증가</button>
      <hr></hr>
      <input type='text'value={text} onChange={inputClick}></input>
      <p>Enter text : {text}</p>
    </div>  
  )
}

export default App
