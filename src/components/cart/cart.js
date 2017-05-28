import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import _ from 'lodash';

import { setDataCart, setRemove } from '../../actions/cart';


class Cart extends Component {
  componentDidMount() {
    this.props.setDataCart()
  }

  _doRemove(id) {
    this.props.setRemove(id)
  }

  render() {
    let { goBack } = this.props.navigation;
    let price = [];
    var sumT = price.reduce((pv, cv) => pv+cv, 0);
    let add = (a, b) => {
      return a + b;
    }
    let cartLoop = (
      this.props.cart.cart.map((cart, id) => {
        return (
          <View style={{flex: 1, alignSelf: 'stretch'}} key={id}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff', flex: .035, justifyContent:'center', alignSelf: 'stretch', padding: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 14, color: '#626262'}}>{cart.seller.name}</Text>
            </View>
            {
              cart.items.map((item, id) => {
                price.push(item.price)
                return (
                  <View key={id} style={{flex: 1, flexDirection: 'row', minHeight: 150 ,borderBottomWidth: 1, borderBottomColor: '#eee'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: .4, flexDirection: 'column', backgroundColor: '#fff'}}>
                        <View style={{flex: 1}}>
                            <Image source={{uri: item.product.small_images[0]}} style={{width: 100, height: 100, resizeMode: 'cover'}}/>
                        </View>
                        <View style={{flex: .3}}>

                        </View>
                      </View>
                      <View style={{flex: .6, flexDirection: 'column', backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 20, borderRightWidth: 1, borderRightColor: '#eee'}}>
                        <View style={{flex:1, justifyContent: 'flex-start'}}>
                          <Text style={{color: '#626262', fontSize: 15, fontWeight: 'bold'}}>
                            { item.name.length > 28 ? item.name.substring(0, 28) + '...' : item.name }
                          </Text>
                        </View>
                        <View style={{flex:1, justifyContent: 'flex-end'}}>
                          <Text style={{color: '#626262', fontSize: 15, fontWeight: 'bold'}}>
                            Rp{item.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: .2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5'}}>
                      <TouchableHighlight onPress={this._doRemove.bind(this, item.id)}>
                        <Ionicons name='md-trash' color='#b9b9b9' size={28}/>
                      </TouchableHighlight>
                    </View>
                  </View>
                )
              })
            }
          </View>
        )
      })
    )


    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f5f5f5'}}>
        <View style={{flex: .8, backgroundColor: '#cb0051', height: 30, justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 20}}>
          <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
            <TouchableHighlight onPress={ () => goBack()}>
              <Ionicons name="ios-arrow-dropleft-circle" size={28} color='#fff'/>
            </TouchableHighlight>
          </View>
          <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color:'#fff', fontWeight: 'bold', fontSize: 16}}>Keranjang Belanja</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
            <TouchableHighlight>
              <Ionicons name="logo-buffer" size={28} color={ '#fff' } />
            </TouchableHighlight>
          </View>
        </View>
        <View style={{flex: 8, flexDirection: 'column'}}>
          <ScrollView>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
              { cartLoop }
            </View>
          </ScrollView>
          <View style={{flex: .5, padding: 20, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 11, color: '#999'}}>SUBTOTAL</Text>
            <Text style={{fontSize: 16, color: '#626262'}}>{ sumT }</Text>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDataCart: () => dispatch(setDataCart()),
    setRemove: (id) => dispatch(setRemove(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
