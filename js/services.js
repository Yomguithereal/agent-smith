/**
 * Agent Smith Services
 * =====================
 *
 * Various services querying the neo4j database.
 */
var _ = require('lodash'),
    parser = require('./lib/cypher.js'),
    palette = require('./palette.js');

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
      var graph = parser(data.results[0], palette);

      this.select('graph').edit(graph);
    }
  },

  // Retrieving a list of labels
  labels: {
    url: ':endpoint/db/data/labels',
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {

      var sorted = _(data)
        .sortBy((a, b) => a + b)
        .map(function(name, i) {
          return {
            name: name,
            color: palette[i]
          };
        })
        .value();

      this.select('data', 'labels').edit(sorted);
    }
  }
};
