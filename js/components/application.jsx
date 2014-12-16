/**
 * Agent Smith Application Component
 * ==================================
 *
 * Top-level component managing the application view.
 */
var React = require('react'),
    {RouteHandler} = require('react-router');

module.exports = React.createClass({
  render: function() {
    return <RouteHandler />;
  }
});
