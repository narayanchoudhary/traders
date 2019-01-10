const remote = window.require("electron").remote;
const hammalsDB = remote.getGlobal('hammalsDB');

export const toggleNewHammalModal = (dispatch) => {
    dispatch({
        type: "TOGGLE_NEW_HAMMAL_MODAL",
        payload: {}
    });
}

export const fetchHammals = (dispatch) => {
    hammalsDB.find({}).sort({ createdAt: -1 }).exec((err, hammals) => {

        // convert Hammals into key-value pairs of option for react-select
        const hammalOptions = hammals.map((hammal) => {
            return { value: hammal._id, label: hammal.hammalName }
        });
        
        dispatch({
            type: "FETCH_HAMMALS",
            payload: { hammals, hammalOptions }
        });
    });
}