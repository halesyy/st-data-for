const fs = require("fs");


// our test data
const records = require("./record.json");
const lines = records["games"]["1.161601139"].history;
const frequency = 500; // time it takes to make a new request?
const frequencyHalf = 1000;

// const recordsOriginal = require("./originalData.json");
const halfLines = require('./halfData.json');
const originalLines = require('./originalData.json');

function variance(lines) {

  // preset variables for manip in the loop
  // & post-meta analysis + heuristical abstraction
  var largestDiff = 0, smallestDiff = 5000;
  var diffSum = 0, diffTotal = 0;
  var overSet = 0, underSet = 0, perfectSet = 0;
  var saveFile = "originalData.json", saveSet = [];

  // iterate over lines
  for (var i = 1; i < lines.length; i = i + 1) {
      // if (i % 2 == 0) continue;

      var currLine = lines[i]
      var lastLine = lines[i-1];
      // current ms time from start, vs last line fs
      var currTime = currLine[currLine.length-1];
      var lastTime = lastLine[lastLine.length-1];
      // the total time difference since the last line
      var timeDifference = currTime - lastTime, td = currTime - lastTime;

      var winnerPrice = currLine[records["games"]["1.161601139"].winner];
      if (!isNaN(winnerPrice)) {
        saveSet.push([currTime, winnerPrice]); // save!
      }


      // generating max and min of the td data
      if (timeDifference > largestDiff) largestDiff = timeDifference;
      if (timeDifference < smallestDiff) smallestDiff = timeDifference;
      // difference average data capture
      diffSum += timeDifference;
      diffTotal += 1;
      // checking if over the set (time)
      if (td > frequency) overSet += 1;
      if (td < frequency) underSet += 1;
      if (td === frequency) perfectSet += 1;
  }

  // after, meta-analysis
  var varianceDiff = largestDiff - smallestDiff;
  var timeDiffAverage = (diffSum) / (diffTotal);

  fs.writeFileSync(saveFile, JSON.stringify(saveSet, null, "\t"));

  console.log(`Report:\n--------\nLargest diff: ${largestDiff}\nSmallest diff: ${smallestDiff}\nTotal variance: ${varianceDiff}\nDiff average: ${timeDiffAverage}`);
  console.log(`Perfect timing: ${perfectSet}`);
  console.log(`Over timing: ${overSet}`);
  console.log(`Under timing: ${underSet}`);
  console.log(`\nTOTAL REQUESTS: ${overSet+underSet+perfectSet}`);
}
function uniqueVariance(lines, frequencyOfRequests=500) {

  // preset variables for manip in the loop
  // & post-meta analysis + heuristical abstraction
  var largestDiff = 0, smallestDiff = 5000;
  var diffSum = 0, diffTotal = 0;
  var overSet = 0, underSet = 0, perfectSet = 0;
  // var saveFile = "halfData.json", saveSet = [];

  // iterate over lines
  for (var i = 1; i < lines.length; i++) {
      // if (i % 2 == 0) continue;

      var currTime = lines[i][0]
      var lastTime = lines[i-1][0];
      // console.log(currTime);
      // the total time difference since the last line
      var timeDifference = currTime - lastTime, td = currTime - lastTime;
      // saveSet.push(currTime); // save!


      // generating max and min of the td data
      if (timeDifference > largestDiff) largestDiff = timeDifference;
      if (timeDifference < smallestDiff) smallestDiff = timeDifference;
      // difference average data capture
      diffSum += timeDifference;
      diffTotal += 1;
      // checking if over the set (time)
      if (td > frequencyOfRequests) overSet += 1;
      if (td < frequencyOfRequests) underSet += 1;
      if (td === frequencyOfRequests) perfectSet += 1;
  }

  // after, meta-analysis
  var varianceDiff = largestDiff - smallestDiff;
  var timeDiffAverage = (diffSum) / (diffTotal);

  // fs.writeFileSync(saveFile, JSON.stringify(saveSet, null, "\t"));

  console.log(`Report:\n--------\nLargest diff: ${largestDiff}\nSmallest diff: ${smallestDiff}\nTotal variance: ${varianceDiff}\nDiff average: ${timeDiffAverage}`);
  console.log(`Perfect timing: ${perfectSet}`);
  console.log(`Over timing: ${overSet}`);
  console.log(`Under timing: ${underSet}`);
  console.log(`\nTOTAL REQUESTS: ${overSet+underSet+perfectSet}`);
}

// variance(lines);
uniqueVariance(originalLines, frequencyOfRequests=500);
uniqueVariance(halfLines, frequencyOfRequests=1000);
