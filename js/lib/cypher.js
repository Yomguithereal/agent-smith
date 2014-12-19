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
    color: '#000',
    properties: n.properties,
    labels: n.labels
  };
}

function createEdge(e) {
  return {
    id: e.id,
    source: e.startNode,
    target: e.endNode,
    properties: e.properties,
    color: '#ccc'
  };
}

module.exports = function(results) {
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

      line.graph.relationships.forEach(function(edge) {
        if (!idx.edges.has(edge.id)) {

          // Creating edge
          graph.edges.push(createEdge(edge));
          idx.edges.add(edge.id);
        }
      });
    });

  return graph
};
