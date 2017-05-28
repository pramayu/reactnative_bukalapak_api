import axios from 'axios';

export let GET_SHIPPING = 'GET_SHIPPING';
export let GET_SHIPPING_SUCCESS = 'GET_SHIPPING_SUCCESS';
export let GET_SHIPPING_FAILURE = 'GET_SHIPPING_FAILURE';

export function getShipping() {
  return {
    type: GET_SHIPPING
  }
}

export function getShippingSuccess(shipping) {
  return {
    type: GET_SHIPPING_SUCCESS,
    shipping
  }
}

export function getShippingFailure(err) {
  return {
    type: GET_SHIPPING_FAILURE,
    err
  }
}

export function setShipping(weight, _from, _to, courier) {
  let from = _from.replace(/ /g,"+");
  let to = _to.replace(/ /g,"+");
  console.log(weight, from, to, courier)
  return dispatch => {
    dispatch(getShipping())
    return axios.get(`https://api.bukalapak.com/v2/shipping_fee.json?courier=${courier}&weight=${weight}&to=${to}&from=${from}`)
      .then((res) => { dispatch(getShippingSuccess(res.data.result))})
      .catch((err) => dispatch(getShippingFailure(err)))
  }
}
