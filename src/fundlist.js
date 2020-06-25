const config = require('./config.js');

let fundlist = async workbook => {

  const worksheet = workbook.getWorksheet(config.sheetname);
  const fundColumn = worksheet.getColumn(config.fundCodeCol);

  const fundList = [];
  fundColumn.eachCell((cell, rowNumber) => {
    if(rowNumber >= config.firstRow){
      const fund = {};
      fund.name = cell.text;
      fund.code = worksheet.getCell(`${config.fundCodeCol}${rowNumber}`).text;
      fundList.push(fund);
    }
  });

  return fundList;
}

module.exports = fundlist;
