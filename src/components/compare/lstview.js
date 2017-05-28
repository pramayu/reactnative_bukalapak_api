import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import _ from 'lodash';
import superagent from 'superagent';
import Accordion from 'react-native-accordion';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  Dimensions,
  ListView,
  TouchableHighlight,
  Image,
  Modal,
  Button,
  ToastAndroid } from 'react-native';

  import LstInfo from './lstinfo';

class LstView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animated: true,
      transparent: false,
      modalVisible: false
    }
  }

  _setModalVisible(visible) {
    if(this.props.product.id.toString() === visible) {
      this.setState({modalVisible: true});
    } else {
      this.setState({modalVisible: false});
    }
  }

  _toggleAnimated() {
    this.setState({animated: !this.state.animated});
  }

  _toggleTransparent() {
    this.setState({transparent: !this.state.transparent});
  }

  _removeCompare(uid) {
    ToastAndroid.show('Successfully removed.', ToastAndroid.SHORT)
    this.props.removeDataCompare(uid)
  }

  render() {
    let { product, _id, _uid } = this.props;
    let { width } = Dimensions.get('window');
    return (
      <View>
        <Modal animation={this.state.animated} transparent={this.state.transparent} visible={this.state.modalVisible} onRequestClose={() => {this._setModalVisible(false)}}>
          <View style={{flex: 1, alignSelf: 'stretch'}}>
            <View style={{flex: 1}}>
              <View style={{flex: .08, backgroundColor: '#cb0051', height: 30, justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 20}}>
                <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                  <TouchableHighlight>
                    <Ionicons name="ios-print-outline" size={28} color='#fff'/>
                  </TouchableHighlight>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                  <TouchableHighlight onPress={this._setModalVisible.bind(this, false)}>
                    <Ionicons name="ios-close" size={30} color={ '#fff' } />
                  </TouchableHighlight>
                </View>
              </View>
              <LstInfo product={product}/>
            </View>
          </View>
        </Modal>
        <View style={{flex: 1, justifyContent: 'center', alignSelf: 'stretch', minHeight: 80, borderRadius: 4, borderWidth: 1, borderColor: '#e7e7e7', marginBottom: 10}}>
          <View style={{flex: 1}}>
            <View style={{width: 310, height: 250, justifyContent: 'flex-end', padding: 10}}>
              <Image source={{uri: product.images[0]}} style={{flex: 1, width: null, height: null, resizeMode: 'cover'}}/>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f1f9', borderTopColor: '#e7e7e7', borderTopWidth: 1}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableHighlight style={{paddingVertical: 13, paddingHorizontal: 40}}>
                <Ionicons name='ios-cart-outline' size={20} color='#cccccc'/>
              </TouchableHighlight>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderRightColor: '#e7e7e7', borderLeftColor: '#e7e7e7', borderRightWidth: 1, borderLeftWidth: 1}}>
              <TouchableHighlight style={{paddingVertical: 13, paddingHorizontal: 40}} onPress={this._removeCompare.bind(this, _uid[_id])}>
                <Ionicons name='ios-trash-outline' size={20} color='#cccccc'/>
              </TouchableHighlight>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableHighlight style={{paddingVertical: 13, paddingHorizontal: 40}} onPress={this._setModalVisible.bind(this, product.id)}>
                <Ionicons name='ios-eye-outline' size={20} color='#cccccc'/>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default LstView;
