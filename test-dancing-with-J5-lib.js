const _ = require('lodash');
const five = require('johnny-five');
const Bot = require('./classes/Bot');
const { generateLinkedAnimationJSObj, sortServosByPin } = require('./utilities');
const board = new five.Board();
const legServoPins = [12,       9, 8,     5];
const bodyServoPins = [  11, 10,     7, 6];
const beatsPerMinute = 126;
const DANCE_TIMING = (1000 / (beatsPerMinute / 60)) / 2;
console.log('DANCE_TIMING', DANCE_TIMING);

board.on('ready', function () {
  const allServos = new five.Servos(sortServosByPin([
    ...legServoPins.map(pin => ({pin, range: [45, 135], startAt: 90, type: 'leg'})),
    ...bodyServoPins.map(pin => ({pin, range: [45, 135], startAt: 90, type: 'body'}))
  ]));
  const bot = new Bot({
    allServos,
    animationRunner: new five.Animation(allServos),
    danceTiming: DANCE_TIMING
  });
  bot.danceMoves = [
    bot.turnRight,
    bot.straightenUp,
    bot.turnLeft,
    bot.straightenUp,

    () => {},
    () => {},
    () => {},
    () => {},

    bot.expandFrontLegs,
    bot.straightenUp,
    bot.expandFrontLegs,
    bot.straightenUp,

    () => {},
    () => {},
    () => {},
    () => {},


    bot.backLegsBehindBody,
    bot.straightenUp,
    bot.backLegsBehindBody,
    bot.straightenUp,

    () => {},
    () => {},
    () => {},
    () => {},

    bot.backLegsBehindBody,
    bot.straightenUp,
    bot.frontLegsInFrontOfBody,
    bot.straightenUp,

    bot.frontLegsInFrontOfBody,
    () => bot.expandFrontLegs(150),
    () => {
      bot.backLegsBehindBody();
      bot.expandFrontLegs();
    },
    bot.straightenUp,

    bot.expandFrontLegs,
    () => {},
    bot.expandBackLegs,
    bot.straightenUp,

    () => {},
    () => {},
    () => {},
    () => {},

    bot.frontLegsInFrontOfBody,
    bot.straightenUp,
    () => {
      bot.frontLegsInFrontOfBody(),
      bot.expandFrontLegs();
    },
    bot.straightenUp,

    () => {},
    () => {},
    () => {},
    () => {},

    () => bot.turnLeft(bot.danceTiming * 2),
    () => {},
    () => bot.turnRight(bot.danceTiming * 2),
    () => {},

    () => {},
    () => {},
    bot.straightenUp,
    () => {},
  ];
  this.repl.inject({
    bot,
    _
  });
  console.log('Try bot.test(), bot.dance(), bot.continuousDance().  Do not try bot.stop() as it has not been successfully implemented yet!');
});
