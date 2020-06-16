const https = require('https');
const config = require('./config');

const getQuery = fundCode => (`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${fundCode}.LON&apikey=${config.apiKey}`);

const wait = async time => {
  return new Promise(resolve => {
    setTimeout(()=>{ resolve("Done") }, time *1000);
  });
}

const getFundPrice = async fund => {
  await wait(12);
  return new Promise((resolve, reject) => {
    https.get(getQuery(fund.code), (res) => {
      res.on('data', (d) => {
        const json = JSON.parse(d);
        console.log(JSON.stringify(json, null, 2));
        if(json['Global Quote']){
          console.log(`Price retrieval succeeded for symbol ${fund.code} - ${json['Global Quote']['05. price']}`);
          resolve(json['Global Quote']['05. price']);
        } else {
          const err = `Price retrieval failed for symbol ${fund.code} - ${json['Error Message']}`;
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
