const remote = window.require("electron").remote;
const storesDB = remote.getGlobal('storesDB');

export const toggleNewStoreModal = (dispatch) => {
    dispatch({
        type: "TOGGLE_NEW_STORE_MODAL",
        payload: {}
    });
}

export const fetchStores = (dispatch) => {
    storesDB.find({}).sort({ createdAt: -1 }).exec((err, stores) => {

        // convert Stores into key-value pairs of option for react-select
        const storeOptions = stores.map((store) => {
            return { value: store._id, label: store.store }
        });

        dispatch({
            type: "FETCH_STORES",
            payload: { stores, storeOptions }
        });
    });
}