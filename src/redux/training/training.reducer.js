import { TrainingActionTypes } from './training.types';

const INITIAL_STATE = {
    trainingList: null
}

const trainingReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case TrainingActionTypes.SET_TRAINING:
            return {
                ...state,
                trainingList: action.payload
            }
        default:
            return state;
    }
}

export default trainingReducer;
//brings in current state, adds the new currentUser info and then recreates
//the state object so that React re-renders everything