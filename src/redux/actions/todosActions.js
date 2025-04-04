import { setLoading } from './loadingActions';
import { setError } from './errorActions';

const API_URL = 'http://localhost:3000/todos';

export const setTodos = (todos) => ({
    type: 'SET_TODOS',
    payload: todos,
});

export const addTodoAction = (todo) => ({
    type: 'ADD_TODO',
    payload: todo,
});

export const updateTodoAction = (id, title) => ({
    type: 'UPDATE_TODO',
    payload: { id, title },
});

export const deleteTodoAction = (id) => ({
    type: 'DELETE_TODO',
    payload: id,
});

export const fetchTodos = () => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
            }
            const data = await response.json();
            dispatch(setTodos(data));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const addTodo = (newTodo) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTodo }),
            });
            if (!response.ok) {
                throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
            }
            const addedTodo = await response.json();
            dispatch(addTodoAction(addedTodo));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const updateTodo = (id, newTitle) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTitle }),
            });
            if (!response.ok) {
                throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
            }
            dispatch(updateTodoAction(id, newTitle));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const deleteTodo = (id) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
            }
            dispatch(deleteTodoAction(id));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };
};
