/**
 * Agent Smith Overview Panel
 * ===========================
 *
 * Panel showing basic information about the neo4j database.
 */
var React = require('react'),
    {RouteHandler} = require('react-router'),
    controller = require('../../controller.js');

// Handy cursor
var panelState = controller.select('panels', 'overview');

// Helpers
function labelSelected() {
  var selected = panelState.get('selected');

  if (selected && selected.type === 'label')
    return selected.name;
  else
    return false;
}

/**
 * Label button component
 */
var LabelButton = React.createClass({
  handleClick: function() {
    controller.emit('query:label', this.props.name);
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className={'node-label' + (this.props.selected ? ' active' : '')}>
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
  cursors: {
    data: ['data', 'labels'],
    state: ['panels', 'overview', 'selected']
  },
  render: function() {
    var renderItem = function(label) {
      var selected = labelSelected();

      return <LabelButton key={label.name}
                          selected={selected === label.name}
                          name={label.name}
                          color={label.color} />;
    };

    return (
      <div className="labels">
        {this.cursors.data.get().map(renderItem)}
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
