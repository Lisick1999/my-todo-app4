const newTodoReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NEW_TODO':
            return action.payload;
        default:
            return state;
    }
};

export default newTodoReducer;
