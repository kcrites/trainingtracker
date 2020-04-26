import { IndicatorActionTypes } from './indicator.types';

export const setIndicator= indicators => ({
    type: IndicatorActionTypes.SET_INDICATOR,
    payload: indicators
});

