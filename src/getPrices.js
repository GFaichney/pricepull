const getFundPrice = require('./getFundPrice');

let getPrices = async fundList => {
  for(let i=0; i<fundList.length; i++){
    const fund = fundList[i];
    if(fund.code && fund.code !== ''){
      try{
        fund.price = await getFundPrice(fund);
      } catch (e) {
        console.log(`Failure getting fund price for ${fund.code}`, e);
        fund.price = 0
      }
    }
  }
}

module.exports = getPrices;
