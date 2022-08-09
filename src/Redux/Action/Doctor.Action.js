import { BASE_URL } from '../../Base_url/Base_url';
import * as ActionType from '../ActionType'

export const GetDoctor = () => (dispatch) => {

    try {
        fetch(BASE_URL + 'Doctor')
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
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionType.DOCTOR_GETDATA, payload: data }));
    } catch (error) {

    }

}

export const AddDoctor = (data) => (dispatch) => {
    console.log(data);
    try {
        fetch(BASE_URL + 'Doctor/', {
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
            .then((data) => dispatch({ type: ActionType.DOCTOR_ADDDATA, payload: data }))
    } catch (error) {
        dispatch(errordoctor)
    }

}

export const errordoctor = () => (dispatch) => {
    dispatch({type: ActionType.DOCTOR_ERROR})
}