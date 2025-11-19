import React from "react";

const TodoItem = ({ todo, index, removeTodo }) => {
  return (
    <li style={{ margin: "10px 0" }}>
      {todo}
      <button
        onClick={() => removeTodo(index)}
        style={{ marginLeft: "10px", padding: "5px" }}
      >
        삭제
      </button>
    </li>
  );
};

export default TodoItem;
