import CCC from '../ccc-streamer-utilities.js';
import openSocket from 'socket.io-client';
const cryptoCompareSocket = 'https://streamer.cryptocompare.com/';
const socket = openSocket(cryptoCompareSocket);
const Helpers = require("../helpers.js");


export const PAGE_LENGTH = 30;

// COIN_SYMBOLS
export const REQUEST_COIN_SYMBOLS = 'REQUEST_COIN_SYMBOLS'
function requestCoinSymbols(currentPageNumber) {
  return {
    type: REQUEST_COIN_SYMBOLS,
    currentPageNumber
  }
}

export const RECEIVE_COIN_SYMBOLS = 'RECEIVE_COIN_SYMBOLS'
function receiveCoinSymbols(coins) {
  return {
    type: RECEIVE_COIN_SYMBOLS,
    coins,
  }
}

export const UPDATE_CURRENT_PAGE_NUMBER = 'UPDATE_CURRENT_PAGE_NUMBER'
function updateCurrentPageNumber(currentPageNumber) {
  return {
    type: UPDATE_CURRENT_PAGE_NUMBER,
    currentPageNumber,
  }
}

function fetchCoinSymbols(pageNumber) {
  return (dispatch, getState) => {
    dispatch(requestCoinSymbols(pageNumber))
    return fetch('https://min-api.cryptocompare.com/data/top/totalvol?tsym=USD&limit='+ PAGE_LENGTH+'&page=' + pageNumber)
      .then(response => response.json())
      .then(json => {
        let coins = json.Data.map((coin, index) => {
          let result = coin.CoinInfo;
          result.SUB_NEEDED = coin.ConversionInfo.SubsNeeded[0];
          result.PRICE_INFO = CCC.CCC.CURRENT.unpack(coin.ConversionInfo.RAW[0]);
          result.Supply = json.Data[0].ConversionInfo.Supply;
          result.isFetchingHistory = false;
          result.HistoryData = {};
          return result;
        });
        dispatch(receiveCoinSymbols(coins))
        if(pageNumber == 0){
          dispatch(subscribeCoins(coins.slice(0, 15).map(coin => coin.Name)));

          setTimeout(() => {
            dispatch(doSubscribeCoins(getState().subscriptions));
          }, 2000)
        }
      })
  }
}

function shouldFetchCoinSymbols(pageNumber, state) {
    const coins = state.coins
    if (coins.isFetching) {
      return false
    } else if (!coins ) {
      return true
    } else if (!state.loadedPages[pageNumber]) {
      return true
    } else {
      return false
    }
}

export function fetchCoinSymbolsIfNeeded(pageNumber) {
    return (dispatch, getState) => {
        dispatch(doUnsubscribeCoins());
        dispatch(updateCurrentPageNumber(pageNumber));
        if (shouldFetchCoinSymbols(pageNumber, getState())) {
            return dispatch(fetchCoinSymbols(pageNumber))
        } else {
          if(pageNumber == 0){
            dispatch(subscribeCoins(getState().coinNames.slice(pageNumber * PAGE_LENGTH, (pageNumber * PAGE_LENGTH) + PAGE_LENGTH).slice(0, 15)));
            setTimeout(() => {
              dispatch(doSubscribeCoins(getState().subscriptions));
            }, 2000)  
          }
          
            return Promise.resolve()
        }
    }
}

// COIN
export const REQUEST_COIN = 'REQUEST_COIN'
function requestCoin() {
  return {
    type: REQUEST_COIN,
  }
}

export const RECEIVE_COIN = 'RECEIVE_COIN'
function receiveCoin(coin) {
  return {
    type: RECEIVE_COIN,
    coin,
  }
}

function fetchCoin(coinSymbol) {
  return dispatch => {
    dispatch(requestCoin(coinSymbol))
    
    return fetch('https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms='+ coinSymbol.toUpperCase() +'&tsym=USD')
      .then(response => response.json())
      .then(json => {
        let coin = json.Data[0].CoinInfo;
        coin.SUB_NEEDED = json.Data[0].ConversionInfo.SubsNeeded[0];
        coin.PRICE_INFO = CCC.CCC.CURRENT.unpack(json.Data[0].ConversionInfo.RAW[0]);
        coin.Supply = json.Data[0].ConversionInfo.Supply;
        dispatch(receiveCoin(coin))  

        dispatch(subscribeCoins([coin]));

        setTimeout(() => {
          dispatch(doSubscribeCoins([coin.Name]));
        }, 100)  
      })
  }
}

export function fetchCoinIfNeeded(coinSymbol) {
    return (dispatch, getState) => {
        dispatch(doUnsubscribeCoins());
        if (!getState().isFetching && !getState().coins[coinSymbol]) {
            return dispatch(fetchCoin(coinSymbol))
        } else {
          dispatch(subscribeCoins([coinSymbol]));

          setTimeout(() => {
            dispatch(doSubscribeCoins([coinSymbol]));
          }, 100)  
        }
    }
}

// HISTORY DATA
export const REQUEST_HISTORY_DATA = 'REQUEST_HISTORY_DATA'
function requestHistoryData() {
  return {
    type: REQUEST_HISTORY_DATA,
  }
}

export const RECEIVE_HISTORY_DATA = 'RECEIVE_HISTORY_DATA'
function receiveHistoryData(coinSymbol, historyData, duration) {
  return {
    type: RECEIVE_HISTORY_DATA,
    data: historyData,
    duration,
    coinSymbol
  }
}

function fetchHistoryData(coinSymbol, duration) {
  return dispatch => {
    dispatch(requestHistoryData())
    return fetch(Helpers.getCoinHistoryURL(coinSymbol, duration))
      .then(response => response.json())
      .then(json => {
        let historyData = json.Data;
        dispatch(receiveHistoryData(coinSymbol, historyData, duration))        
      })
  }
}

export function fetchHistoryDataIfNeeded(coinSymbol, duration) {
    return (dispatch, getState) => {
        if (!getState().historyData[coinSymbol + '-' + duration]) {
            return dispatch(fetchHistoryData(coinSymbol, duration))
        }
    }
}

// MARKET DATA
export const REQUEST_MARKET_DATA = 'REQUEST_MARKET_DATA'
function requestMarketData() {
  return {
    type: REQUEST_MARKET_DATA,
  }
}

export const RECEIVE_MARKET_DATA = 'RECEIVE_MARKET_DATA'
function receiveMarketData(coinSymbol, marketData) {
  return {
    type: RECEIVE_MARKET_DATA,
    data: marketData,
    coinSymbol
  }
}

function fetchMarketData(coinSymbol) {
  return dispatch => {
    dispatch(requestMarketData())
    return fetch('https://min-api.cryptocompare.com/data/top/exchanges/full?limit=1000&fsym=' + coinSymbol.toUpperCase() + '&tsym=USD')
      .then(response => response.json())
      .then(json => {
        let marketData = json.Data.Exchanges;
        dispatch(receiveMarketData(coinSymbol, marketData))        
      })
  }
}

export function fetchMarketDataIfNeeded(coinSymbol) {
    return (dispatch, getState) => {
        if (!getState().marketData[coinSymbol]) {
            return dispatch(fetchMarketData(coinSymbol))
        }
    }
}

export const SUBSCRIBE_COINS = 'SUBSCRIBE_COINS'
function subscribeCoins(coinSymbols) {
  return {
    type: SUBSCRIBE_COINS,
    coinSymbols
  }
}

export const UNSUBSCRIBE_COINS = 'UNSUBSCRIBE_COINS'
function unsubscribeCoins(coinSymbols) {
  return {
    type: UNSUBSCRIBE_COINS,
  }
}

export const RECEIVE_PRICE_INFO = 'RECEIVE_PRICE_INFO'
function receivePriceInfo(priceInfo, coinSymbol){
  return {
    type: RECEIVE_PRICE_INFO,
    coinSymbol, 
    priceInfo,
  }
}

function doSubscribeCoins(coinSymbols) {
  return (dispatch, getState) => {

    socket.on('m', data => {
      if(data[0] == "5"){
        let unpackedData = CCC.CCC.CURRENT.unpack(data);
        unpackedData.Name = unpackedData.FROMSYMBOL;
        dispatch(receivePriceInfo(unpackedData, unpackedData.FROMSYMBOL));
      }
    });
    const subscriptions = coinSymbols.map(coin => {return '5~CCCAGG~' + coin + '~USD'})
    socket.emit('SubAdd', { subs: subscriptions });
  }
}

export function doUnsubscribeCoins() {
  return (dispatch, getState) => {
    const subscriptions = getState().subscriptions.map(coin => {return '5~CCCAGG~' + coin + '~USD'})
    socket.emit('SubRemove', { subs: subscriptions });
    dispatch(unsubscribeCoins())
  }
}


