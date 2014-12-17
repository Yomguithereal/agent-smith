/**
 * Agent Smith Graph Component
 * ==================================
 *
 * Component rendering the sigma.js graph and refreshing it when needed.
 */
var React = require('react'),
    sigma = require('../lib/sigma.js');

module.exports = React.createClass({
  componentWillMount: function() {

    // Creating the need sigma graph
    this.sigma = new sigma();
    this.camera = this.sigma.addCamera('main');

    this.sigma.graph.read({
      nodes: [
        {
          id: 1,
          label: 'Hey',
          size: 1,
          x: 1,
          y: 1
        },
        {
          id: 2,
          label: 'Ho',
          size: 2,
          x: 1,
          y: 1
        }
      ],
      edges: [
        {
          id: 1,
          source: 1,
          target: 1
        }
      ]
    });
  },
  componentDidMount: function() {
    this.renderer = this.sigma.addRenderer({
      camera: 'main',
      container: this.getDOMNode()
    });
    this.sigma.refresh();
  },
  render: function() {
    return <div />;
  },
  componentWillUnmount: function () {

    // Killing sigma
    this.sigma.kill();
  },
});
