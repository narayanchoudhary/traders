const initialState = {
    partyToBeEdited: null
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PARTY_TO_BE_EDITED":
            return {
                ...state,
                partyToBeEdited: action.payload
            }
        default:
            return state;
    }

}

export default addressReducer;