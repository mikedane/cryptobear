import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { Route, Link, Redirect } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';
import { PAGE_LENGTH } from '../redux/actions'
const Helpers = require("../helpers.js");

const currentDate = Date.now();
function CoinTable(props){
    const { coins, classes, pageNumber, onClick } = props;
    const imageRootUrl = 'https://www.cryptocompare.com/';
    return (
        <div style={{display: 'flex'}}>
            <div className={classes.root}>
                <Table className={classes.table}>
                    <TableHead >
                        <TableRow>
                            <TableCell className={classes.indexCell} >#</TableCell>
                            <TableCell >Coin</TableCell>
                            <TableCell numeric>Price</TableCell>
                            <Hidden xsDown>
                            <TableCell numeric>Vol 24H</TableCell>
                            </Hidden>
                            <Hidden smDown>
                            <TableCell numeric>Market Cap.</TableCell>
                            
                                <TableCell>7d Chart</TableCell>
                            </Hidden>
                            <Hidden xsDown>

                            <TableCell numeric>Chg. 24H</TableCell>
                            </Hidden>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {coins.map((coin, index) => {
                        return (
                        <TableRow key={coin.Name} className={classes.tableRow} >
                            <TableCell numeric className={classes.indexCell}>{(PAGE_LENGTH * pageNumber) + index + 1}</TableCell> 
                            <TableCell className={classes.cell}>
                                <CardHeader
                                    className={classes.cardHeader}
                                    avatar={
                                        <Link onClick={onClick} className={classes.link} to={'/coins/' + coin.Name.toLowerCase()} >

                                        <Avatar aria-label="Recipe" className={classes.avatar}>
                                            <img src={imageRootUrl + coin.ImageUrl} alt={coin.Name} width="40" height="40"/>
                                        </Avatar>
                                        </Link>
                                    }
                                    title={(                               
                                        <Link onClick={onClick} className={classes.link} to={'/coins/' + coin.Name.toLowerCase()} >
                                    {coin.FullName}
                                    </Link>
                                    )}
                                    subheader={(                               
                                        <Link onClick={onClick} className={classes.link } to={'/coins/' + coin.Name.toLowerCase()} >
                                {coin.Name}
                                </Link>
                                )}
                                />
                            </TableCell>
                            <TableCell numeric className={classes.cell + ' ' + (coin.PRICE_INFO.FLAGS == "1" ? classes.priceUp : coin.FLAGS == "2" ? classes.priceDown : null)}>
                                $ {coin.PRICE_INFO.PRICE}
                            </TableCell>    
                            <Hidden xsDown>
                        
                            <TableCell className={classes.cell} numeric>{Helpers.formatLongNumber('$', coin.PRICE_INFO.VOLUME24HOURTO)}</TableCell>    
                            </Hidden>                            
                            <Hidden smDown>
                            <TableCell numeric >{Helpers.formatLongNumber('$', coin.PRICE_INFO.PRICE * coin.Supply)}</TableCell>                                
                            
                                <TableCell className={classes.cell} numeric>
                                    <img alt="-" title="-" className={classes.chart} width="150" height="35" src={getCoinChartUrl(coin.Name, 'USD')} />
                                </TableCell>
                            </Hidden>
                            <Hidden xsDown>

                            <TableCell numeric className={classes.cell + ' ' + (((coin.PRICE_INFO.PRICE - coin.PRICE_INFO.OPEN24HOUR)/coin.PRICE_INFO.OPEN24HOUR * 100) >= 0 ? classes.priceUp : classes.priceDown)}>{Helpers.formatLongNumber('', ((coin.PRICE_INFO.PRICE - coin.PRICE_INFO.OPEN24HOUR)/coin.PRICE_INFO.OPEN24HOUR * 100))} %</TableCell> 
                            </Hidden>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function getCoinChartUrl(fromSym, toSym){
    return 'https://images.cryptocompare.com/sparkchart/' + fromSym + '/' + toSym + '/latest.png?ts=' + currentDate;
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
        paddingLeft: '10px',
        paddingRight: '10px',
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

export default withStyles(styles)(CoinTable);