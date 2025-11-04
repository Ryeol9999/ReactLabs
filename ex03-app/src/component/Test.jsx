import React from 'react';
//rsc 함수형 컴포넌트 자동생성
const Test = () => {
    const name ="김유신";
    const age= 25;
    
    
    return (
        <div>
            <h3>{name}</h3>
            <p>{age >= 20 ? "성인" : "미성년자"}</p>
        </div>
    );
};
//rsc 함수형 컴포넌트 자동생성 
export default Test;



