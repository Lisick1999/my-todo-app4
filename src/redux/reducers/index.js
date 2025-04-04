import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';
import filterReducer from './filterReducer';
import newTodoReducer from './newTodoReducer';

const rootReducer = combineReducers({
    todos: todosReducer,
    loading: loadingReducer,
    error: errorReducer,
    filter: filterReducer,
    newTodo: newTodoReducer,
});

export default rootReducer;
