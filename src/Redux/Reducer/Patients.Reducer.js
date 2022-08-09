import * as ActionType from '../ActionType'

const initval = {
    isloading: false,
    error: '',
    patients: []
}

export const PatientsReducer = (state = initval, action) => {
    switch (action.type) {
        case ActionType.PATIENTS_GETDATA:
            return {
                ...state,
                isloading: false,
                patients: action.payload,
                error: ''
            }
        case ActionType.PATIENTS_DELETEDATA:
            return {
                ...state,
                isloading: false,
                patients: state.patients.filter((a) => a.id !== action.payload),
                error: ''
            }
        case ActionType.PATIENTS_ADDDATA:
            return {
                ...state,
                isloading: false,
                patients: state.patients.concat(action.payload),
                error: ''
            }
        case ActionType.PATIENTS_LOADINGDATA:
            return {
                ...state,
                isloading: true,
                error: ''
            }
        case ActionType.UPDATE_PATIENTS:
            return {
                ...state,
                isloading: false,
                patients: state.patients.map((m)=>{
                    if(m.id===action.payload.id){
                        return action.payload
                    }else{
                        return m 
                    }
                }),
                error: ''
            }
        default:
            return state
    }
}