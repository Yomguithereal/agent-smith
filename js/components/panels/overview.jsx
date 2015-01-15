/**
 * Agent Smith Overview Panel
 * ===========================
 *
 * Panel showing basic information about the neo4j database.
 */
var React = require('react'),
    {RouteHandler} = require('react-router'),
    controller = require('../../controller.js'),
    _ = require('lodash');

// Handy cursor
var panelState = controller.select('panels', 'overview');

// Helpers
function labelSelected(label) {
  var selected = panelState.get('selected');

  if (selected && selected.type === 'label')
    return label === selected.name;
  else
    return false;
}

function predicateSelected(label) {
  var selected = panelState.get('selected');

  if (selected && selected.type === 'predicate')
    return label === selected.name;
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
      var selected = labelSelected(label.name);

      return <LabelButton key={label.name}
                          selected={selected}
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
      <div onClick={this.handleClick} className={'node-label' + (this.props.selected ? ' active' : '')}>
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
  cursors: {
    data: ['data', 'predicates'],
    state: ['panels', 'overview', 'selected']
  },
  render: function() {
    var renderItem = function(name) {
      var selected = predicateSelected(name);

      return <PredicateButton selected={selected} key={name} name={name} />;
    };

    return (
      <div className="labels">
        {this.cursors.data.get().map(renderItem)}
      </div>
    );
  }
});

/**
 * Temporary node information display
 */
var NodeInformation = React.createClass({
  mixins: [controller.mixin],
  renderOn: 'node:information',
  render: function() {
    if (!this.state.event)
      return null;

    var node = this.state.event.data;

    var detail = function(p) {
      return (
        <div key={p.key} className="detail">
          <h3>{p.key}</h3>&nbsp;
          <div className="value">{p.value}</div>
        </div>
      );
    };

    var props = [
      {key: 'id', value: node.id},
      {key: 'labels', value: node.labels.join(', ')}
    ].concat(_.keys(node.properties).map(k => {return {key: k, value: '' + node.properties[k]}}));

    return (
      <div className="details">
        {props.map(detail)}
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
        <h2>Node Information</h2>
        <NodeInformation />
      </div>
    );
  },
  statics: {
    willTransitionTo: function() {
      controller.request('labels');
      controller.request('predicates');
    }
  }
});
