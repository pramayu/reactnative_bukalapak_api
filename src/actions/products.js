import axios from 'axios';

export let GET_DATA = 'GET_DATA';
export let GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export let GET_DATA_FAILURE = 'GET_DATA_FAILURE';

export function getData() {
  return {
    type: GET_DATA
  }
}

export function getDataSuccess(products) {
  return {
    type: GET_DATA_SUCCESS,
    products
  }
}

export function getDataFailure(err) {
  return {
    type: GET_DATA_FAILURE,
    err
  }
}

export function setFetchData() {
  let page = Math.floor(Math.random() * (20 - 1)) + 1;
  return dispatch => {
    dispatch(getData())
    return axios.get(`https://api.bukalapak.com/v2/products.json?category_id=1&favorited=true&page=${page}&per_page=24`)
    .then((res) => {
      dispatch(getDataSuccess(res.data.products))
    })
    .catch((err) => dispatch(getDataFailure(err)))
  }
}
