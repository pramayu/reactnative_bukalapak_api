import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import getRootReducer from './reducers/index'

export default function getStore(navReducer) {
    return store = compose(createStore(getRootReducer(navReducer), undefined, applyMiddleware(thunk)))
}
