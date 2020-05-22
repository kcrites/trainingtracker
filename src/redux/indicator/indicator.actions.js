import { IndicatorActionTypes } from './indicator.types';

export const setIndicator= data => ({
    type: IndicatorActionTypes.SET_INDICATOR,
    payload: data
});

export const resetIndicator = data => ({
    type: IndicatorActionTypes.RESET_INDICATOR,
    payload: data
});