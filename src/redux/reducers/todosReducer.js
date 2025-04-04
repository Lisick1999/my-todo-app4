const initialState = [];

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TODOS':
            return action.payload;
        case 'ADD_TODO':
            return [...state, action.payload];
        case 'UPDATE_TODO':
            return state.map(todo =>
                todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.payload);
        default:
            return state;
    }
};

export default todosReducer;
