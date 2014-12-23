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

  // Getting an estimation about the number of elements in the database
  allocation: {
    url: ':endpoint/db/manage/server/jmx/domain/org.neo4j/instance%3Dkernel%230%2Cname%3DPrimitive%20count',
    success: function(data) {
      var idx = _.indexBy(data[0].attributes, 'name');

      this.select('data', 'allocation').edit({
        nodes: idx.NumberOfNodeIdsInUse.value,
        edges: idx.NumberOfRelationshipIdsInUse.value,
        properties: idx.NumberOfPropertyIdsInUse.value,
        predicates: idx.NumberOfRelationshipTypeIdsInUse.value
      });
    }
  },

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
  },

  // Retrieving a list of properties
  properties: {
    url: ':endpoint/db/data/propertykeys',
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {
      var sorted = _.sortBy(data, (a, b) => a + b);

      this.select('data', 'properties').edit(sorted);
    }
  }
};
