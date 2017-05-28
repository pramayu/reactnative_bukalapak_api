import { GET_REVIEW, GET_REVIEW_SUCCESS, GET_REVIEW_FAILURE } from '../actions/review';

let initialState = {
  reviews: [],
  isFetching: false,
  error: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_REVIEW:
      return {
        ...state,
        reviews: [],
        isFetching: true
      }
    case GET_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: action.reviews,
        isFetching: false
      }
    case GET_REVIEW_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state;
  }
}
