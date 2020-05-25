import { createSelector } from 'reselect';

const selectMeasurements = state => state.stats;

export const selectCartItems = createSelector(
    [selectMeasurements],
    (stats) => stats.cartItems
);

