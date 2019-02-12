import React, { Component } from 'react';
import {
  Platform
} from 'react-native';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import { connect, Provider } from 'react-redux'
import {
  createNavigationPropConstructor,
  createNavigationReducer,
  createReactNavigationReduxMiddleware,
  initializeListeners,
} from 'react-navigation-redux-helpers';

import { persistStore, persistCombineReducers } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import storage from 'redux-persist/es/storage';

import AppNavigator from './components/AppNavigator';
import reducer from './reducers';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));

const navReducer = createNavigationReducer(AppNavigator);

const persisterConfig = {
  key: 'root',
  storage
};

const appReducer = persistCombineReducers(persisterConfig, {
  nav: navReducer,
  app: reducer
});

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const navigationPropConstructor = createNavigationPropConstructor("root");

function configureStore () {
  let store = createStore(appReducer, applyMiddleware(middleware));
  let persistor = persistStore(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return { persistor, store }
}

class App extends Component<{}> {
  componentDidMount() {
    initializeListeners("root", this.props.nav);
  }

  render() {

    return (
      <AppNavigator navigation={navigationPropConstructor(
        this.props.dispatch,
        this.props.nav,
      )} />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const { persistor, store } = configureStore();

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}>
          <AppWithNavigationState />
        </PersistGate>
      </Provider>
    );
  }
}