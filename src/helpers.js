
function formatLongNumber(numericSymbol, value) {
    if(value == 0) {
      return '-';
    }
    else
    {
          // for testing
        //value = Math.floor(Math.random()*1001);
   
        // hundreds
        if(value <= 999){
          return numericSymbol + ' ' + roundNumber(value);
        }
        // thousands
        else if(value >= 1000 && value <= 999999){
          return numericSymbol + ' ' + roundNumber((value / 1000)) + ' K';
        }
        // millions
        else if(value >= 1000000 && value <= 999999999){
          return numericSymbol + ' ' + roundNumber((value / 1000000)) + ' M';
        }
        // billions
        else if(value >= 1000000000 && value <= 999999999999){
          return numericSymbol + ' ' + roundNumber((value / 1000000000)) + ' B';
        }
        else
          return value;
    }
  }

  function roundNumber(number){
    return Math.round(number*100)/100
  }


  function convertUTCSecondsToDate(utcSeconds){
    let date = new Date(0);
    date.setUTCSeconds(utcSeconds);
    return date;
  }

  function formatDateAsHourOfDay(date){
    let hour = (date.getHours() > 12 ? date.getHours() - 12 : (date.getHours() == 0 ? 12 : date.getHours()));
    let amPm = (date.getHours() > 12 ? 'PM' : 'AM');
    let minutes = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    return hour + ':' + minutes + ' ' + amPm;
  }

  function formatDateAsDayOfYear(date){
    return date.toLocaleDateString();
  }


  function getCoinHistoryURL(coinSymbol, duration){
    let baseUrl = 'https://min-api.cryptocompare.com/data/';
    switch(duration){
      case "today":
          return baseUrl + 'histominute?aggregate=10&limit=144&tsym=USD&fsym=' + coinSymbol.toUpperCase();
          break;
      case "week":
        return baseUrl + 'histohour?aggregate=1&limit=168&tsym=USD&fsym=' + coinSymbol.toUpperCase();
          break;
      case "month":
        return baseUrl + 'histohour?aggregate=6&limit=120&tsym=USD&fsym=' + coinSymbol.toUpperCase();
          break;
      case "hour":
          console.log(baseUrl + 'histominute?aggregate=1&limit=60&tsym=USD&fsym=' + coinSymbol.toUpperCase())
          return baseUrl + 'histominute?aggregate=1&limit=60&tsym=USD&fsym=' + coinSymbol.toUpperCase();
          break;
      case "year":
          return baseUrl + 'histoday?aggregate=1&limit=365&tsym=USD&fsym=' + coinSymbol.toUpperCase();
          break;
      case "all":
          return baseUrl + 'histoday?aggregate=5&allData=true&tsym=USD&fsym=' + coinSymbol.toUpperCase();
          break;
    }
  }

module.exports.formatLongNumber = formatLongNumber;
module.exports.convertUTCSecondsToDate = convertUTCSecondsToDate;
module.exports.formatDateAsHourOfDay = formatDateAsHourOfDay;
module.exports.formatDateAsDayOfYear = formatDateAsDayOfYear;
module.exports.getCoinHistoryURL = getCoinHistoryURL;


