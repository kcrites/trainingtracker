import { ClientActionTypes } from './client.types';

export const setClient= data => ({
    type: ClientActionTypes.SET_CLIENT,
    payload: data
});

export const resetClient = data => ({
    type: ClientActionTypes.RESET_CLIENT,
    payload: data
});