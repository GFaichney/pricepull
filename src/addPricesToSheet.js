const config = require('./config');

const fundListToMap = fundList => {
  return fundList.reduce((acc, curr) => {
    if(curr.code != ''){
      acc[curr.code] = curr
    }
    return acc;
  }, {});
};

const addPricesToSheet = async (fundList, workbook) => {
  const worksheet = workbook.getWorksheet(config.sheetname);
  const fundCodeCol = worksheet.getColumn(config.fundCodeCol);

  const fundMap = fundListToMap(fundList);

  fundCodeCol.eachCell(async (cell, rowNumber) => {
    if(rowNumber >= config.firstRow){
      const fundCode = cell.text;
      const newPrice = fundMap[fundCode];
      if(newPrice){
        console.log(`Found new price for ${fundCode} : ${newPrice.price}`);
        const updCell = await worksheet.getCell(`${config.endOfDayCol}${rowNumber}`);
        updCell.value = newPrice.price;
      }
    }
  });

}

module.exports = addPricesToSheet;
