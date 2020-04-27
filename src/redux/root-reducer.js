import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import measurementsReducer from './measurements/measurements.reducer';
import trainingReducer from './training/training.reducer';
import packageReducer from './package/package.reducer';


export default combineReducers({
    user: userReducer,
    training: trainingReducer,
    measurements: measurementsReducer,
    pack: packageReducer
});
