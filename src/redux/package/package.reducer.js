import { PackageActionTypes } from './package.types';

const INITIAL_STATE = {
    currentPackage:   {
        datestarted: undefined,
        packageid: null,
        completed: false,
        sessioncount: 0,
        sessionsleft: 0,
        maxsessions: 0,
        newuser: false
    }
}

const packageReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case PackageActionTypes.SET_CURRENT_PACKAGE:
            return {
                ...state,
                currentPackage: action.payload
            }
        case PackageActionTypes.ADD_PACKAGE:
            return {
                ...state,
                currentPackage:  action.payload
            }
        case PackageActionTypes.RESET_PACKAGE:
            return {
               ...state,
                currentPackage: INITIAL_STATE.currentPackage
            }
        default:
            return state;
    }
}

export default packageReducer;
//brings in current state, adds the new currentUser info and then recreates
//the state object so that React re-renders everything