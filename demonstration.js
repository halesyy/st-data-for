var iters = 0;
setInterval(function(){
  // console.log(`${iters}`);
  iters += 20;
}, 20);
setInterval(function(){
  console.log(`Has been a second: ${iters}`);
}, 1000);
