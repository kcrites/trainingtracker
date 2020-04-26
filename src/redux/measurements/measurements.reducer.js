import { MeasurementsActionTypes } from './measurements.types';

const INITIAL_STATE = {
stats: [{
    date: '',
    weight: 0.0,
    musclemass: 0.0,
    fatlevel: 0.0,
    bmi: 0.0,
    vv: 0.0,
    percentwater: 0.0
}]
}


const measurementsReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case MeasurementsActionTypes.SET_MEASUREMENTS:
            return {
                ...state,
                stats: action.payload
            }
        default:
            return state;
    }
}

export default measurementsReducer;
//brings in current state, adds the new currentUser info and then recreates
//the state object so that React re-renders everything

