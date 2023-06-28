/* eslint-disable no-console */

const runWrappedCommand = require('./runWrappedCommand');

runWrappedCommand(() => {
  console.log('<recreating views only>');
});
