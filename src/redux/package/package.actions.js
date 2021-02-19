import { PackageActionTypes } from './package.types';

export const setCurrentPackage = pack => ({
    type: PackageActionTypes.SET_CURRENT_PACKAGE,
    payload: pack
});
export const addPackage = data => ({
    type: PackageActionTypes.ADD_PACKAGE,
    payload: data
});

export const resetPackage = data => ({
    type: PackageActionTypes.RESET_PACKAGE,
    payload: data
});

