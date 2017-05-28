import React, { Component } from 'react';
import { View, Text } from 'react-native';


import Header from './header/header';
import { TabBar } from '../routers/routes';
import styles from '../stylesheets/style';

class MainIndex extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <View style={{justifyContent: 'flex-start', flex: 1, alignSelf: 'stretch'}}>
          <Header />
        </View>
        <View style={{justifyContent: 'center', flex: 8, alignSelf: 'stretch'}}>
          <TabBar />
        </View>
      </View>
    )
  }
}

export default MainIndex;
