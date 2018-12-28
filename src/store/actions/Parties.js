const remote = window.require("electron").remote;
const partiesDB = remote.getGlobal('partiesDB');
const addressesDB = remote.getGlobal('addressesDB');

export const fetchParty = (partyId, thenCallback) => {
    return (dispatch) => {
        partiesDB.findOne({ _id: partyId }, (err, party) => {
            addressesDB.findOne({ _id: party.address }, (err, address) => {
                dispatch({
                    type: "FETCH_PARTY_TO_BE_EDITED",
                    payload: { partyName: party.partyName, address: { value: address._id, label: address.address } }
                });
                thenCallback && thenCallback();
            });
        });
    }
}

export const fetchParties = (thenCallback) => {
    return (dispatch) => {
        partiesDB.find({}, (err, parties) => {
            let partyOptions = [];
            parties.forEach(party => {
                partyOptions.push({
                    value: party._id,
                    label: party.partyName,
                });
            });

            dispatch({
                type: "FETCH_PARTIES",
                payload: { parties, partyOptions }
            });
            thenCallback && thenCallback();
        });
    }
}

export const toggleNewPartyModal = (dispatch) => {
    dispatch({
        type:"TOGGLE_NEW_PARTY_MODAL",
        payload: {}
    });
}