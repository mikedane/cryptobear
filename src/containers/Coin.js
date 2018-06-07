import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchCoinIfNeeded,
    fetchHistoryDataIfNeeded,
    fetchMarketDataIfNeeded
} from '../redux/actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import CoinDetails from '../components/CoinDetails'
import CoinHistoryChart from '../components/CoinHistoryChart.js'
import CoinMarketsTable from '../components/CoinMarketsTable'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router-dom'

class Coin extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      selectedChartIndex: 0
    }

  }
  
  componentDidMount() {
    const { dispatch } = this.props
    const coinSymbol = this.props.match.params.coin.toUpperCase();
    dispatch(fetchCoinIfNeeded(coinSymbol))
    dispatch(fetchMarketDataIfNeeded(coinSymbol))
    dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'hour'))
    dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'today'))
    dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'week'))
    dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'month'))
    dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'year'))
    dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'all'))
    window.scrollTo(0,0)
  }

  handleChartChange = (event, selectedChartIndex) => {
    this.setState({ selectedChartIndex });
    const { dispatch } = this.props
    const coinSymbol = this.props.match.params.coin.toUpperCase();
    switch(selectedChartIndex){
        case 0:
            dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'hour'))
            break;
        case 1:
          dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'today'))
            break;
        case 2:
            dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'week'))
            break;
        case 3:
            dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'month'))
            break;
        case 4:
            dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'year'))
            break;
        case 5: 
            dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'all'));
            break;
    }
  };

  getCurrentCoinData(){
    const { historyData } = this.props;
    const coinSymbol = this.props.match.params.coin.toUpperCase();
    switch(this.state.selectedChartIndex){
      case 0:
          return historyData[coinSymbol + '-hour']
          break;
      case 1:
          return historyData[coinSymbol + '-today']
          break;
      case 2:
          return historyData[coinSymbol + '-week']
          break;
      case 3:
          return historyData[coinSymbol + '-month']
          break;
      case 4:
          return historyData[coinSymbol + '-year']
          break;
      case 5: 
          return historyData[coinSymbol + '-all']
          break;
    }
  }

  getFiller(){
    const { historyData } = this.props;
    const coinSymbol = this.props.match.params.coin.toUpperCase();
    return historyData[coinSymbol + '-hour']
  }

  render() {
    const { isFetching, dispatch, coins, historyData, marketData } = this.props
    let currentCoin = coins[this.props.match.params.coin.toUpperCase()];
    let currentHistoryData = this.getCurrentCoinData()
    let currentMarketData = marketData[this.props.match.params.coin.toUpperCase()];
    return (
      <div>
        {isFetching && <CircularProgress />}
        {(!isFetching && currentCoin && Object.keys(currentCoin).length > 0) &&
        (
          <div>
            <CoinDetails coin={currentCoin} />

                <div>
                  <Tabs value={this.state.selectedChartIndex} primary='#2a9d8f' scrollable scrollButtons="off" onChange={this.handleChartChange}>
                    <Tab label="1 Hour" />
                    <Tab label="24 Hours" />
                    <Tab label="1 Week" />
                    <Tab label="1 Month" />
                    <Tab label="1 Year" />
                    <Tab label="All Data" />
                  </Tabs>
                  <CoinHistoryChart selectedChartIndex={this.state.selectedChartIndex} historyData={currentHistoryData ? currentHistoryData : []} />
                  {( currentMarketData &&
                  <CoinMarketsTable markets={currentMarketData} />
                  )}
                </div>
              
          
          </div>
        )
        }
      </div>
    )
  }
}





function mapStateToProps(state) {
  const { isFetching, coins, historyData, marketData } = state
  return {
    isFetching,
    coins,
    historyData,
    marketData
  }
}

export default withRouter(connect(mapStateToProps)(Coin))