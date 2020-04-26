import { IndicatorActionTypes } from './indicator.types';

const INITIAL_STATE = {
 indicators: [{
    weight: 0,
    musclemass: 0,
    bmi: 0,
    fatlevel : 0,
    percentwater : 0,
    vv : 0
}]
};


const indicatorReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case IndicatorActionTypes.SET_INDICATOR:
            return {
                ...state,
                indicators: action.payload
            }
        default:
            return state;
    }
}

export default indicatorReducer;
//brings in current state, adds the new currentUser info and then recreates
//the state object so that React re-renders everything

