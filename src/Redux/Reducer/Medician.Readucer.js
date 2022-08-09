import * as ActionType from '../ActionType'

const initval = {
    error: '',
    isloading: 'false',
    medicines: []
}

export const MedicianReducer = (state = initval, action) => {
    switch (action.type) {
        case ActionType.GET_DATA:
            return {
                ...state,
                isloading: false,
                medicines: action.payload,
                error: ''
            }
        case ActionType.ADD_DATA:
            return {
                ...state,
                isloading: false,
                medicines: state.medicines.concat(action.payload),
                error: ''
            }
        case ActionType.DELETE_DATA:
            return {
                ...state,
                isloading: false,
                medicines: state.medicines.filter((m) => m.id !== action.payload),
                error: ''
            }
        case ActionType.ERROR_DATA:
            return {
                ...state,
                isloading: false,
                medicines: [],
                error: action.payload
            }
        case ActionType.LOADING_DATA:
            return {
                ...state,
                isloading: true,
                error: ''
            }
        case ActionType.UPDATE_DATA:
            return {
                ...state,
                isloading: false,
                medicines: state.medicines.map((m)=>{
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