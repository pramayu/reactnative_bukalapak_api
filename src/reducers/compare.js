import { GET_DATA_COMPARE } from '../actions/compare';

let initialState = {
  compare: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_DATA_COMPARE:
      return {
        ...state,
        compare: action.compare
      }
    default:
      return state;
  }
}
