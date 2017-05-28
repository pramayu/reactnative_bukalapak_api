import {
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_UPDATE_CART,
  GET_REMOVE_CART,
  GET_NEW_CART,
} from '../actions/cart';


let initialState = {
  cart: [],
  isFetching: false,
  error: false
}


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: [],
        isFetching: true
      }
    case GET_CART_SUCCESS:
      return {
        ...state,
        cart: action.carts,
        isFetching: false
      }
    case GET_CART_FAILURE:
      return {
        isFetching: false,
        error: true
      }
    case GET_NEW_CART:
      return {
        ...state,
        cart: action.cart,
        isFetching: false
      }
    case GET_UPDATE_CART:
      return state.map((item) => {
        if(item._id === action.id) return action.cart
        return item;
      })
    case GET_REMOVE_CART:
      return state.filter(cart => cart.product.id !== action.id)
    default:
      return state;
  }
}
