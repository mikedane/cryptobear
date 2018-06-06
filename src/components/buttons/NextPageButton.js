import React from 'react'
import Button from '@material-ui/core/Button';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { withStyles } from '@material-ui/core/styles';

function NextPageButton(props){
    let { onClick, classes } = props;
    return (
        <Button size="small" 
                className={classes.button} 
                onClick={onClick}>
                Next Page
            <KeyboardArrowRight /> 
        </Button>
    );
}

const styles = theme => ({
    button: {
        color: '#f4a261',
        float: 'right',
    },
});

export default withStyles(styles)(NextPageButton);