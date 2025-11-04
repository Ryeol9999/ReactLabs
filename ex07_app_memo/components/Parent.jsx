import React from 'react';
import { useState } from 'react';
import Child from './Child';

const Parent = () => {
    console.log("child component 가 렌더링 되어있습니다 .. 호출")
    console.log ("Parent component 가 렌더링 되어있습니다");

    const[count, setCount] = useState(0);
    const [name,setName] = useState("홍길동");

    return (
        <div>
            <h3>COunt : {count}</h3>
            <button onClick={() => setCount(count +1) }>count 증가</button>       
            <button onClick={() => setName("김유신") }>Props 값 변경 전달</button>       
            <hr/>
            <Child name={name}></Child>            
                 
               </div>
                    
    );
};

export default Parent;