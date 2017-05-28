import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { setFetchData } from '../../actions/products';
import { setToCompare } from '../../actions/compare';
import styles from '../../stylesheets/style';
import Icons from './popular-category';
import ListView from './listview';
import Header from '../header/header';

class Home extends Component {
  componentWillMount() {
    this.props.setFetchData()
  }
  render() {
    let { navigate } = this.props.navigation;
    let listview = (
      this.props.products.products.map((product, id) => {
        return (
          <ListView product={product} key={id} navigate={navigate} setToCompare={this.props.setToCompare}/>
        )
      })
    )
    // console.log(this.props.products)
    return (
      <View style={ styles.container }>
        <View style={{justifyContent: 'flex-start', flex: 1, alignSelf: 'stretch'}}>
          <Header navigate={navigate} goBack={this.props.navigation.goBack} />
        </View>
        <View style={{justifyContent: 'center', flex: 8, alignSelf: 'stretch'}}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView>
              <View>
                <View style={{alignItems: 'center', paddingVertical: 10}}>
                  <Text style={styles.text_home_kategori}>KATEGORI POPULAR</Text>
                </View>
                <Icons />
                <View style={styles.list_container}>
                  { listview }
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  }
}

function mapDispatchToProps(dispatch) {
  return {
      setFetchData: () => dispatch(setFetchData()),
      setToCompare: (uid, product) => dispatch(setToCompare(uid, product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
