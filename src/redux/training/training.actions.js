import { TrainingActionTypes } from './training.types';

export const setTraining = train => ({
    type: TrainingActionTypes.SET_TRAINING,
    payload: train
});

export const addTraining = data => ({
    type: TrainingActionTypes.ADD_TRAINING,
    payload: data
});

export const setTrainingByPack = train => ({
    type: TrainingActionTypes.SET_TRAINING_BY_PACKAGE,
    payload: train
})
export const resetTraining = data => ({
    type: TrainingActionTypes.RESET_TRAINING,
    payload: data
});
export const setTrainingOnlySelf = data => ({
    type: TrainingActionTypes.SET_TRAINING_ONLY_SELF,
    payload: data
});
export const setTrainingNoSelf = data => ({
    type: TrainingActionTypes.SET_TRAINING_NO_SELF,
    payload: data
});
export const setDescriptions = data => ({
    type: TrainingActionTypes.SET_DESCRIPTIONS,
    payload: data
});