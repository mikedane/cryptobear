import React from 'react';
import { Route, Link, Redirect } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SearchBar from '../containers/SearchBar.js';
import Hidden from '@material-ui/core/Hidden';

function Header(props){
    const { classes } = props;
    return (
        <div className={classes.headerWrap}>
            <div className={classes.header}>
                    <Link to="/" className={classes.link}>
                        <Typography variant="title" color="inherit" className={classes.title}>
                            <img  width="50" height="50" src={require(".././static/images/logo.png")} /> 
                            <span style={{position: 'relative', bottom: '14px'}}>Crypto Bear</span>
                        </Typography>
                    </Link>
                    <Hidden only="xs">
                        <Route path="/" component={SearchBar} />
                    </Hidden>
            </div>
        </div>
    );
}

const styles = theme => ({
    title: {
        fontSize: '2em',
        color: '#264653',
    },
    link: {
        textDecoration: 'none',
        color: '#264653',
    },
    headerWrap: {
        display: 'flex', 
        justifyContent: 'center',
        background: 'white', 
        paddingTop: '1em',
        paddingBottom: '1em',
    },
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between', 
        width: '1400px', 
        marginLeft: '2%',
        marginRight: '2%',
        color: '#264653',
    },
});

export default withStyles(styles)(Header);