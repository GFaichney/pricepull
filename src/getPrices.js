const getFundPrice = require('./getFundPrice');

let getPrices = async fundList => {
  for(let i=0; i<fundList.length; i++){
    const fund = fundList[i];
    if(fund.code && fund.code !== ''){
      fund.price = await getFundPrice(fund);
    }
  }
}

module.exports = getPrices;
