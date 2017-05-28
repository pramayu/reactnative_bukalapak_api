import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import LstView from './lstview';

class CompareList extends Component {
  render() {
    let _renderCompare = (
      this.props.compareD.map((product, id) => {
        return (
          <LstView product={product} key={id} _id={id} _uid={this.props._uid} removeDataCompare={this.props.removeDataCompare}/>
        )
      })
    )
    return (
      <View style={{flex: 1, padding: 25, flexDirection: 'column'}}>
        { _renderCompare }
      </View>
    )
  }
}

export default CompareList;
