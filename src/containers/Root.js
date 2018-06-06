import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import App from '../components/App'
import { fetchCoinSymbolsIfNeeded, fetchCoinIfNeeded, fetchHistoryDataIfNeeded } from '../redux/actions';

const store = configureStore()

// store.dispatch(fetchHistoryDataIfNeeded('BTC', 'minute'));



export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
        {/* <h1>h</h1> */}
      </Provider>
    )
  }
}