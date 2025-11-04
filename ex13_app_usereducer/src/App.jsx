import { useState,useReducer } from 'react'
import './App.css'

// 자바의 열거형 처리 또는 DB 코드 테이블처럼 
//객체 형태로 01.입금, 02.출금,

const ACTION_TYPE ={
  deposit:'deposit',
  withdraw : 'withdraw',

}

const reducer = (state,action) => {  //state 값, //action 논리
  switch(action.type){
      case ACTION_TYPE.deposit  : return state + action.payload;  //입금
      case ACTION_TYPE.withdraw : return state - action.payload;  //입금
      

  }
}

/*
reduce = 로직 state(값) 변경하는 논리
action : 행위에 따라서 논리가 적용(입금, 출금, 계좌생성, 송금)
dispatch : 은행직원에게 요구(...)

행위
입금, 출금
onclick 이벤트 발생 > dispatch() 부르면 > reducer 호출

*/
function App() {
  const [number, setNumber] = useState(0);
  const [money,dispatch] = useReducer(reducer,0);

  return (
    <div className='App'>
      <h3>KOSA 은행</h3>
      <h3>현재 잔액 {money}</h3><hr />

      <input type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))}  step="1000"/>      
      <hr />
      <button onClick={() => {dispatch({type:"deposit", payload:number})}}> 예금하기</button>
      <hr />
      <button onClick={() => {dispatch({type:"withdraw", payload:number})}}>출금하기</button>
      
    </div>
  )
}

export default App
