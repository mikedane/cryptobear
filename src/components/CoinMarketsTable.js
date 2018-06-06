import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import CCC from '../ccc-streamer-utilities.js';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
const Helpers = require("../helpers.js");

function CoinMarketsTable(props){
    const { markets, classes } = props;
    const imageRootUrl = 'https://www.cryptocompare.com/';
    return(
        <div className={classes.root}>
            <Typography variant="headline" >
                Markets
            </Typography>   
            <Table className={classes.table}>
                <TableHead >
                    <TableRow>
                        <TableCell >Exchange</TableCell>
                        <TableCell numeric>Price</TableCell>
                        <Hidden xsDown>
                        <TableCell numeric>Vol 24H</TableCell>
                        </Hidden>
                        <Hidden smDown>
                        <TableCell numeric>24H Low / High</TableCell>
                        </Hidden>
                        <Hidden xsDown>

                        <TableCell numeric>Chg. 24H</TableCell>
                        </Hidden>
                    </TableRow>
                </TableHead>
                <TableBody>
                {markets.map(coin => {
                    if(coin.VOLUME24HOURTO){
                        return (
                        <TableRow key={coin.Name} className={classes.tableRow} >
                            
                            <TableCell numeric style={{textAlign: 'left'}} >
                                {coin.MARKET}
                            </TableCell>    
                            <TableCell numeric className={classes.cell + ' ' + (coin.FLAGS == "1" ? classes.priceUp : coin.FLAGS == "2" ? classes.priceDown : null)}>
                                {CCC.CCC.STATIC.CURRENCY.getSymbol(coin.TOSYMBOL) + ' ' + Math.round(coin.PRICE*100)/100}
                            </TableCell>    
                            <Hidden xsDown>
                            <TableCell className={classes.cell} numeric>{Helpers.formatLongNumber(CCC.CCC.STATIC.CURRENCY.getSymbol(coin.TOSYMBOL), coin.VOLUME24HOURTO)}</TableCell>    
                            </Hidden>
                            <Hidden smDown>
                                <TableCell className={classes.cell} numeric><span className={classes.priceDown}>{Math.round(coin.LOW24HOUR*100)/100}</span> / <span className={classes.priceUp}>{Math.round(coin.HIGH24HOUR*100)/100}</span></TableCell>    
                             </Hidden>
                            <Hidden xsDown>
                                <TableCell numeric className={classes.cell + ' ' + (((coin.PRICE - coin.OPEN24HOUR)/coin.OPEN24HOUR * 100) >= 0 ? classes.priceUp : classes.priceDown)}>{Helpers.formatLongNumber('', coin.CHANGEPCT24HOUR)} %</TableCell> 
                            </Hidden>                       
                            
                        </TableRow>
                        );
                    }else {
                        return null;
                    } 
                })}
                </TableBody>
            </Table>
        </div>
    );
}

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      
    },
    table: {
        fontSize: '2em',
        padding: '0px',
    },
    avatar: {
        backgroundColor: 'white',
      },
    cardHeader: {
        padding: '0px',
        
    },
    tableRow: {
        padding: '0px',
    },
    tableHead: {
        fontSize: '0.5em',
    },
    indexCell: {
        padding: '0px',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    cell: {
        paddingTop: '4px',
        paddingBottom: '4px',
        paddingLeft: '30px',
        paddingRight: '30px',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    chart: {
        filter: 'invert(50%)hue-rotate(20deg)',
    },
    priceUp: {
        color: '#2a9d8f'
    },
    priceDown: {
        color: '#e76f51'
    },
  });

export default withStyles(styles)(CoinMarketsTable);