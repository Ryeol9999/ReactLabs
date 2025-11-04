import { useState } from 'react'
import './App.css'
import { useMemo } from 'react';

//복잡한 계산
const hardCalculate  = (number) => {
  console.log("복잡한 논리를 가지는 계산")
  for(let i = 0;i <99999999; i++){  //복잡한 논리

  }

  return number + 10000;
}

//쉬운 계산


const easyCalculate = (number) =>{
  console.log("쉬운계산");
  return number + 1;
}

function App() {
  const [hardNumber, setHardNumber] = useState(1);
  //hardNumber 값이 변경되면 App() 다시 호출
  
  const [easyNumber,setEasyNumber] =useState(1);
  //EasyNumber 값이 변경되면 App() 다시 호출

 // const  hardSum = hardCalculate(hardNumber);
  const hardSum =useMemo(() => {return hardCalculate()},[hardNumber]);
 const  easySum = easyCalculate(easyNumber);


  return (
    
      <div className='App'>
        <h3>복잡한 계산기 논리 수행</h3>
        <input type='number' value={hardNumber} onChange={(e) => setHardNumber(parseInt(e.target.value))} />
        <span> + 10000 ={hardSum}</span>

        
        <h3>쉬운 계산기 논리 수행</h3>
        <input type='number' value={easyNumber} onChange={(e) => setEasyNumber(parseInt(e.target.value))} />
        <span> + 1 ={easySum}</span>

      </div>
    
  )
}

export default App


/*
아래코드의 문제점
1, 복잡한 논리 함수
2. 단순한 논리 함수


useState 변경되면 App() 재호출 >> 재랜더링 되었을떄
함수도 같이 호출

2개의 함수
나는 단순한 논리 함수....;

해결)
        useMemo는 메모이제이션(Memoization)을 통해 특정 값이 변경될 때만 재계산을 수행하도록 
        하여 불필요한 연산을 줄여줍니다
        값(useState)이 변하지 않으면 이전에 계산된 값을 재사용하는 것입니다. 
        이 방법은 특히 계산 비용이 큰 연산을 할 때 유용합니다.
        
        결국 ...useState  변경시에만 특정 계산을 수행

const easyCalculate = (number) =>{
  console.log("쉬운계산");
  return number + 1;
}

function App() {
  const [hardNumber, setHardNumber] = useState(1);
  //hardNumber 값이 변경되면 App() 다시 호출
  
  const [easyNumber,setEasyNumber] =useState(1);
  //EasyNumber 값이 변경되면 App() 다시 호출

  const  hardSum = hardCalculate(hardNumber);
  const  easySum = easyCalculate(easyNumber);

  return (
    
      <div className='App'>
        <h3>복잡한 계산기 논리 수행</h3>
        <input type='number' value={hardNumber} onChange={(e) => setHardNumber(parseInt(e.target.value))} />
        <span> + 10000 ={hardSum}</span>

        
        <h3>쉬운 계산기 논리 수행</h3>
        <input type='number' value={easyNumber} onChange={(e) => setEasyNumber(parseInt(e.target.value))} />
        <span> + 1 ={easySum}</span>

      </div>
    
  )
}

export default App
*/