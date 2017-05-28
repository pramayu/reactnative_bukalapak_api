import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../../stylesheets/style';

class Header extends Component {
  render() {
    return (
      <View style={ styles.navbar }>
        <View style={ styles.navbar_container }>
          <View>
            <TouchableHighlight style={ styles.navbar_icons}>
              <Ionicons name="md-menu" size={32} color="white" />
            </TouchableHighlight>
          </View>
          <View style={ styles.navbar_search }>
            <View style={styles.navbar_search_input}>
              <View style={{paddingVertical: 4}}>
                <Ionicons name="md-search" size={24} color="#9e9e9e" />
              </View>
            <TouchableHighlight style={styles.txt_search_button}>
                <Text style={styles.grey}>
                  <Text> Cari barang...</Text>
                </Text>
              </TouchableHighlight>
            </View>
          </View>
          <View>
            <TouchableHighlight style={ styles.navbar_icons} onPress={() => this.props.navigate('Cart')}>
              <Ionicons name="md-cart" size={32} color="white" />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

export default Header;
