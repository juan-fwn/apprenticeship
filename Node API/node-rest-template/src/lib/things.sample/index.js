const { Thing } = require('./things.model');
const { ActiveThing } = require('./activeThings.model');
const ThingSerializer = require('./things.serializer');
const thingsService = require('./things.service');

module.exports = {
  Thing,
  ActiveThing,
  ThingSerializer,
  ...thingsService,
};
