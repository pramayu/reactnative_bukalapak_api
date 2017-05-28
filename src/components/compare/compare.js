import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from '../../stylesheets/style';
import Header from '../header/header';
import { setDataCompare, removeDataCompare } from '../../actions/compare';
import CompareList from './compare_lst';

class Compare extends Component {
  componentDidMount() {
    this.props.setDataCompare()
  }
  render() {
    let compareD = []
    let _uid = []
    for(let i = 0; i < this.props.compare.compare.length; i++) {
      compareD.push(this.props.compare.compare[i].product)
      _uid.push(this.props.compare.compare[i].uid)
    }
    let { navigate } = this.props.navigation;
    return (
      <View style={ styles.container }>
        <View style={{justifyContent: 'flex-start', flex: 1, alignSelf: 'stretch'}}>
          <Header navigate={navigate} goBack={this.props.navigation.goBack}/>
        </View>
        <View style={{justifyContent: 'center', flex: 8, alignSelf: 'stretch'}}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView>
              <CompareList compareD={compareD} _uid={_uid} removeDataCompare={this.props.removeDataCompare}/>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    compare: state.compare
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDataCompare: () => dispatch(setDataCompare()),
    removeDataCompare: (uid) => dispatch(removeDataCompare(uid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
