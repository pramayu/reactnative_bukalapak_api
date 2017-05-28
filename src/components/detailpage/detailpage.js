import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import _ from 'lodash';
import superagent from 'superagent';
import Accordion from 'react-native-collapsible/Accordion';
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Image,
  Picker,
  AsyncStorage,
  Dimensions,
  ToastAndroid } from 'react-native';

  import { setReview } from '../../actions/review';
  import { setShipping } from '../../actions/shipping';
  import { setNewCart } from '../../actions/cart';
  import { setToCompare } from '../../actions/compare';

  let SECTIONS = [
    {
      title: 'Cek Ongkos Kirim',
       content: 'Fooo'
    }
  ];

class DetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialPosition: 'unknown',
      kurir: 'jne',
      compare: ''
    }
  }

  componentWillMount() {
    this.props.setReview(this.props.navigation.state.params.product.id);

    let onPositionReceives = (position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      getAddress(latitude, longitude);
    }

    let errorHandler = (err) => {
      if(err.code == 1) {
        alert("Error: Access is denied!");
      }else if( err.code == 2) {
        alert("Error: Position is unavailable!");
      }
    }

    if(navigator.geolocation) {
      let options = {enableHighAccuracy:true,maximumAge:30000,timeout:27000};
      navigator.geolocation.watchPosition(onPositionReceives, errorHandler, options)
    }

    let getAddress = (latitude, longitude) => {
      let url = "http://maps.google.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=false";
      let uploadRequest = superagent.post(url);
        uploadRequest.end((err, res) => {
          let address = res.body.results[0].address_components;
          let myAddress = address[3].long_name
          let initialPosition = myAddress.replace('Kabupaten ', '');
          this.setState({initialPosition})
          this.props.setShipping(this.props.navigation.state.params.product.weight, this.props.navigation.state.params.product.city, initialPosition, this.state.kurir)
        })
    }

    AsyncStorage.getItem('compare').then((value) => {
       this.setState({'compare': value});
    });

  }

  getfeedback(positive, negative) {
    let total = positive + negative;
    let feedback = (positive / total) * 100
    return {
      feedback
    }
  }

  pickerChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    if(this.state.kurir !== value) {
      this.props.setShipping(this.props.navigation.state.params.product.weight, this.props.navigation.state.params.product.city, this.state.initialPosition, value)
    }
    this.setState(newState);
  }

  removeDuplicate(shipping) {
    let fship = shipping.reduce((p, c) => {
      let key = [c.service, c.harga].join('|');
      if (p.temp.indexOf(key) === -1) {
        p.out.push(c);
        p.temp.push(key);
      }
      return p;
    }, { temp: [], out: [] }).out;
    return {
      fship
    }
  }

  _renderHeader(section) {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text style={{color: '#626262', fontWeight: 'bold'}}>{section.title}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Ionicons name='ios-code-working' size={18} color='#626262'/>
        </View>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View>
        <Text>{section.content}</Text>
      </View>
    );
  }

  _addToCart() {
    ToastAndroid.show('Successfully added to cart.', ToastAndroid.SHORT)
    this.props.setNewCart(this.props.navigation.state.params.product.id)
  }

  loadAsyncStorage(product){
    if(this.state.compare !== '') {
      ToastAndroid.show('Successfully added.', ToastAndroid.SHORT)
      this.props.setToCompare(this.state.compare, params.product)
    } else {
      let value = Date.now()
      AsyncStorage.setItem('compare', value.toString());
      this.setState({'compare': value.toString()});
    }
  }

  render() {
    let { params } = this.props.navigation.state;
    let { goBack } = this.props.navigation;
    let { reviews } = this.props.reviews;
    let { shipping } = this.props.shipping;
    let { width } = Dimensions.get('window');
    let discount = null;
    let price = null;
    let cicilan = null;
    let productReview = null;
    let { feedback } = this.getfeedback(params.product.seller_positive_feedback, params.product.seller_negative_feedback)
    let slider = (
      params.product.images.map((image, id) => {
        return (
          <View key={id} style={{width, height: 300, justifyContent: 'flex-end'}}>
            <Image source={{uri: image}} style={{flex: 1, width: null, height: null, resizeMode: 'cover'}}/>
          </View>
        )
      })
    )
    if(!_.isEmpty(params.product.deal_info)) {
      discount = (
        <View style={{flex: .25, alignItems: 'flex-start'}}>
          <View style={{width: 50, height: 30, backgroundColor: '#c90050', alignItems: 'center', justifyContent: 'center', borderRadius: 4}}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>{params.product.deal_info.discount_percentage}%</Text>
          </View>
        </View>
      )
    } else {
      discount = (
        <Text></Text>
      )
    }
    if(!_.isEmpty(params.product.deal_info)) {
      price = (
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{color: '#a5a5a5', fontWeight: 'bold'}}>
              Rp{ params.product.deal_info.original_price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{color: '#c90050', fontWeight: 'bold'}}>
              Rp{ params.product.deal_info.discount_price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
            </Text>
          </View>
        </View>
      )
    } else {
      price = (
        <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
          <Text style={{color: '#c90050', fontWeight: 'bold'}}>
            Rp{ params.product.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
          </Text>
        </View>
      )
    }
    if(params.product.price > 500000) {
      cicilan = (
        <View style={{marginBottom: 10}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'flex-start', paddingLeft: 20}}>
              <Text style={{color: '#626262', fontWeight: 'bold'}}>Cicilan 0% - 3 bulan</Text>
              <Text style={{color: '#626262', fontWeight: 'bold'}}>Cicilan 0% - 6 bulan</Text>
              <Text style={{color: '#626262', fontWeight: 'bold'}}>Cicilan 0% - 12 bulan</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start', paddingLeft: 30}}>
              <Text style={{color: '#626262', fontWeight: 'bold'}}>Rp{Math.round(params.product.price / 3).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}/bulan</Text>
              <Text style={{color: '#626262', fontWeight: 'bold'}}>Rp{Math.round(params.product.price / 6).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}/bulan</Text>
              <Text style={{color: '#626262', fontWeight: 'bold'}}>Rp{Math.round(params.product.price / 12).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}/bulan</Text>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center', paddingBottom: 10, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#dedede' }}>
            <Text style={{color: '#c90050', fontWeight: 'bold'}}>Bank penyedia cicilan</Text>
          </View>
        </View>
      )
    } else {
      cicilan = (<View></View>)
    }
    let { fship } = this.removeDuplicate(shipping)
    let printShip = (
      fship.map((shipping, id) => {
        console.log(shipping)
        return (
          <View key={id} style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{color: '#626262', fontWeight: 'bold'}}>{ shipping.service }</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{color: '#626262', fontWeight: 'bold'}}>1-2 hari</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{color: '#626262', fontWeight: 'bold'}}>Rp{ shipping.harga.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</Text>
            </View>
          </View>
        )
      })
    )
    var regex = /(<([^>]+)>)/ig;
    let deskripsi = [{
      title: 'Deskripsi Produk',
      content: params.product.desc.replace(regex, '\n')
    }]
    let capak = [{
      title: 'Catatan Pelapak',
      content: params.product.seller_term_condition.replace(regex, '\n')
    }]
    if(reviews.length !== 0) {
      productReview = (
        reviews.slice(0, 2).map((review, id) => {
          return (
            <View key={id} style={{flex: .5, justifyContent: 'center', borderWidth: 1, borderColor: '#d8d8d8', borderRadius: 4, padding: 10}}>
              <View style={{flex: .47, alignItems: 'flex-start'}}>
                <StarRating disabled={true} maxStars={5} rating={parseFloat(review.rate)}
                  emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                  starColor={'#fac864'} starSize={20} style={{alignItems: 'flex-start'}}/>
              </View>
                <Text style={{color: '#c90050', fontWeight: 'bold', fontSize: 16}}>{review.sender_name}</Text>
                <Text style={{color: '#767676', fontWeight: 'normal', fontSize: 14}}>{review.body}</Text>
            </View>
          )
        })
      )
    } else {
      productReview = (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: '#b91e4f', fontWeight: 'bold', fontSize: 18}}>Tidak ada Review</Text>
        </View>
      )
    }
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <View style={{flex: .8, backgroundColor: '#cb0051', height: 30, justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 20}}>
          <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
            <TouchableHighlight onPress={ () => goBack()}>
              <Ionicons name="ios-arrow-dropleft-circle" size={28} color='#fff'/>
            </TouchableHighlight>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
            <TouchableHighlight onPress={this.loadAsyncStorage.bind(this)}>
              <Ionicons name="logo-buffer" size={28} color={ '#fff' } />
            </TouchableHighlight>
          </View>
        </View>
        <View style={{flex: 8, flexDirection: 'column'}}>
          <ScrollView>
            <View style={{flex: 1}}>
              <Swiper showButtons={false} loop={false} height={300}>
                { slider }
              </Swiper>
            </View>
            <View style={{flex: 1}}>
              <View style={{padding: 20}}>
                <Text style={{fontSize: 17, fontWeight: 'bold', color: '#626262'}}>{ params.product.name }</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                  <View style={{flex: .47, alignItems: 'flex-start'}}>
                    <StarRating disabled={true} maxStars={5} rating={parseFloat(params.product.rating.average_rate)}
                      emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                      starColor={'#fac864'} starSize={22} style={{alignItems: 'flex-start'}}/>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-start', paddingTop: 5}}>
                    <Text style={{fontWeight: 'bold', color: '#a1a1a1', fontSize: 14}}> {reviews.length !== 0 ? reviews.length + ' Ulasan'
                    : '0 Ulasan'}
                    </Text>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 5}}>
                  { discount }
                  { price }
                </View>
              </View>
              <View style={{flex: 1, paddingVertical: 20, marginTop: 5, backgroundColor: '#fafafa', borderTopWidth: 1, borderTopColor: '#e2e2e2', borderBottomWidth: 1, borderBottomColor: '#e2e2e2'}}>
                { cicilan }
                <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 20}}>
                  <View style={{borderRightWidth: 1, borderRightColor: '#dedede', alignItems: 'center', flex: 1}}>
                    <Text style={{color:'#dedede'}}>STOK</Text>
                    <Text style={{color: '#626262', fontWeight: 'bold'}}>{'> ' + params.product.stock}</Text>
                  </View>
                  <View style={{borderRightWidth: 1, borderRightColor: '#dedede', alignItems: 'center', flex: 1}}>
                    <Text style={{color:'#dedede'}}>TERJUAL</Text>
                    <Text style={{color: '#626262', fontWeight: 'bold'}}>{params.product.sold_count}</Text>
                  </View>
                  <View style={{borderRightWidth: 1, borderRightColor: '#dedede', alignItems: 'center', flex: 1}}>
                    <Text style={{color:'#dedede'}}>PEMINAT</Text>
                    <Text style={{color: '#626262', fontWeight: 'bold'}}>{params.product.interest_count}</Text>
                  </View>
                  <View style={{alignItems: 'center', flex: 1}}>
                    <Text style={{color:'#dedede'}}>DILIHAT</Text>
                    <Text style={{color: '#626262', fontWeight: 'bold'}}>{params.product.view_count}</Text>
                  </View>
                </View>
              </View>
              <View style={{padding: 20}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: .4, alignItems: 'flex-start'}}>
                    <Image source={{uri: params.product.seller_avatar}} style={{width: 80, height: 80, borderRadius: 100/2, borderWidth: 2, borderColor: '#c90050'}}/>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <View style={{justifyContent: 'center', flexDirection: 'row', marginBottom: 5}}>
                      <Text>
                        { params.product.premium_account === true ? <Ionicons name="ios-beer-outline" size={24} color='#f5d15f' /> : '' }
                      </Text>
                      <Text style={{color: '#c90050', fontWeight: 'bold', fontSize: 15}}>
                        { ' ' + params.product.seller_name}
                      </Text>
                    </View>
                    <View style={{justifyContent: 'center', flexDirection: 'row', marginBottom: 5}}>
                      <Text>
                        <Ionicons name="ios-ribbon-outline" size={24} color='#33689a' />
                      </Text>
                      <Text style={{color: '#767676', fontWeight: 'normal', fontSize: 15}}>
                        { feedback > 70 ? 'Good Seller' : '' } { Math.round(feedback) + '%'} ({ params.product.seller_positive_feedback + params.product.seller_negative_feedback} feedback)
                      </Text>
                    </View>
                    <View style={{justifyContent: 'center', flexDirection: 'row', marginBottom: 5}}>
                      <Text>
                        <Ionicons name="ios-clock-outline" size={24} color='#cccccc' />
                      </Text>
                      <Text style={{color: '#cccccc', fontWeight: 'normal', fontSize: 15}}>
                         Waktu kirim pesananan { params.product.seller_delivery_time }
                      </Text>
                    </View>
                    <View style={{justifyContent: 'center', flexDirection: 'row', marginBottom: 5}}>
                      <Text>
                        <Ionicons name="ios-pin" size={24} color='#cccccc' />
                      </Text>
                      <Text style={{color: '#cccccc', fontWeight: 'normal', fontSize: 15}}>
                         { ' ' + params.product.city }, { params.product.province }
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{paddingTop: 20}}>
                  <Picker
                    selectedValue={this.state.kurir}
                    onValueChange={this.pickerChange.bind(this, 'kurir')}>
                    <Picker.Item label="JNE" value="jne" />
                    <Picker.Item label="TIKI" value="tiki" />
                    <Picker.Item label="POS Indonesia" value="pos" />
                    <Picker.Item label="Wahana" value="wahana" />
                  </Picker>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 14, color: '#626262', fontWeight: 'bold'}}>Harga Ongkos Kirim</Text>
                  </View>
                  <View style={{paddingTop: 10}}>
                    { printShip }
                  </View>
                  <View style={{paddingTop: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e2e2e2'}}>
                    <Text style={{color: '#626262', fontSize: 14, fontWeight: 'bold'}}>Spesifikasi</Text>
                    <View style={{ flex:1, flexDirection: 'row'}}>
                      <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Text>Kategori</Text>
                        <Text>Kondisi</Text>
                        <Text>Berat</Text>
                      </View>
                      <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Text>{ params.product.category }</Text>
                        <Text style={{color: '#87cc62', fontWeight: 'bold'}}>{ params.product.condition === "new" ? 'BARU' : 'BEKAS'}</Text>
                        <Text>{ params.product.weight } gram</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{paddingTop: 10}}>
                    <Accordion sections={deskripsi} renderHeader={this._renderHeader} renderContent={this._renderContent} />
                  </View>
                  <View style={{paddingTop: 10}}>
                    <Accordion sections={capak} renderHeader={this._renderHeader} renderContent={this._renderContent} />
                  </View>
                  <View style={{paddingTop: 10}}>
                    <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
                      <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Text style={{color: '#626262', fontWeight: 'bold'}}>Ulasan Barang</Text>
                      </View>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <TouchableHighlight style={{paddingHorizontal: 10, paddingVertical: 7,borderWidth: 1, borderColor: '#d8d8d8', borderRadius: 4}}>
                          <Text style={{color: '#b91e4f', fontWeight: 'bold', fontSize: 11}}>SELENGKAPNYA</Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                    <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row', marginTop: 10}}>
                      { productReview }
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{flex: .8, backgroundColor: '#ebebeb', padding: 6, justifyContent: 'center', alignSelf: 'stretch'}}>
          <TouchableHighlight onPress={this._addToCart.bind(this)} style={{flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch', backgroundColor: '#86d15e', borderRadius: 6, borderBottomColor: '#68a448', borderBottomWidth: 3, paddingVertical: 5}}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>BELI</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    reviews: state.reviews,
    shipping: state.shipping
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setReview: (id) => dispatch(setReview(id)),
    setShipping: (weight, from, to, courier) => dispatch(setShipping(weight, from, to, courier)),
    setNewCart: (id) => dispatch(setNewCart(id)),
    setToCompare: (uid, product) => dispatch(setToCompare(uid, product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
