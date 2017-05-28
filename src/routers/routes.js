import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';


import Home from '../components/home/home';
import Favorite from '../components/favorite/favorite';
import Compare from '../components/compare/compare';
import Profile from '../components/profile/profile';
import DetailPage from '../components/detailpage/detailpage';
import Cart from '../components/cart/cart';

export let TabBar = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-home" size={24} color={ '#a5a5a5' } />
      ),
      tabBarLabel: 'Home'
    }
  },
  Favorite: {
    screen: Favorite,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-heart" size={24} color={ '#a5a5a5' } />
      ),
      tabBarLabel: 'Favorite'
    }
  },
  Compare: {
    screen: Compare,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="logo-buffer" size={24} color={ '#a5a5a5' } />
      ),
      tabBarLabel: 'Compare'
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-person" size={24} color={ '#a5a5a5' } />
      ),
      tabBarLabel: 'Profile'
    }
  }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    showIcon: true,
    labelStyle: {
      fontSize: 12,
      color: '#a5a5a5'
    },
    style: {
      backgroundColor: '#f2f2f2',
      height: 60
    },
    indicatorStyle: {
      backgroundColor: '#e2e2e2',
      top: 0
    },
    activeTintColor: '#cb0051',
  }
})


export let Navigator = {
  Home: {
    screen: TabBar
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      tabBarVisible: false
    }
  }
}
