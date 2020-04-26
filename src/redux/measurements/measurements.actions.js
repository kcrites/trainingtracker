import { MeasurementsActionTypes } from './measurements.types';

export const setMeasurements = data => ({
    type: MeasurementsActionTypes.SET_MEASUREMENTS,
    payload: data
});

export const addMeasurements = data => ({
    type: MeasurementsActionTypes.ADD_MEASUREMENTS,
    payload: data
});