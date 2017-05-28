import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDglxVAR4WcG5i5zK9Y4tEzXIGOYiUi6Vs",
    authDomain: "bukalapak-480c5.firebaseapp.com",
    databaseURL: "https://bukalapak-480c5.firebaseio.com",
    projectId: "bukalapak-480c5",
    storageBucket: "bukalapak-480c5.appspot.com",
    messagingSenderId: "555075799883"
};
var firebaseRef =  firebase.initializeApp(config);
let compareRef = firebaseRef.database().ref('compare')

export let GET_DATA_COMPARE = 'GET_DATA_COMPARE';

export function getDataCompare(compare) {
  return {
    type: GET_DATA_COMPARE,
    compare
  }
}

export function setToCompare(uid, product) {
  return dispatch => {
    compareRef.push({
      product: product,
      compare_group: uid,
      uid: Date.now()
    })
  }
}

export function setDataCompare() {
  return dispatch => {
    compareRef.on('value', (snapshot) => {
      let compareArr = [];
      snapshot.forEach((_child) => {
        let item = _child.val();
        item.key = _child.key;
        compareArr.push(item)
      })
      dispatch(getDataCompare(compareArr))
    })
  }
}

export function removeDataCompare(uid) {
  return dispatch => {
    let query = compareRef.orderByChild('uid').equalTo(uid);
    query.on('child_added', (snapshot) => {
      snapshot.ref.remove();
    })
  }
}
