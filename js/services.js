/**
 * Agent Smith Services
 * =====================
 *
 * Various services querying the neo4j database.
 */
var _ = require('lodash');

module.exports = {

  // Querying the database through cypher
  cypher: {
    url: ':endpoint/db/data/transaction/commit',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    error: function() {
      console.log('XHR error', arguments);
    },
    success: function(data) {
      console.log(data);
    }
  },

  // Retrieving a list of labels
  labels: {
    url: ':endpoint/db/data/labels',
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {
      var sorted = _.sortBy(data, (a, b) => a + b);

      this.select('data', 'labels').edit(sorted);
    }
  }
};
