const initialState = {
    searchTerm: '',
    sortByAlphabet: false,
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        case 'SET_SORT_BY_ALPHABET':
            return { ...state, sortByAlphabet: action.payload };
        default:
            return state;
    }
};

export default filterReducer;
