import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Home from '../containers/Home';
import Coin from '../containers/Coin';
import Header from './Header.js';
import { HashRouter as Router, Route} from "react-router-dom";

function App(props){
    const theme = createMuiTheme({
        typography: {fontFamily: '"Cabin", "Helvetica", "Arial", sans-serif'}
    });
    const { classes } = props;
    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <Router onUpdate={() => window.scrollTo(0, 0)}>
                    <div className={classes.body}>
                        <Header />
                        <div className={classes.main}>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/coins/:coin" component={Coin} />
                        </div>
                    </div>
                </Router>
            </MuiThemeProvider>
        </div>           
    );
}

const styles = theme => ({
    body: {
        minHeight: '100vh',
    },
    main: {
        margin: 'auto',
        maxWidth: '1000px'
    },
});

export default withStyles(styles)(App);