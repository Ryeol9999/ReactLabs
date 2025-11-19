import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, removeTodo }) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          index={index}
          removeTodo={removeTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
