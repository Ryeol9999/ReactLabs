import React from 'react';
import { useState } from 'react';

//내가 만드는 훅
export function useInput(initValue, submitAction) { // hello , 함수 <- 핸들서브밋에서 불러지는 함수
    
    const [inputValue , setInputValue] = useState(initValue); // 초기값

    const handleChange = (e) => {
            setInputValue(e.target.value)
    }

    const handleSubmit = () => {  
        setInputValue('');
        submitAction(initValue); // useInput(initValue, submitAction)
    }
   
    return [inputValue , handleChange , handleSubmit];
}