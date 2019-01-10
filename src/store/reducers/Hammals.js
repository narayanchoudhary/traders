const initialState = {
    hammals: [],
    hammalOptions: [], // key value pairs { value: 'd8je93uiyo', label: 'dharawara' }
    isNewHammalModalOpen: false
};

const hammalReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_NEW_HAMMAL_MODAL":
            return { ...state, isNewHammalModalOpen: !state.isNewHammalModalOpen };
        case "FETCH_HAMMALS":
            return {
                ...state,
                hammals: action.payload.hammals,
                hammalOptions: action.payload.hammalOptions
            }
        default:
            return state;
    }

}

export default hammalReducer;