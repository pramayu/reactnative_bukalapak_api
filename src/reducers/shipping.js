import { GET_SHIPPING, GET_SHIPPING_SUCCESS, GET_SHIPPING_FAILURE } from '../actions/shipping';

let initialState = {
  shipping: [],
  isFetching: false,
  error: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_SHIPPING:
      return {
        ...state,
        shipping: [],
        isFetching: true
      }
    case GET_SHIPPING_SUCCESS:
      return {
        ...state,
        shipping: action.shipping,
        isFetching: false
      }
    case GET_SHIPPING_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state;
  }
}
