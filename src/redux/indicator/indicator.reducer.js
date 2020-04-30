import { IndicatorActionTypes } from './indicator.types';

const INITIAL_STATE = {
 dash: false
};


const indicatorReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case IndicatorActionTypes.SET_INDICATOR:
            return {
                ...state,
                dash: action.payload
            }
        case IndicatorActionTypes.RESET_INDICATOR:
                return {
                   ...state,
                    dash: false
                }
        default:
            return state;
    }
}

export default indicatorReducer;
//brings in current state, adds the new currentUser info and then recreates
//the state object so that React re-renders everything

