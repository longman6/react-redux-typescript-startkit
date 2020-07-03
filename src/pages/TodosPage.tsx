import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { addTodo, toggleIsDone, } from 'store/todoSlice';
import { RootState } from 'store';
import TodoList from 'features/todos/TodoList';
import AddTodoForm from 'features/AddTodoForm';


const TodosPage = () => {
  const dispatch = useDispatch();
  const todos = useSelector( (state: RootState) => state.todos);
  const onToggleTodo = ( id: number ) => {
    dispatch(toggleIsDone({id}))
  }
  const onAddTodo = (text:string) =>{
    dispatch(addTodo({text}))
  }
  return (
    <>
      <TodoList
        todos={todos} 
        onToggleTodo={onToggleTodo}
      />
      <AddTodoForm 
        onAddTodo={onAddTodo}
      />
    </>
  );
};

export default TodosPage;