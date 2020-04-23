import { PackageActionTypes } from './package.types';

export const setCurrentPackage = pack => ({
    type: PackageActionTypes.SET_CURRENT_PACKAGE,
    payload: pack
});