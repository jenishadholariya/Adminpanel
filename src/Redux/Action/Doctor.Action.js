import { async } from '@firebase/util';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { BASE_URL } from '../../Base_url/Base_url';
import { deleteAllDoctor, getAllDoctor, postAllDoctor, putAllDoctor } from '../../Common/apis/Doctor.apis';
import { db, storage } from '../../Firebase/Firebase';
import * as ActionType from '../ActionType'

export const GetDoctor = () => async(dispatch) => {
    try {
        const querySnapshot = await getDoc(collection(db, "Doctor"));

        const data=[];

        querySnapshot.forEach((doc) => {
            data.push({id:doc.id,...doc.data()})
            console.log(`${doc.id} => ${doc.data()}`);
            console.log(data);

            dispatch({type:ActionType.DOCTOR_GETDATA , payload: data})
        });
    } catch (e) {
        dispatch(errordoctor(e.message));
    }
    // try {
    //     dispatch(LoadingDoctor())
    //     setTimeout(function () {
    //         getAllDoctor()
    //             .then(data => dispatch(({ type: ActionType.DOCTOR_GETDATA, payload: data.data })))
    //             .catch(error => dispatch(errordoctor(error.message)));
    //         // fetch(BASE_URL + 'Doctor')
    //         // .then(response => {
    //         //     if (response.ok) {
    //         //         return response;
    //         //     } else {
    //         //         var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //         //         error.response = response;
    //         //         throw error;
    //         //     }
    //         // },
    //         //     error => {
    //         //         var errmess = new Error(error.message);
    //         //         throw errmess;
    //         //     })
    //         // .then((response) => response.json())
    //         // .then((data) => dispatch({ type: ActionType.DOCTOR_GETDATA, payload: data }));
    //     }, 2000)
    // } catch (error) {
    //     dispatch(errordoctor(error.message));
    // }

}

export const AddDoctor = (data) => async (dispatch) => {
    // console.log(data);
    // try {
    //     postAllDoctor(data)
    //         .then((data) => dispatch({ type: ActionType.DOCTOR_ADDDATA, payload: data.data }))
    //         .catch(error => dispatch(errordoctor(error.message)));
    //     // fetch(BASE_URL + 'Doctor/', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type': 'application/json',
    //     //     },
    //     //     body: JSON.stringify(data)
    //     // })
    //     //     .then(response => {
    //     //         if (response.ok) {
    //     //             return response;
    //     //         } else {
    //     //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //     //             error.response = response;
    //     //             throw error;
    //     //         }
    //     //     },
    //     //         error => {
    //     //             var errmess = new Error(error.message);
    //     //             throw errmess;
    //     //         })
    //     //     .then(response => response.json())
    //     //     .then((data) => dispatch({ type: ActionType.DOCTOR_ADDDATA, payload: data }))
    // } catch (error) {
    //     dispatch(errordoctor(error.message));
    // }

    try {
        // const storage = getStorage();

        // const Docref = ref(storage,"Doctor/" + data.pro_img.name );

        // console.log(Docref);

        const docRef = await addDoc(collection(db, "Doctor"), data);
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: ActionType.DOCTOR_ADDDATA, payload: { id: docRef.id, ...data } })
    } catch (e) {
        dispatch(errordoctor(e.message))
    }
}

export const DeleteDoctor = (id) => (dispatch) => {
    try {
        deleteAllDoctor(id)
            .then((id) => dispatch({ type: ActionType.DOCTOR_DELETEDATA, payload: id }))
            .catch(error => dispatch(errordoctor(error.message)));
        // fetch(BASE_URL + 'Doctor/' + id, {
        //     method: 'DELETE',
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
        //     .then((id) => dispatch({ type: ActionType.DOCTOR_DELETEDATA, payload: id }))
    } catch (error) {

    }
}

export const UpdateDoctor = (data) => (dispatch) => {
    try {
        putAllDoctor(data)
            .then((data) => dispatch({ type: ActionType.DOCTOR_UPDATEDATA, payload: data }))
            .catch(error => dispatch(errordoctor(error.message)));
        // fetch(BASE_URL + 'Doctor/' + data.id, {
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
        //     .then((data) => dispatch({ type: ActionType.DOCTOR_UPDATEDATA, payload: data }))
    } catch (error) {
        dispatch(errordoctor(error.message));
    }
}

export const errordoctor = () => (dispatch) => {
    dispatch({ type: ActionType.DOCTOR_ERROR })
}

export const LoadingDoctor = () => (dispatch) => {
    dispatch({ type: ActionType.DOCTOR_LODING })
}