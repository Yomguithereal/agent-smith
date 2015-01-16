/**
 * Agent Smith Data Component
 * ===========================
 *
 * Component displaying data returned by a cypher query.
 */
var React = require('react'),
    controller = require('../controller.js');

module.exports = React.createClass({
  displayName: 'Data',
  render: function() {
    return <div>Data table</div>;
  }
});
