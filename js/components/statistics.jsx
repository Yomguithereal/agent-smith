/**
 * Agent Smith Mercury Component
 * ==============================
 *
 * Component rendering the statistics directly aside the graph
 */
var React = require('react'),
    controller = require('../controller.js');

module.exports = React.createClass({
  mixins: [controller.mixin],
  cursor: ['graph'],
  render: function() {

    var graph = this.cursor.get();

    if (!graph)
      return null;

    return (
      <div id="statistics">
        <div className="inner">
          <span className="number">{graph.nodes.length}</span> nodes, <span  className="number">{graph.edges.length}</span> edges
        </div>
      </div>
    );
  }
});
