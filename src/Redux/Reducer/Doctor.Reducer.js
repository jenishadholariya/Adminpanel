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
        case ActionType.DOCTOR_DELETEDATA:
            return {
                ...state,
                isloding: false,
                Doctor: state.Doctor.filter((m) => m.id !== action.payload),
                error: ''
            }
        case ActionType.DOCTOR_LODING:
            return {
                ...state,
                isloding: true,
                error: ''
            }
        case ActionType.DOCTOR_UPDATEDATA:
            return {
                ...state,
                isloding: false,
                Doctor: state.Doctor.map((m) => {
                    if (m.id === action.payload.id) {
                        return action.payload
                    } else {
                        return m
                    }
                }),
                error: ''
            }
        default:
            return state
    }
}