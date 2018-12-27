const initialState = {
    addresses: [],
    addressOptions: [], // key value pairs { value: 'd8je93uiyo', label: 'dharawara' }
    isNewAddressModalOpen: false
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_NEW_ADDRESS_MODAL":
            return { ...state, isNewAddressModalOpen: !state.isNewAddressModalOpen };
        case "FETCH_ADDRESSES":
            return {
                ...state,
                addresses: action.payload.addresses,
                addressOptions: action.payload.addressOptions
            }
        default:
            return state;
    }

}

export default addressReducer;