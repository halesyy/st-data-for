
// 1. get data
// 2. iterate, and split
// 3. as iterating, run calcs over it live
//

const fs = require("fs");
const half = fs.readFileSync("./OUTPUT-half.txt").toString();
const orig = fs.readFileSync("./OUTPUT-original.txt").toString();

var halfLines = half.split("\n");
var origLines = orig.split("\n");
var criteria = 0;
var failed = 0;

for (var i = 0; i <= 125000; i++) {
  var line = origLines[i];
  var split = line.split(":");
  if (split.length == 2) {
    var timems = parseInt(split[0]);
    var price  = split[1];
    if (!isNaN(timems)) {
      // timesms is good, check if in zone
      if (timems >= 180000 && timems <= 189693) {
        criteria += 1;
      }
      else {
        failed += 1;
      }
    }
  }
}

console.log(`Criteria: ${criteria}\nFail: ${failed}`);
var criteria = 0;
var failed = 0;

for (var i = 0; i <= 125000; i++) {
  var line = halfLines[i];
  var split = line.split(":");
  if (split.length == 2) {
    var timems = parseInt(split[0]);
    var price  = split[1];
    if (!isNaN(timems)) {
      // timesms is good, check if in zone
      if (timems >= 180000 && timems <= 189693) {
        criteria += 1;
      }
      else {
        failed += 1;
      }
    }
  }
}

console.log(`Criteria: ${criteria}\nFail: ${failed}`);
