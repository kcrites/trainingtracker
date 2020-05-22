import { ClientActionTypes } from './client.types';

const INITIAL_STATE = {
 currentClient: 
     null

 
};


const clientReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case ClientActionTypes.SET_CLIENT:
            return {
                ...state,
                currentClient: action.payload
            }
        case ClientActionTypes.RESET_CLIENT:
                return {
                   ...state,
                    currentClient: INITIAL_STATE
                }
        default:
            return state;
    }
}

export default clientReducer;
//brings in current state, adds the new currentUser info and then recreates
//the state object so that React re-renders everything

