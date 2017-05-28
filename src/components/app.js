import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider, connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import Header from './header/header';
import { Navigator } from '../routers/routes';
import styles from '../stylesheets/style';
import getStore from '../store';

let StackNav = StackNavigator(Navigator, {
  mode: 'card',
  headerMode: 'none'
});

const navReducer = (state, action) => {
    const newState = StackNav.router.getStateForAction(action, state)
    return newState || state
}

class App extends Component {
  render() {
    return (
      <StackNav navigation={addNavigationHelpers({dispatch: this.props.dispatch, state: this.props.nav })} />
    )
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const store = getStore(navReducer);
const AppIndex = connect(mapStateToProps)(App)

export default Index = () => {
    return (
        <Provider store={store}>
            <AppIndex />
        </Provider>
    )
}
