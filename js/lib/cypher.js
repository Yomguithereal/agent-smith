/**
 * Agent Smith Cypher Results Parser
 * ==================================
 *
 * Reads the Neo4j REST results to output correct data.
 */
var _ = require('lodash'),
    heuristics = require('../heuristics.js');

function createNode(n) {
  return {
    id: n.id,
    x: Math.random(),
    y: Math.random(),
    size: 1,
    label: heuristics.label(n),
    color: '#ccc',
    properties: n.properties,
    labels: n.labels
  };
}

module.exports = function(results, palette) {
  var idx = {
    nodes: new Set(),
    edges: new Set()
  };

  var graph = {
    nodes: [],
    edges: []
  };

  _(results.data)
    .forEach(function(line) {
      line.graph.nodes.forEach(function(node) {
        if (!idx.nodes.has(node.id)) {

          // Creating node
          graph.nodes.push(createNode(node));
          idx.nodes.add(node.id);
        }
      });
    });

  return graph
};
