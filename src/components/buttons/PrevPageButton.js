import React from 'react'
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { withStyles } from '@material-ui/core/styles';

function PrevPageButton(props){
    let { onClick, classes } = props;
    return (
        <Button size="small" 
                className={classes.button} 
                onClick={onClick}> 
            <KeyboardArrowLeft />
            Prev Page
        </Button>
    );
}

const styles = theme => ({
    button: {
        color: '#f4a261',
        float: 'left',
    },
});

export default withStyles(styles)(PrevPageButton);