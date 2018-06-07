import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchCoinSymbolsIfNeeded, 
    doUnsubscribeCoins,
    PAGE_LENGTH
} from '../redux/actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import CoinTable from '../components/CoinTable';
import NextPageButton from '../components/buttons/NextPageButton';
import PrevPageButton from '../components/buttons/PrevPageButton';

class Home extends Component {
  componentDidMount() {
    const { dispatch, currentPageNumber, coins } = this.props
    dispatch(fetchCoinSymbolsIfNeeded(currentPageNumber))

  }
  render() {
    const { coins, isFetching, currentPageNumber, dispatch, coinNames } = this.props
    let arrayOfCoins = [];
    coinNames.forEach(coinName => {
        arrayOfCoins.push(coins[coinName]);
    })
    return (
      <div>
        {isFetching && <CircularProgress />}
        {!isFetching && coinNames.length > 0 && <CoinTable onClick={() => {}} pageNumber={currentPageNumber} coins={arrayOfCoins.slice(currentPageNumber * PAGE_LENGTH, (currentPageNumber * PAGE_LENGTH) + PAGE_LENGTH)}/>}
        {currentPageNumber > 0 && !isFetching && 
            <PrevPageButton onClick={() => {dispatch(fetchCoinSymbolsIfNeeded(currentPageNumber - 1)); window.scrollTo(0,0)}} />
        }
        {!isFetching && <NextPageButton onClick={() => {dispatch(fetchCoinSymbolsIfNeeded(currentPageNumber + 1)); window.scrollTo(0,0)}} />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { coins, isFetching, currentPageNumber, coinNames } = state
  return {
    coins,
    coinNames,
    isFetching,
    currentPageNumber
  }
}

export default connect(mapStateToProps)(Home)