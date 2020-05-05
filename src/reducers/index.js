import { combineReducers } from 'redux'
import { postMessageReducer } from './postMessageReducer'

export const reducers = combineReducers({
    postMessages: postMessageReducer,
})
