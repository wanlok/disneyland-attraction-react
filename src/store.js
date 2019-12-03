import { createStore, applyMiddleware, combineReducers } from 'redux';
import uiReducer from './reducers/uiReducer';
import attractionReducer from './reducers/attractionReducer';
import locationReducer from './reducers/locationReducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  uiReducer,
  attractionReducer,
  locationReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;