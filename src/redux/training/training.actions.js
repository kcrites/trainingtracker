import { TrainingActionTypes } from './training.types';

export const setTraining = train => ({
    type: TrainingActionTypes.SET_TRAINING,
    payload: train
});