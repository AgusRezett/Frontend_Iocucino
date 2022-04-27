import { createStore, combineReducers } from 'redux';

import walletsReducer from './reducers/walletsReducer';

const RootReducer = combineReducers({
    wallets: walletsReducer
});

export default createStore(RootReducer);