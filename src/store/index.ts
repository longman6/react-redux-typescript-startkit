import { combineReducers, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import todosReducer from './todoSlice';
import issuesSlicer from './issuesSlice';


const rootReducer = combineReducers({
  todos: todosReducer, 
  issues: issuesSlicer
});


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer; 

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>