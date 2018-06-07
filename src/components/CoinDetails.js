import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { CardHeader } from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
const Helpers = require("../helpers.js");

function CoinDetails(props){
    const { coin, classes } = props;
    const imageRootUrl = 'https://www.cryptocompare.com/';
    return (
        <div>
            <div className={classes.row}>
                <div className={classes.title}>
                    <img src={imageRootUrl + coin.ImageUrl} alt={coin.Name} className={classes.avatar}/>
                    <div className={classes.name}>
                        <Typography variant="headline" >
                            {coin.FullName}            
                        </Typography>
                        <Typography variant="subheading" color="textSecondary">
                            {coin.Name}
                        </Typography>
                    </div>
                </div>
                <Hidden mdUp>
                    <div style={{width: '200px'}}></div>
                </Hidden>
                <div className={classes.item}>  
                    <Typography variant="subheading" color="textSecondary" >
                        Price
                    </Typography>   
                    <Typography variant="display2" className={classes.cell + ' ' + (coin.PRICE_INFO.FLAGS == "1" ? classes.priceUp : coin.PRICE_INFO.FLAGS == "2" ? classes.priceDown : null)}>
                        $ {coin.PRICE_INFO.PRICE}            
                    </Typography> 
                </div>
                <Hidden smUp>
                    <div style={{width: '100px', backgroundColor: 'white'}}></div>
                </Hidden>
                <div className={classes.item}>  
                    <Typography variant="subheading" color="textSecondary">
                        Vol 24H
                    </Typography>   
                    <Typography variant="headline" >
                        {Helpers.formatLongNumber('$', coin.PRICE_INFO.VOLUME24HOURTO)}       
                    </Typography> 
                </div>
                <Hidden smUp>
                    <div style={{width: '50px', backgroundColor: 'white'}}></div>
                </Hidden>
                <div className={classes.item}>  
                    <Typography variant="subheading" color="textSecondary">
                        Market Cap
                    </Typography>   
                    <Typography variant="headline" >
                        {Helpers.formatLongNumber('$', coin.PRICE_INFO.PRICE * coin.Supply)}      
                    </Typography> 
                </div>
                <div className={classes.item}>  
                    <Typography variant="subheading" color="textSecondary">
                        Change 24H
                    </Typography>   
                    <Typography variant="headline" className={classes.cell + ' ' + (((coin.PRICE - coin.OPEN24HOUR)/coin.OPEN24HOUR * 100) >= 0 ? classes.priceUp : classes.priceDown)}>
                        {Helpers.formatLongNumber('', ((coin.PRICE_INFO.PRICE - coin.PRICE_INFO.OPEN24HOUR)/coin.PRICE_INFO.OPEN24HOUR * 100))} %      
                    </Typography> 
                </div>   
                            
                                            
        </div>
        <hr />
        <div className={classes.row} style={{flexDirection: 'reverse-wrap'}}>
            <div className={classes.item}>  
                <Typography variant="subheading" color="textSecondary" >
                    Low 24H
                </Typography>   
                <Typography className={classes.smText} variant="body2" style={{fontSize: '1.1em'}} className={classes.priceDown}>
                    $ {coin.PRICE_INFO.LOW24HOUR}   
                </Typography> 
            </div>   
            <div className={classes.item}>  
                <Typography variant="subheading" color="textSecondary">
                    High 24H
                </Typography>   
                <Typography className={classes.smText} variant="body2" style={{fontSize: '1.1em'}} className={classes.priceUp}>
                    $ {coin.PRICE_INFO.HIGH24HOUR}    
                </Typography> 
            </div>   
            <div className={classes.item}>  
                <Typography variant="subheading" color="textSecondary">
                    Last Trade Market
                </Typography>   
                <Typography className={classes.smText} variant="body2" >
                    {coin.PRICE_INFO.LASTMARKET} 
                </Typography> 
            </div> 
            <div className={classes.item}>  
                <Typography variant="subheading" color="textSecondary">
                    Last Trade Vol
                </Typography>   
                <Typography className={classes.smText} variant="body2" >
                    {coin.PRICE_INFO.LASTVOLUME} {coin.PRICE_INFO.FROMSYMBOL}
                </Typography> 
            </div> 
            <div className={classes.item}>  
                <Typography variant="subheading" color="textSecondary">
                    Last Trade Price
                </Typography>   
                <Typography className={classes.smText} variant="body2" >
                    {Helpers.formatLongNumber('', coin.PRICE_INFO.LASTVOLUMETO)} {coin.PRICE_INFO.TOSYMBOL}
                </Typography> 
            </div>             
        </div>
        <div className={classes.row}>
            <div className={classes.item}>  
                <Typography variant="caption" color="textSecondary">
                    Algorithm
                </Typography>   
                <Typography  variant="body2" >
                    {coin.Algorithm}   
                </Typography> 
            </div>   
            <div className={classes.item}>  
                <Typography variant="caption" color="textSecondary">
                    Proof Type
                </Typography>   
                <Typography  variant="body2" >
                    {coin.ProofType} 
                </Typography> 
            </div>   
 
            <div className={classes.item}>  
                <Typography variant="caption" color="textSecondary">
                    Hashes / sec
                </Typography>   
                <Typography  variant="body2" >
                    {Helpers.formatLongNumber('', coin.NetHashesPerSecond)}
                </Typography> 
            </div>  
            <div className={classes.item}>  
                <Typography variant="caption" color="textSecondary">
                    Block Reward
                </Typography>   
                <Typography  variant="body2" >
                    {coin.BlockReward}
                </Typography> 
            </div> 
            <div className={classes.item}>  
                <Typography variant="caption" color="textSecondary">
                    Block Number
                </Typography>   
                <Typography  variant="body2" >
                    {coin.BlockNumber}
                </Typography> 
            </div>             
        </div>
      </div>
    );
}


const styles = theme => ({
    item: {
        margin: '10px'
    },
    smText: {
        fontSize: '1.1em',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
       
    },
    title: {
        display: 'flex',
    },
    name: {
        marginTop: '12px',
        marginLeft: '10px',
    },
    avatar: {
        width: '75px',
        height: '75px'
    },
    priceUp: {
        color: '#2a9d8f',
    },
    priceDown: {
        color: '#e76f51',
    },
});


export default withStyles(styles)(CoinDetails);