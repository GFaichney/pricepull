const https = require('https');
const config = require('./config');

const getIEXCode = fundCode => (`${fundCode.replace('.', '')}-LN`);
const getQuery = fundCode => (`https://cloud.iexapis.com/stable/stock/${getIEXCode(fundCode)}/previous?token=${config.iex.apiKey}`);

const getFundPrice = async fund => {
  return new Promise((resolve, reject) => {
    https.get(getQuery(fund.code), (res) => {
      res.on('data', (d) => {
        let json;
        try{
          json = JSON.parse(d);
        }catch(e){
          console.log('Failed to get JSON');
        }
        if(json){
          console.log(`Price retrieval succeeded for symbol ${fund.code} - ${json}`);
          resolve(json);
        } else {
          const err = `Price retrieval failed for symbol ${fund.code} - ${d}`;
          reject(err);
        }
      });
    }).on('error', (e) => {
      console.error(e);
      reject(e);
    });
  });

}

module.exports = getFundPrice;
