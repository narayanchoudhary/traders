const remote = window.require("electron").remote;
const itemsDB = remote.getGlobal('itemsDB');

export const toggleNewItemModal = (dispatch) => {
    dispatch({
        type: "TOGGLE_NEW_ITEM_MODAL",
        payload: {}
    });
}

export const fetchItems = (dispatch) => {
    itemsDB.find({}).sort({ createdAt: -1 }).exec((err, items) => {

        // convert Items into key-value pairs of option for react-select
        const itemOptions = items.map((item) => {
            return { value: item._id, label: item.itemName }
        });
        
        dispatch({
            type: "FETCH_ITEMS",
            payload: { items, itemOptions }
        });
    });
}