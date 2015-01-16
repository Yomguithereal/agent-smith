/**
 * Agent Smith Statistics Component
 * =================================
 *
 * Component rendering the statistics directly aside the graph
 */
var React = require('react'),
    controller = require('../controller.js');

/**
 * Mode Item
 */
var ModeItem = React.createClass({
  render: function() {
    return (
      <div className={'action' + (this.props.selected ? ' selected' : '')}>
        {this.props.mode}
      </div>);
  }
});

/**
 * Main component
 */
module.exports = React.createClass({
  mixins: [controller.mixin],
  cursors: {
    graph: ['graph'],
    mode: ['mode']
  },
  render: function() {
    var graph = this.cursors.graph.get(),
        mode = this.cursors.mode.get();

    // TODO: decide whether to display local graph stats when in data mode
    var graphStats = graph ?
      (
        <div className="inner">
          <span className="number">{graph.nodes.length}</span> nodes, <span  className="number">{graph.edges.length}</span> edges
        </div>
      ) :
      null;

    return (
      <div id="statistics">
        {graphStats}
        <ModeItem mode="graph" selected={mode === 'graph'} />
        <ModeItem mode="data" selected={mode !== 'graph'} />
      </div>
    );
  }
});
