import { combineReducers } from 'redux';

import products from './products';
import reviews from './reviews';
import shipping from './shipping';
import compare from './compare';
import cart from './cart'

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        products: products,
        reviews: reviews,
        shipping: shipping,
        compare: compare,
        cart: cart
    })
}
