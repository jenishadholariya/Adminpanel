import { combineReducers } from "redux";
import { CounterReducer } from "./CounterReduix";
import { DoctorReducer } from "./Doctor.Reducer";
import { MedicianReducer } from "./Medician.Readucer";
import { PatientsReducer } from "./Patients.Reducer";

export const RootReducer = combineReducers({
    counter:CounterReducer,
    medicines:MedicianReducer,
    patients:PatientsReducer,
    doctor:DoctorReducer
})