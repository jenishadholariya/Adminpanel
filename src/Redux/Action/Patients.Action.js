import { BASE_URL } from '../../Base_url/Base_url';
import { getAllPatients, postAllPatients } from '../../Common/apis/Patients.apis';
import * as ActionType from '../ActionType'

export const GetPatients = () => (dispatch) => {
    try {

        dispatch(LoadingPatients())

        setTimeout(function () {
            getAllPatients()
                .then((data) => dispatch({ type: ActionType.PATIENTS_GETDATA, payload: data.data }))

            // fetch(BASE_URL + 'Patients')
            // .then(response => {
            //     if (response.ok) {
            //         return response;
            //     } else {
            //         var error = new Error('Error ' + response.status + ': ' + response.statusText);
            //         error.response = response;
            //         throw error;
            //     }
            // },
            //     error => {
            //         var errmess = new Error(error.message);
            //         throw errmess;
            //     })
            // .then((response) => response.json())
            // .then((data) => dispatch({ type: ActionType.PATIENTS_GETDATA, payload: data }))
        }, 2000)

    } catch (error) {

    }
}

export const DeletePatients = (id) => (dispatch) => {
    console.log(id);
    try {
        postAllPatients(id)
            .then(dispatch({ type: ActionType.PATIENTS_DELETEDATA, payload: id }))
        // fetch(BASE_URL + 'Patients/' + id, {
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
        //     .then((id) => dispatch({ type: ActionType.PATIENTS_DELETEDATA, payload: id }))
    } catch (error) {

    }
}

export const AddPatients = (data) => (dispatch) => {
    console.log(data);
    try {
        fetch(BASE_URL + 'Patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            .then((data) => dispatch({ type: ActionType.PATIENTS_ADDDATA, payload: data }))
    } catch (error) {
        dispatch(ErrorPatients(error.message));

    }
}

export const LoadingPatients = () => (dispatch) => {
    dispatch({ type: ActionType.PATIENTS_LOADINGDATA })
}

export const ErrorPatients = () => (dispatch) => {
    dispatch({ type: ActionType.PATIENTS_ADDDATA })
}

export const UpdatePatients = (data) => (dispatch) => {
    try {
        fetch(BASE_URL + 'Patients/' + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            .then((data) => dispatch({ type: ActionType.UPDATE_PATIENTS, payload: data }))
    } catch (error) {
        dispatch(ErrorPatients(error.message));
    }
}
