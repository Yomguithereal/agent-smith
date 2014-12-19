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
  handleClick: function() {
    controller.emit('query:label', this.props.name);
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className="node-label">
        {this.props.name + ' '}
        <i className="fa fa-circle" style={{color: this.props.color}}></i>
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
      return <LabelButton key={label.name} name={label.name} color={label.color} />;
    };

    return (
      <div className="labels">
        {this.cursor.get().map(renderItem)}
      </div>
    );
  }
});

/**
 * Predicate button component
 */
var PredicateButton = React.createClass({
  handleClick: function() {
    controller.emit('query:predicate', this.props.name);
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className="node-label">
        {this.props.name}
      </div>
    );
  }
});

/**
 * Predicates List
 */
var PredicateList = React.createClass({
  mixins: [controller.mixin],
  cursor: ['data', 'predicates'],
  render: function() {
    var renderItem = function(name) {
      return <PredicateButton key={name} name={name} />;
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
        <h2>Predicates</h2>
        <PredicateList />
      </div>
    );
  }
});
