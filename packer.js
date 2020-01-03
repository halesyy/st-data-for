/*
 * Jack Hales
 * Links between the Node code, and Python code.
 * Data targets: [originalData.json, halfData.json]
 */

const fs = require("fs");


function pack(filename, fileout, divby=1) {
  var filedata = require(`./${filename}`);
  var dataToSave = "";
  for (var i = 0; i < filedata.length/divby; i++) {
    var line = filedata[i];
    // console.log(line);
    dataToSave = `${dataToSave}\n${line[0]}:${line[1]}`;
  }
  fs.writeFileSync(fileout, dataToSave);
}

pack("originalData.json", "originalData.txt", divby=1);
pack("originalData.json", "originalData_HALFSAMPLE.txt", divby=2);
pack("halfData.json", "halfData.txt", divby=1);
pack("halfData.json", "halfData_HALFSAMPLE.txt", divby=2);
