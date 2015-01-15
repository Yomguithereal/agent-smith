/**
 * Agent Smith Statistics Panel
 * =============================
 *
 * Panel giving several statistics concerning the current database.
 */
var React = require('react'),
    {RouteHandler} = require('react-router'),
    controller = require('../../controller.js'),
    {nbpp} = require('../../helpers.js'),
    _ = require('lodash');

const KEYS = ['nodes', 'edges'];

var Item = React.createClass({
  render: function() {
    return (
      <div className="detail">
        <h3>{this.props.name}</h3>&nbsp;
        <div className="value">{this.props.value || '...'}</div>
      </div>
    );
  }
});

module.exports = React.createClass({
  mixins: [controller.mixin],
  cursor: ['data', 'allocation'],
  render: function() {
    var renderItem = function(k) {
      var v = controller.get('data', 'allocation', k);
      return <Item key={k} name={k} value={nbpp(v)} />;
    };

    return (
      <div>
        <h2>Statistics</h2>
        <div className="details">
          {KEYS.map(renderItem)}
        </div>
      </div>
    );
  },
  statics: {
    willTransitionTo: function() {
      controller.request('allocation');
    }
  }
});
