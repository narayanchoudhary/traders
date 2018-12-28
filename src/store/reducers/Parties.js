const initialState = {
    parties: [],
    partiesOptions: [],
    partyToBeEdited: null,
    isNewPartyModalOpen: false,
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PARTY_TO_BE_EDITED":
            return {
                ...state,
                partyToBeEdited: action.payload
            }
        case "FETCH_PARTIES":
            return {
                ...state,
                parties: action.payload.parties,
                partyOptions: action.payload.partyOptions,
            }
        case "TOGGLE_NEW_PARTY_MODAL":
            return {
                ...state,
                isNewPartyModalOpen: !state.isNewPartyModalOpen
            }
        default:
            return state;
    }

}

export default addressReducer;