import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import trainsListReducer from './reducers/trainsListReducer'

const reducer = combineReducers({
  trains: trainsListReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store