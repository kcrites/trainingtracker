import { MeasurementsActionTypes } from './measurements.types';

export const setMeasurements = stats => ({
    type: MeasurementsActionTypes.SET_MEASUREMENTS,
    payload: stats
});

