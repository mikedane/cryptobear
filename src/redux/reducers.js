import { combineReducers } from 'redux'
import {
    REQUEST_COIN_SYMBOLS,
    RECEIVE_COIN_SYMBOLS,
    REQUEST_COIN,
    RECEIVE_COIN,
    UPDATE_CURRENT_PAGE_NUMBER,
    RECEIVE_HISTORY_DATA,
    REQUEST_HISTORY_DATA,
    RECEIVE_MARKET_DATA,
    REQUEST_MARKET_DATA,
    RECEIVE_PRICE_INFO,
    SUBSCRIBE_COINS,
    UNSUBSCRIBE_COINS
} from './actions'

function coins(state = {subscriptions: [], isFetchingMarket: false, isFetching: false, historyData: {}, marketData: {}, isFetchingHistory: false, coins: {}, loadedPages: {}, coinNames: [], currentPageNumber: 0}, action) {
  switch (action.type) {
    case REQUEST_COIN_SYMBOLS:
      let tempLoadedPages = [...state.loadedPages];
      tempLoadedPages[action.currentPageNumber] = true;
      return Object.assign({}, state, {
        isFetching: true,
        loadedPages: tempLoadedPages,
      })
    case RECEIVE_COIN_SYMBOLS:
      let tempCoinNames = [...state.coinNames];
      tempCoinNames.push(...action.coins.map(coin => coin.Name));
      let tempCoins = state.coins;
      action.coins.forEach(coin => {
        if(!tempCoins[coin.Name]){
          tempCoins[coin.Name] = coin
        }
      })
      return Object.assign({}, state, {
        isFetching: false,
        coins: tempCoins,
        coinNames: tempCoinNames
      });
    case REQUEST_COIN:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_COIN:
      let tempCoins2 = {...state.coins};
      tempCoins2[action.coin.Name] = action.coin;
      return Object.assign({}, state, {
        isFetching: false,
        coins: tempCoins2,
      });
    case REQUEST_HISTORY_DATA:
      return Object.assign({}, state, {
        isFetchingHistory: true
      })
    case RECEIVE_HISTORY_DATA:  
      let tempHistoryData = {...state.historyData};
      tempHistoryData[action.coinSymbol + '-' + action.duration] = action.data;
      return Object.assign({}, state, {
        isFetchingHistory: false,
        historyData: tempHistoryData
      });
    case REQUEST_MARKET_DATA:
      return Object.assign({}, state, {
        isFetchingMarket: true
      })
    case RECEIVE_MARKET_DATA:  
      let tempMarketData = {...state.marketData};
      tempMarketData[action.coinSymbol] = action.data;
      return Object.assign({}, state, {
        isFetchingMarket: false,
        marketData: tempMarketData
      });
    case SUBSCRIBE_COINS:
      let tempSubscriptions = [...state.subscriptions];
      tempSubscriptions.push.apply(tempSubscriptions, action.coinSymbols);
      return Object.assign({}, state, {
        subscriptions: tempSubscriptions
      });
    case UNSUBSCRIBE_COINS:
      return Object.assign({}, state, {
        subscriptions: []
      });
    case RECEIVE_PRICE_INFO:
      let tempCoins3 = {...state.coins};
      // tempCoins3[action.coinSymbol] = action.data;
      Object.keys(action.priceInfo).forEach(key => {
        tempCoins3[action.coinSymbol].PRICE_INFO[key] = action.priceInfo[key];
      });
      return Object.assign({}, state, {
        coins: tempCoins3
      });
    case UPDATE_CURRENT_PAGE_NUMBER:
      return Object.assign({}, state, {
        currentPageNumber: action.currentPageNumber
      });
    default:
      return state
  }
}


// const rootReducer = combineReducers({
//     coins,
// })
const rootReducer = coins;

export default rootReducer