import { createSlice, PayloadAction } from  '@reduxjs/toolkit';
import { ITodo }  from 'interfaces/todo';

let todoId = 1; 

const initialState: ITodo[] = [{
  id: todoId, 
  text: 'e-Poly 개발', 
  completed : false 
}];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: ( state, action : PayloadAction<ITodo>) => {
        const { id, text } = action.payload;
        state.push({ id, text, completed:false})
      }, 
      prepare: (payload: { text: string}) => ({
        payload: {
          text: payload.text, 
          id: ++todoId,
          completed: false
        }
      })
    }, 
    toggleIsDone: (state, {payload} : PayloadAction<{id: number}>) => {
     const todo = state.find(todo => todo.id === payload.id)
     if ( todo ) {
       todo.completed = ! todo.completed; 
     }
    },
    
    removeTodo: ( state, {payload} : PayloadAction<{id: number}>) => {
      state.slice(
        state.findIndex( (item) => item.id === payload.id), 1 
      )
    }
  }
});

export const { addTodo , toggleIsDone, removeTodo }  = todoSlice.actions;

export default todoSlice.reducer; 
