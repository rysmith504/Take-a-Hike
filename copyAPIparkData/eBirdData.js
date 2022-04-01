const parse = require('csv-parse');
const fs = require('fs');

const csvData = [];

fs.createReadStream(__dirname + '/test.csv')
  .pipe(
    parse({
      delimiter: ','
    })
  )
  .on('data', function (dataRow) {
    csvData.push(dataRow);
  })
  .on('end')