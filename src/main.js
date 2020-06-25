const Excel = require('exceljs');
const config = require('./config');
const fundlist = require('./fundlist');
const getPrices = require('./getPrices');
const timestamp = require('./timestamp');
const addPricesToSheet = require('./addPricesToSheet');

let copy = async () => {
  var workbook = new Excel.Workbook();
  try {
    await workbook.xlsx.readFile(`${config.filename}`);
  } catch(e) {
    console.log(`Failed to load file ${config.filename}`);
  }
  await workbook.xlsx.writeFile('./backup.xlsx');
}

let loadWorkbook = async () => {
  const workbook = new Excel.Workbook();
  try {
    await workbook.xlsx.readFile(`${config.filename}`);
    console.log(`Read ${workbook.worksheets.length} sheets`);
  } catch(e) {
    console.log(`Failed to load file ${config.filename}`);
  }
  return workbook;
}

let updateSheet = async () => {
  try{
    const workbook = await loadWorkbook();
    const funds = await fundlist(workbook);
    await getPrices(funds);
    await addPricesToSheet(funds, workbook);
    await workbook.xlsx.writeFile(`${config.outprefix}-${timestamp()}.xlsx`);
  }catch (e) {
    console.log("Something went wrong!",e);
  }
}

module.exports = updateSheet;
