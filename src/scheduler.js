const cron = require('node-cron');
const updateSheet = require('./main');

cron.schedule('5 23 * * 1,2,3,4,5,6', () => {
  updateSheet();
});

//cron.schedule('*/1 * * * 1,2,3,4,5,6', () => {
//    updateSheet();
//});

