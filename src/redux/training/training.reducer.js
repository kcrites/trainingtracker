import { TrainingActionTypes } from './training.types';

const INITIAL_STATE = {
    trainingList: [],
    trainingListByPack: [],
    trainingListNoSelf: [],
    trainingListOnlySelf: [],
    descriptions: []
}

const trainingReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case TrainingActionTypes.SET_TRAINING:
            return {
                ...state,
                trainingList: action.payload
            }
        case TrainingActionTypes.ADD_TRAINING:
            return {
                ...state,
                trainingList: [action.payload, ...state.trainingList ],
                trainingListByPack: [action.payload, ...state.trainingListByPack]
            }
        case TrainingActionTypes.SET_TRAINING_BY_PACKAGE:
            return {
                ...state,
                trainingListByPack: action.payload
            }
        case TrainingActionTypes.RESET_TRAINING:
            return {
               ...state,
                trainingList: INITIAL_STATE.trainingList
            }
        case TrainingActionTypes.SET_TRAINING_ONLY_SELF:
            return {
                ...state,
                trainingListOnlySelf: action.payload
            }
        case TrainingActionTypes.SET_TRAINING_NO_SELF:
            return {
                ...state,
                trainingListNoSelf: action.payload
            }
        case TrainingActionTypes.SET_DESCRIPTIONS:
            return {
                ...state,
                descriptions: action.payload
            }
        default:
            return state;
    }
}

export default trainingReducer;
//brings in current state, adds the new currentUser info and then recreates
//the state object so that React re-renders everything