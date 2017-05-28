import axios from 'axios';

export let GET_REVIEW = 'GET_REVIEW';
export let GET_REVIEW_SUCCESS = 'GET_REVIEW_SUCCESS';
export let GET_REVIEW_FAILURE = 'GET_REVIEW_FAILURE';


export function getReview() {
  return {
    type: GET_REVIEW
  }
}

export function getReviewSuccess(reviews) {
  return {
    type: GET_REVIEW_SUCCESS,
    reviews
  }
}

export function getReviewFailure(err) {
  return {
    type: GET_REVIEW_FAILURE,
    err
  }
}

export function setReview(id) {
  return dispatch => {
    dispatch(getReview())
    return axios.get(`https://api.bukalapak.com/v2/products/${id}/reviews.json`)
      .then((res) => {
        dispatch(getReviewSuccess(res.data.reviews))
      })
      .catch((err) =>  dispatch(getReviewFailure(err)))
  }
}
