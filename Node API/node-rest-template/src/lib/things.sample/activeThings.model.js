const { Thing } = require('./things.model');

// This is just an example of how to access a view
// The view itself is redundant since there is already an `active` modifier defined above
class ActiveThing extends Thing {
  static get tableName() {
    return 'vw_active_things';
  }
}

module.exports = { ActiveThing };
