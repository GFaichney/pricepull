const getFundPrice = require('./getFundPriceIEX');
const config = require('./config');

const wait = async time => {
  return new Promise(resolve => {
    setTimeout(()=>{ resolve("Done") }, time *1000);
  });
}


let getPrices = async fundList => {
  for(let i=0; i<fundList.length; i++){
    const fund = fundList[i];
    if(fund.code && fund.code !== ''){
      try{
        await wait(config.pricePullDelay);
        let newfund = await getFundPrice(fund);
        console.log(newfund);
        fund.data = newfund;
      } catch (e) {
        console.log(`Failure getting fund price for ${fund.code}`, e);
        fund.data = { uClose : 'error retrieving data' };
      }
    }
  }
}

module.exports = getPrices;
