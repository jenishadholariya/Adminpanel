import * as ActionType from '../ActionType'

const initval = {
    isloding: false,
    Doctor: [],
    error: ''
}

export const DoctorReducer = (state = initval, action) => {
    switch (action.type) {
        case ActionType.DOCTOR_GETDATA:
            return {
                ...state,
                isloding: false,
                Doctor: action.payload,
                error: ''
            }
        case ActionType.DOCTOR_ADDDATA:
            return {
                ...state,
                isloding: false,
                Doctor: action.Doctor.concat(action.payload),
                error: ''
            }
        default:
            return state
    }
}