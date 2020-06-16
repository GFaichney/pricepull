const Excel = require('exceljs');
const config = require('./config');
const fundlist = require('./fundlist');
const getPrices = require('./getPrices');
const addPricesToSheet = require('./addPricesToSheet');

let copy = async () => {
  var workbook = new Excel.Workbook();
  await workbook.xlsx.readFile('./data/shares.xlsx');
  await workbook.xlsx.writeFile('./backup.xlsx');
}

let loadWorkbook = async () => {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile('./data/shares.xlsx');
  return workbook;
}

let updateSheet = async () => {
  const workbook = await loadWorkbook();
  const funds = await fundlist(workbook);
  await getPrices(funds);
  await addPricesToSheet(funds, workbook);
  await workbook.xlsx.writeFile('./newFile.xlsx');
}

updateSheet();

