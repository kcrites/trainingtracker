import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import packageReducer from './package/package.reducer';


export default combineReducers({
    user: userReducer,
    pack: packageReducer
});
