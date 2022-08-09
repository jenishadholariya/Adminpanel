import { deleteRequest, getRequest, postRequest, putRequest } from "../Request"


export const getAllMedicines = () => {
    return getRequest('Medician')
}

export const postAllMedicines = (data) => {
    return postRequest('Medician' , data)
}

export const deleteAllMedicines = (id) => {
    return deleteRequest('Medician/',id)
}

export const putAllMedicines = (data) => {
    return putRequest('Medician/' , data)
}