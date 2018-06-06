import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { compose } from 'redux';

// Material Ui
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Hidden from '@material-ui/core/Hidden';
import {
  fetchCoinIfNeeded,
  fetchHistoryDataIfNeeded,
  fetchMarketDataIfNeeded
} from '../redux/actions'

const Helpers = require("../helpers.js");

function generateQueryUrl(query){
 
    return '/coins/' + query;
}



function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;
  return (
    <Hidden only="xs">
        <Paper {...containerProps} square >
        {children}
        </Paper>
    </Hidden>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.nodeName;
}

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            highlightedSuggestion: ""
          };
          console.log(this.props)
      this.handleSuggestionHighlighted = this.handleSuggestionHighlighted.bind(this);
    }

    loadNewCoinInfo(coinSymbol){
      const { dispatch } = this.props;
      dispatch(fetchCoinIfNeeded(coinSymbol))
      dispatch(fetchMarketDataIfNeeded(coinSymbol))
      dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'hour'))
      dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'today'))
      dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'week'))
      dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'month'))
      dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'year'))
      dispatch(fetchHistoryDataIfNeeded(coinSymbol, 'all'))
    }

    renderSuggestion(suggestion, { query, isHighlighted }) {
      const matches = match(suggestion.nodeName, query);
      const parts = parse(suggestion.nodeName, matches);
        return (
          <Link onClick={() => {this.loadNewCoinInfo(suggestion.fullPath.split("/")[2].toUpperCase())}} to={generateQueryUrl(suggestion.fullPath.split("/")[2])} style={{textDecoration: "none", }}>
              <MenuItem selected={isHighlighted} component="div">
                  <div>
                      {parts.map((part, index) => {
                      return part.highlight ? (
                          <strong key={String(index)} style={{ fontWeight: 500, color: "#2a9d8f" }}>
                          {part.text}
                          </strong>
                      ) : (
                          <span key={String(index)} style={{ fontWeight: 300 }}>
                          {part.text}
                          </span>
                      );
                      })}
                  </div>
              </MenuItem>
          </Link>
        );
      
    }

    handleSubmit(e){
        if (e.key === 'Enter' && this.state.highlightedSuggestion != "") {
            this.props.history.push(generateQueryUrl(this.state.highlightedSuggestion))
            this.loadNewCoinInfo(this.state.highlightedSuggestion.toUpperCase())
        }
    }

    renderInput(inputProps) {
        const { classes, ref, ...other } = inputProps;      
        return (
          <div className={classes.root}>
              <div className={classes.search}>
                  <SearchIcon />
              </div>
              <input {...inputProps} className={classes.input} type="text" />
          </div>
        );
    }

    handleSuggestionsFetchRequested = ({ value }) => {
      fetch("https://www.cryptocompare.com/api/autosuggest/all/?maxRows=5&q=" + value)
        .then(response => response.json())
        .then(json => {
          if(json.Results.length > 0){
            let items = [];
            json.Results.forEach(suggestion => {if(suggestion.group == 'Coins') items.push(suggestion)});
              this.setState({
                  suggestions: items,
              });
          }        
        })
    };

    handleSuggestionsClearRequested = () => {      
        this.setState({
        suggestions: [],
        });
    };

    handleChange = (event, { newValue }) => {
        if(newValue == ""){
          this.setState({
            highlightedSuggestion: "",
          });
        }
        this.setState({
            value: newValue,
        });
    };

  handleSuggestionHighlighted(suggestion){
    if(suggestion.suggestion == null || suggestion.suggestion == undefined){
      if(this.state.suggestions[0] && this.state.suggestions[0].fullPath){
       
  
        this.setState({value: this.state.suggestions.length > 0 ? this.state.suggestions[0].nodeName : "",
                       highlightedSuggestion: this.state.suggestions.length > 0 ? this.state.suggestions[0].fullPath.split("/")[2] : ""});
      }
    } else {
      
        this.setState({highlightedSuggestion: suggestion.suggestion.fullPath.split("/")[2]});
      
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div onKeyPress={(e) => this.handleSubmit(e)} >
        <Autosuggest
            theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
            suggestionsContainer: classes.suggestionsContainer,
            suggestionHighlighted: classes.suggestionHighlighted,
            }}
            renderInputComponent={this.renderInput}
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
            renderSuggestionsContainer={renderSuggestionsContainer}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={this.renderSuggestion.bind(this)}
            highlightFirstSuggestion={true}
            onSuggestionHighlighted={this.handleSuggestionHighlighted}
            inputProps={{
            placeholder: 'Search Coins',
            value: this.state.value,
            onChange: this.handleChange,
            classes: this.props.classes
            }}
        />
      </div>
        

    );
  }
}

const styles = theme => ({
    root: {
      fontFamily: theme.typography.fontFamily,
      position: 'relative',
      borderRadius: 2,
      background: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        background: fade(theme.palette.common.white, 0.25),
      },
      '& $input': {
        transition: theme.transitions.create('width'),
        width: 200,
        '&:focus': {
          width: 250,
        },
      },
    },
    search: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      font: 'inherit',
      marginTop: "10px",
      padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
        .spacing.unit * 9}px`,
      border: 0,
      display: 'block',
      verticalAlign: 'middle',
      whiteSpace: 'normal',
      background: 'none',
      margin: 0, // Reset for Safari
      color: 'black',
      width: '100%',
      '&:focus': {
        outline: 0,
      },
      '&::placeholder': {
        color: '#264653',
        opacity: "1" /* Firefox */
    },
    
    '&:-ms-input-placeholder': { /* Internet Explorer 10-11 */
       color: "inherit",
    },
    
    '&::-ms-input-placeholder' : { /* Microsoft Edge */
       color: "inherit"
    }
    },
      suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
      },

      suggestion: {
        display: 'block',
        color: '#264653',
      },
      suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
      },
    suggestionsContainer: {
        marginTop: "5px",
        borderRadius: "5px",
    }
  });





export default compose(withStyles(styles), connect())(SearchBar);