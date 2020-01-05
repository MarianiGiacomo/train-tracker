import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

import {
  selectedTrainReducer,
  trainsListReducer,
  trainLocationReducer,
  mqttClientReducer,
} from './reducers';

const reducer = combineReducers({
  trains: trainsListReducer,
  selectedTrains: selectedTrainReducer,
  trainLocation: trainLocationReducer,
  mqttClient: mqttClientReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk),
));

export default store;
