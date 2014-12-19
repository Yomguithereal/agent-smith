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
      var p = _(this.get('data', 'labels'))
        .indexBy('name')
        .mapValues('color')
        .value();

      var graph = parser(data.results[0], p);

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
  },

  // Retrieving a list of relationships types
  predicates: {
    url: ':endpoint/db/data/relationship/types',
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {

      var sorted = _(data)
        .sortBy((a, b) => a + b)
        .value();

      this.select('data', 'predicates').edit(sorted);
    }
  }
};
