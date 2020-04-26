import { MeasurementsActionTypes } from './measurements.types';

const INITIAL_STATE = {
     stats:  [{
        statsdate: null,
        weight: null,
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
                //stats: state.stats.push([action.payload])
                //stats: []...state.stats, action.payload]
               stats: action.payload
            }
        case MeasurementsActionTypes.ADD_MEASUREMENTS:
            return {
                ...state,
                stats: [ action.payload, ...state.stats]
            }
        default:
            return state;
    }
}

export default measurementsReducer;
//brings in current state, adds the new currentUser info and then recreates
//the state object so that React re-renders everything

