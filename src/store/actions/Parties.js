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
                thenCallback();
            });
        });
    }
}

export const fetchParties = (thenCallback) => {
    return (dispatch) => {
        partiesDB.find({}, (err, parties) => {
            addressesDB.find({}, (err, address) => {
                
            });
        });
    }
}