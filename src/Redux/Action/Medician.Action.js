import { BASE_URL } from '../../Base_url/Base_url';
import { deleteAllMedicines, getAllMedicines, postAllMedicines, putAllMedicines } from '../../Common/apis/Medician.apis';
import * as ActionType from '../ActionType'

export const GetMedician = () => (dispatch) => {
    try {
        dispatch(LodingMedicine())

        setTimeout(function () {
            getAllMedicines()
              .then((data) => dispatch({ type: ActionType.GET_DATA, payload: data.data }))
            // fetch(BASE_URL + 'Medician')
            //     .then(response => {
            //         if (response.ok) {
            //             return response;
            //         } else {
            //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
            //             error.response = response;
            //             throw error;
            //         }
            //     },
            //         error => {
            //             var errmess = new Error(error.message);
            //             throw errmess;
            //         })
            //     .then((response) => response.json())
            //     .then((data) => dispatch({ type: ActionType.GET_DATA, payload: data }))
        }, 2000)

    } catch (error) {

    }
}


export const AddMedicine = (data) => (dispatch) => {
    try {
        postAllMedicines(data)
        .then((data) =>dispatch({ type: ActionType.ADD_DATA, payload: data.data }))
        .catch(error => dispatch(ErrorMedicine(error.message)))
        // fetch(BASE_URL + 'Medician/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then(response => response.json())
        //     .then((data) =>
        //         dispatch({ type: ActionType.GET_DATA, payload: data }))
    } catch (error) {
        dispatch(ErrorMedicine(error.message));
    }
}

export const DeleteMedicine = (id) => (dispatch) => {
    try {
        deleteAllMedicines(id)
            .then(dispatch({ type: ActionType.DELETE_DATA, payload: id }))
            .catch(error => dispatch(ErrorMedicine(error.message)))
        // fetch(BASE_URL + 'Medician/' + id, {
        //     method: 'DELETE'
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then(response => response.json())
        //     .then((id) => dispatch({ type: ActionType.DELETE_DATA, payload: id }))
    } catch (error) {
        dispatch(ErrorMedicine(error.message));
    }
}
export const LodingMedicine = () => (dispatch) => {
    dispatch({ type: ActionType.LOADING_DATA })
}

export const ErrorMedicine = () => (dispatch) => {
    dispatch({ type: ActionType.ERROR_DATA })
}

export const UpdateMedicine = (data) => (dispatch) => {
    try {
        putAllMedicines(data)
        .then((data) => dispatch({ type: ActionType.UPDATE_DATA, payload: data.data }))
        .catch(error => dispatch(ErrorMedicine(error.message)))
        // fetch(BASE_URL + 'Medician/' + data.id, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then(response => response.json())
        //     .then((data) => dispatch({ type: ActionType.UPDATE_DATA, payload: data }))
    } catch (error) {
        dispatch(ErrorMedicine(error.message));
    }
}