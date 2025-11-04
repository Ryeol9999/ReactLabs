import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({todos, removeTodo}) => {
    //todos 할일목록 :['잠자기', '밥먹기'] ....
    //TodoItem 목록만들기(배열의 개수 만큼)
    
    //javascript 함수 (forEach, map, filter)
    //map(Value, index, array) POINT > 목록
    return (
        <ul>
            {
               todos.map((todo,index) => (
                    <TodoItem key={index} todo={todo} index= {index} removeTodo={removeTodo}/>
               )) 
            }
        </ul>
    );
};

export default TodoList;