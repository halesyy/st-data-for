const betfair = require("betfair-backwards-api").login({});

betfair.horses.liveGame((raceId, horses) => {
  if (betfair.bets.length == 0 && horses[0].backPrice == 1.02) {
    betfair.back(horses[0], money=10);
  }
});
