import { PackageActionTypes } from './package.types';

const INITIAL_STATE = {
    currentPackage: null
}

const packageReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case PackageActionTypes.SET_CURRENT_PACKAGE:
            return {
                ...state,
                currentPackage: action.payload
            }
        default:
            return state;
    }
}

export default packageReducer;
//brings in current state, adds the new currentUser info and then recreates
//the state object so that React re-renders everything