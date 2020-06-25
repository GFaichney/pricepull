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

        Object.keys(newPrice.data).forEach(async val => {
          if(config.output[val]){
            const updCell = await worksheet.getCell(`${config.output[val]}${rowNumber}`);
            if(config.output.multiplyToPence.includes(val)){
              updCell.value = newPrice.data[val] * 100;
            } else {
              updCell.value = newPrice.data[val];
            }
          }
        });
      }
    }
  });

}

module.exports = addPricesToSheet;
