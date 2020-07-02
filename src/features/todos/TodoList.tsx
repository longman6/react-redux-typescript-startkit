import React from 'react';
import { ITodo } from 'interfaces/todo';

interface Props {
  todos: ITodo[], 
  onToggleTodo: (id: number) => void
}

const TodoList = ({
  todos,  
  onToggleTodo
}:Props) => {
  return (
    <ul>
      {
        todos.map( (todo) => (
          <li 
            onClick={() =>onToggleTodo(todo.id)} 
            style={{ textDecoration : todo.completed ? 'line-through' : undefined}}
            key={todo.id}
          >
            {todo.text}
          </li>
        ))
      }
    </ul>
  );
};

export default TodoList;