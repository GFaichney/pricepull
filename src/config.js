let config = {
  filename: './data_src/ftse250.xlsx',
  outprefix: './data_out/data',
  sheetname: 'Sheet1',
  fundCodeCol: 'A',
  output: {
    multiplyToPence: 'uClose,uOpen,uHigh,uLow',
    uClose: 'C',
    uOpen: 'D',
    uHigh: 'E',
    uLow: 'F',
    uVolume: 'G',
    date: 'H'
  },
  pricePullDelay: 0.7,
  firstRow: 2,
  iex: {
    apiKey: `${process.env.IEX_KEY}`
  }
};




module.exports = config;
