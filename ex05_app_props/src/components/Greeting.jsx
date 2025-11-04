import React from 'react';

const Greeting = (props) => {  //props로받으면 props. 로받아야함
// 
    return (
        <div>
            <h1>hello, {props.name}</h1>
            <h1>hello, {props.uname}</h1>
            <h1>hello, {props.count}</h1>
        </div>
    );
};

export default Greeting;