const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return action.payload;
        default:
            return state;
    }
};

export default loadingReducer;
