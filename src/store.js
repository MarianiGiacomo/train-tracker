import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

import {
  selectedTrainReducer,
  allActiveTrainsReducer,
  trainLocationReducer,
  mqttClientReducer,
  stationMedatadaReducer,
  filteredActiveTrainsReducer,
} from './reducers';

const reducer = combineReducers({
  trains: allActiveTrainsReducer,
  selectedTrains: selectedTrainReducer,
  trainLocation: trainLocationReducer,
  mqttClient: mqttClientReducer,
  stationsMetadata: stationMedatadaReducer,
  filteredTrains: filteredActiveTrainsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk),
));

export default store;
