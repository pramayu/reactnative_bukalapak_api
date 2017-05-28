import axios from 'axios';

export let GET_CART = 'GET_CART';
export let GET_CART_SUCCESS = 'GET_CART_SUCCESS';
export let GET_CART_FAILURE = 'GET_CART_FAILURE';
export let GET_UPDATE_CART = 'GET_UPDATE_CART';
export let GET_REMOVE_CART = 'GET_REMOVE_CART';
export let GET_NEW_CART = 'GET_NEW_CART';

export function getCart() {
  return {
    type: GET_CART
  }
}

export function getCartSuccess(carts) {
  return {
    type: GET_CART_SUCCESS,
    carts
  }
}

export function getCartFailure(err) {
  return {
    type: GET_CART_FAILURE,
    err
  }
}

export function getUpdateCart(cart, id) {
  return {
    type: GET_UPDATE_CART,
    cart,
    id
  }
}

export function getRemoveCart(id) {
  return {
    type: GET_REMOVE_CART,
    id
  }
}

export function getNewCart(cart) {
  return {
    type: GET_NEW_CART,
    cart
  }
}

export function setDataCart() {
  return dispatch => {
    dispatch(getCart())
    return axios.get('https://api.bukalapak.com/v2/carts.json?identity=scrambleeg')
      .then((res) => {
        dispatch(getCartSuccess(res.data.cart))
      })
      .catch((err) => dispatch(getCartFailure(err)))
  }
}

export function setUpdateCart(id, qty) {
  return dispatch => {
    return axios.patch(`https://api.bukalapak.com/v2/carts/item/${id}.json?identity=scrambleeg&quantity=${qty}`).then((res) => {
      dispatch(getUpdateCart(res.data.info, id))
    })
  }
}

export function setRemove(id) {
  return dispatch => {
    return axios.delete(`https://api.bukalapak.com/v2/carts/item/${id}.json?identity=scrambleeg`).then((res) => {
      dispatch(getRemoveCart(id))
    })
  }
}

export function setNewCart(id) {
  return dispatch => {
    return axios({
      method: 'post',
      url: `https://api.bukalapak.com/v2/carts/add_product/${id}.json?identity=scrambleeg`,
      data: null,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      dispatch(getNewCart(res.data.cart))
    })
  }
}
