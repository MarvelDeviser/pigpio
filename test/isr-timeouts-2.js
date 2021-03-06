'use strict';

const Gpio = require('../').Gpio;
const input = new Gpio(7, {mode: Gpio.INPUT, edge: Gpio.EITHER_EDGE, timeout: 100});

let timeoutCount = 0;

input.on('interrupt', (level) => {
  if (level === Gpio.TIMEOUT) {
    timeoutCount++;
  }
});

setTimeout(() => {
  console.log('  ' + timeoutCount + ' timeouts detected (~10 expected)');

  input.enableInterrupt(Gpio.EITHER_EDGE, 1);
  timeoutCount = 0;

  setTimeout(() => {
    input.disableInterrupt();
    console.log('  ' + timeoutCount + ' timeouts detected (~1000 expected)');
  }, 1000);
}, 1000);

