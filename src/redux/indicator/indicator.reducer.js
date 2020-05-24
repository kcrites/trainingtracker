import { IndicatorActionTypes } from './indicator.types';

const INITIAL_STATE = {
 dash: false,
 dbAwake: false
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
//dash is used to determine if the dashboard component has already retrieved data for the user
//Default is false. If set to true, the Dashboard component should not request data from the database again

