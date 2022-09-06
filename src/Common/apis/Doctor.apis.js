import { getRequest, postRequest ,deleteRequest,putRequest} from "../Request"


export const getAllDoctor = () => {
    return getRequest('Doctor')
}

export const postAllDoctor = (data) => {
    return postRequest('Doctor' , data)
}

export const deleteAllDoctor = (id) => {
    return deleteRequest('Doctor/',id)
}

export const putAllDoctor = (data) => {
    return putRequest('Doctor/' , data)
}