import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, AsyncStorage, ToastAndroid } from 'react-native';
import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons';
import Storage from 'react-native-storage';
import uuid from 'react-native-uuid';

import styles from '../../stylesheets/style';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compare: ''
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('compare').then((value) => {
       this.setState({'compare': value});
    });
  }
  getprice(price) {
    var toStr = price.toString().length
    if(toStr <= 6) {
      var priced = price / 1000 + 'rb'
    } else if (toStr >= 7) {
      var priced = price / 1000000 + 'jt'
    }
    return {
      priced
    }
  }

  getdiscount(discount) {
    var disStr = discount.toString().length
    if(disStr <= 6) {
      var dsc = discount / 1000 + 'rb'
    } else if (disStr >= 7) {
      var dsc = discount / 1000000 + 'jt'
    }
    return {
      dsc
    }
  }

  getfeedback(positive, negative) {
    let total = positive + negative;
    let feedback = (positive / total) * 100
    return {
      feedback
    }
  }

  loadAsyncStorage(product){
    if(this.state.compare !== '') {
      ToastAndroid.show('Successfully added.', ToastAndroid.SHORT)
      this.props.setToCompare(this.state.compare, product)
    } else {
      let value = Date.now()
      AsyncStorage.setItem('compare', value.toString());
      this.setState({'compare': value.toString()});
    }
  }

  render() {
    let { product } = this.props;
    let pricex = null;
    if(!_.isEmpty(product.deal_info)) {
      pricex = product.deal_info.original_price;
    } else if (_.isEmpty(product.deal_info)) {
      pricex = product.price
    }
    let { priced } = this.getprice(pricex)

    let dscount = null;
    if(!_.isEmpty(product.deal_info)) {
      dscount = product.deal_info.discount_price;
    } else if (_.isEmpty(product.deal_info)) {
      dscount = 0;
    }

    let dscres = null;
    let {dsc} = this.getdiscount(dscount)
        if(dsc.toString().length === 3) {
      dscres = '';
    } else {
      dscres = dsc
    }

    let { feedback } = this.getfeedback(product.seller_positive_feedback, product.seller_negative_feedback)
    return (
      <View style={styles.listview_container}>
        <View style={styles.listview_container2}>
          <Image source={{ uri: product.images[0] }} style={styles.listview_thumbnail}>
            <View style={styles.listview_thumbnail_info_container}>
              <View style={styles.listview_thumbnail_info}>
                <View style={{flex:1, alignItems: 'flex-start'}}>
                  <TouchableHighlight style={styles.listview_thumbnail_info_button} onPress={this.loadAsyncStorage.bind(this, product)}>
                    <Ionicons name='logo-buffer' size={20} color='#fff'/>
                  </TouchableHighlight>
                </View>
                <View style={{flex:1, alignItems: 'flex-end'}}>
                  <Text>{!_.isEmpty(product.deal_info) ?
                    <Text style={styles.listview_thumbnail_info_discount}>{product.deal_info.discount_percentage}%</Text> : ''}
                  </Text>
                </View>
              </View>
              <View style={styles.listview_todetail_container}>
                <TouchableHighlight style={styles.listview_todetail_btn}
                  onPress={() => this.props.navigate('DetailPage', { product: product })}>
                  <Text style={{color: 'rgba(255, 255, 255, 0)'}}>fo</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Image>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={styles.listview_product_name}>
            {product.name.substring(0,35)} {product.name.length < 35 ? '' : '...'}
          </Text>
          <Text style={styles.listview_seller_name}>
            oleh { product.seller_name}
          </Text>
          <Text style={styles.listview_feedback}>
            { product.seller_positive_feedback === 0 && product.seller_negative_feedback === 0 ? '0' : Math.round(feedback) }%
            ({product.seller_positive_feedback + product.seller_negative_feedback} feedback)
          </Text>
          <View style={styles.listview_discount_price}>
            <Text style={{fontWeight: 'normal', color: '#bbbbbb', fontSize: 13}}>
              { !_.isEmpty(product.deal_info) ? 'Rp' + priced + '  ' : '' }
            </Text>
            <Text style={{fontWeight: 'bold', color: '#c90050', fontSize: 13}}>
              { !_.isEmpty(product.deal_info) ? 'Rp' + dscres : 'Rp' + priced }
            </Text>
          </View>
          <View style={styles.listview_min_pay}>
            <View style={{justifyContent: 'flex-start'}}>
              <Text style={{fontWeight: 'normal', color: '#696969', fontSize: 11}}>
                {product.min_installment_price ? product.min_installment_price : ''}
              </Text>
            </View>
            <View style={styles.listview_premiun_account}>
                <Text style={{alignItems: 'flex-end'}}>
                  { product.premium_account === true ? <Ionicons name="ios-beer-outline" size={20} color='#f6d262'/> : ''}
                </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default ListView;
