const initialState = {
    stores: [],
    storeOptions: [], // key value pairs { value: 'd8je93uiyo', label: 'dharawara' }
    isNewStoreModalOpen: false
};

const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_NEW_STORE_MODAL":
            return { ...state, isNewStoreModalOpen: !state.isNewStoreModalOpen };
        case "FETCH_STORES":
            return {
                ...state,
                stores: action.payload.stores,
                storeOptions: action.payload.storeOptions
            }
        default:
            return state;
    }

}

export default storeReducer;