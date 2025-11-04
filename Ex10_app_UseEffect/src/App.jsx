import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [count, setCount] = useState(1);
  const [name, setName] =useState('');
  
  const handleCountUpdate = () =>
    setCount(count + 1);
  
  const handleInputChange = (e) =>
    setName(e.target.value);

  //useEffect 랜더링 (호출) 마운트, 업데이트(state값 변환, 언마운트)
  useEffect(
    ()=>{
      console.log("매번 랜더링....")
    }
  )
  //마운트 한번 , count 라는 useState 변화 될 때마다
 useEffect(
    ()=>{
      console.log("count 변화 될때 랜더링..")
    },[count]
  )
 
  useEffect(
    ()=>{
      console.log("name 변화 될때 랜더링..")
    
    },[name]
  )
  //마운트 한번 (초기화)
   useEffect(
    ()=>{
      console.log("[] 변화 될때 랜더링..")
    
    },[]
  )
  return (
    <div className='App'>
      <button onClick={handleCountUpdate}>Count_update</button><br/>
      <span>count:{count}</span><br/>
      <input type="text" value={name} onChange={handleInputChange}/>  
    </div>
  )
}

export default App
