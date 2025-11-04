import { useState } from 'react'
import './App.css'
import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';

function App() {
  const [todos, setTodos] = useState([]); //빈배열이 초기값
  //함수가 리랜더링되어도 값을 유지한다

  //값을 추가하는 함수
  const addTodo = (todo) =>{
    //기존 배열에 추가
    setTodos([...todos,todo]); //기존배열을 복제해서 펼처놓고 (spread 연산자)
  }

  //값을 삭제하는 함수
  const removeTodo = (index) => {
    //Javascript Array
    //isArray, map, foreach, filter (4총사 반드시 알기)
    /*
      let array = [3,5,11,0,9,"String"]
      let result = array.filter(value) => value <10)
      결과는 [3, 5, 0, 9]
    */

      setTodos(todos.filter((_,i) => i !== index ));  //index와 같지 않은 것만 다시 추출
      // (i) > 배열의값을받아요
      // (_,i) > 배열의 요소값 .... 나 배열의 값을 쓰지 않을 꺼야 (_ 무시)

      /*
        const todos ['A','B,'C'];
        const index =1; 'B' 를제거

        const newTodos = todos.filter((_,i) => i !==index);
        결과 = ['A', 'C']
      */

        /*
        const numbers = [1,2,3,4,5,6,7,8,9,10];
        1. const evenNumbers = numbers.filter(num => num % 2 === 0); 암시적 리턴
        2.  { } 명시적 return 
        const evenNumbers = numbers.filter(num => { return num % 2 === 0});

        결과 : [2,4,6,8,10]
     */

  }
  return (
    
    <div style={{padding:'15px'}}>
        <h3>Todo List</h3>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} removeTodo={removeTodo}/>

      </div>
   )
}

export default App
