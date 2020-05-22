import { TrainingActionTypes } from './training.types';

export const setTraining = train => ({
    type: TrainingActionTypes.SET_TRAINING,
    payload: train
});

export const addTraining = data => ({
    type: TrainingActionTypes.ADD_TRAINING,
    payload: data
});

export const resetTraining = data => ({
    type: TrainingActionTypes.RESET_TRAINING,
    payload: data
});