import React from 'react';
import { View, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import styles from '../../stylesheets/style';

export default function() {
  return (
    <View style={styles.home_categori}>
      <View style={styles.home_categori_list}>
        <View style={[styles.home_kategori_icon, styles.home_kategori_icon_bg1]}>
          <Ionicons name="ios-tablet-portrait" size={45} color="#fff"/>
        </View>
        <Text style={{paddingTop: 5, fontWeight: 'bold', color: "#626262"}}>Handphone</Text>
      </View>
      <View style={styles.home_categori_list}>
        <View style={[styles.home_kategori_icon, styles.home_kategori_icon_bg2]}>
          <Ionicons name="ios-game-controller-b-outline" size={45} color="#fff"/>
        </View>
        <Text style={{paddingTop: 5, fontWeight: 'bold', color: "#626262"}}>Hobi</Text>
      </View>
      <View style={styles.home_categori_list}>
        <View style={[styles.home_kategori_icon, styles.home_kategori_icon_bg3]}>
          <Ionicons name="ios-laptop" size={45} color="#fff"/>
        </View>
        <Text style={{paddingTop: 5, fontWeight: 'bold', color: "#626262"}}>Komputer</Text>
      </View>
      <View style={styles.home_categori_list}>
        <View style={[styles.home_kategori_icon, styles.home_kategori_icon_bg4]}>
          <Ionicons name="ios-shirt-outline" size={45} color="#fff"/>
        </View>
        <Text style={{paddingTop: 5, fontWeight: 'bold', color: "#626262"}}>Fashion Pria</Text>
      </View>
      <View style={styles.home_categori_list}>
        <View style={[styles.home_kategori_icon, styles.home_kategori_icon_bg5]}>
          <Ionicons name="ios-construct-outline" size={45} color="#fff"/>
        </View>
        <Text style={{paddingTop: 5, fontWeight: 'bold', color: "#626262"}}>Rumah Tangga</Text>
      </View>
      <View style={styles.home_categori_list}>
        <View style={[styles.home_kategori_icon, styles.home_kategori_icon_bg6]}>
          <Ionicons name="ios-ribbon-outline" size={45} color="#fff"/>
        </View>
        <Text style={{paddingTop: 5, fontWeight: 'bold', color: "#626262"}}>Fashion Wanita</Text>
      </View>
    </View>
  )
}
