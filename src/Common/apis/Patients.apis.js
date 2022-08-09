import { getRequest , postRequest , deleteRequest , putRequest } from "../Request"


export const getAllPatients = () => {
    return getRequest('Patients')
}

export const postAllPatients = (data) => {
    return postRequest('Patients',data)
}

export const deleteAllPatients = (id) => {
    return deleteRequest('Patients/',id)
}

export const putAllPatients = (data) => {
    return putRequest('Patients/' , data)
}