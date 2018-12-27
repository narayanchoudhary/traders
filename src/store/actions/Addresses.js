const remote = window.require("electron").remote;
const addressesDB = remote.getGlobal('addressesDB');

export const toggleNewAddressModal = (dispatch) => {
    dispatch({
        type: "TOGGLE_NEW_ADDRESS_MODAL",
        payload: {}
    });
}

export const fetchAddresses = (dispatch) => {
    addressesDB.find({}).sort({ createdAt: -1 }).exec((err, addresses) => {

        // convert Addresses into key-value pairs of option for react-select
        const addressOptions = addresses.map((address) => {
            return { value: address._id, label: address.address }
        });

        dispatch({
            type: "FETCH_ADDRESSES",
            payload: { addresses, addressOptions }
        });
    });
}