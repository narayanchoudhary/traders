const initialState = {
    items: [],
    itemOptions: [], // key value pairs { value: 'd8je93uiyo', label: 'dharawara' }
    isNewItemModalOpen: false
};

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_NEW_ITEM_MODAL":
            return { ...state, isNewItemModalOpen: !state.isNewItemModalOpen };
        case "FETCH_ITEMS":
            return {
                ...state,
                items: action.payload.items,
                itemOptions: action.payload.itemOptions
            }
        default:
            return state;
    }

}

export default itemReducer;