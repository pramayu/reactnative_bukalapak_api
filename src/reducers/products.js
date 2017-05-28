import { GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILURE } from '../actions/products';

let initialState = {
  products: [],
  isFetching: false,
  error: false
}

export default (state = initialState, action={}) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        products: [],
        isFetching: true
      }
    case GET_DATA_SUCCESS:
      return {
        ...state,
        products: action.products,
        isFetching: false
      }
    case GET_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state;
  }
}
