/**
 * Agent Smith Overview Panel
 * ===========================
 *
 * Panel showing basic information about the neo4j database.
 */
var React = require('react'),
    {RouteHandler} = require('react-router'),
    controller = require('../../controller.js');

/**
 * Label button component
 */
var LabelButton = React.createClass({
  render: function() {
    return (
      <div className="node-label">
        {this.props.name + ' '}
        <i className="fa fa-circle"></i>
      </div>
    );
  }
});

/**
 * Labels List
 */
var LabelList = React.createClass({
  mixins: [controller.mixin],
  cursor: ['data', 'labels'],
  render: function() {
    var renderItem = function(label) {
      return <LabelButton key={label} name={label} />;
    };

    return (
      <div className="labels">
        {this.cursor.get().map(renderItem)}
      </div>
    );
  }
});

/**
 * Top-level component
 */
module.exports = React.createClass({
  render: function() {
    return (
      <div className="node-labels">
        <h2>Labels</h2>
        <LabelList />
      </div>
    );
  }
});
