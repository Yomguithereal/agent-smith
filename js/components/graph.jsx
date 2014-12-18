/**
 * Agent Smith Graph Component
 * ============================
 *
 * Component rendering the sigma.js graph and refreshing it when needed.
 */
var React = require('react'),
    sigma = require('../lib/sigma.js');

/**
 * Controls
 */
var Controls = React.createClass({
  getInitialState: function() {
    return {inLayout: false};
  },
  zoom: function() {
    var camera = this.props.sigma.cameras.main;

    sigma.misc.animation.camera(
      camera,
      {ratio: camera.ratio / 1.5},
      {duration: 150}
    );
  },
  unzoom: function() {
    var camera = this.props.sigma.cameras.main;

    sigma.misc.animation.camera(
      camera,
      {ratio: camera.ratio * 1.5},
      {duration: 150}
    );
  },
  rescale: function() {
    var camera = this.props.sigma.cameras.main;

    sigma.misc.animation.camera(
      camera,
      {x: 0, y: 0, angle: 0, ratio: 1},
      {duration: 150}
    );
  },
  render: function() {
    return (
      <div id="tools">
        <div className="tool">
          <a onClick={this.layout} className={'fa ' + (this.state.inLayout ? 'playing' : 'pausing')}></a>
        </div>
        <div className="tool">
          <a onClick={this.zoom} className="fa fa-plus"></a>
        </div>
        <div className="tool">
          <a onClick={this.unzoom} className="fa fa-minus"></a>
        </div>
        <div className="tool">
          <a onClick={this.rescale} className="fa fa-dot-circle-o"></a>
        </div>
      </div>
    );
  }
});

/**
 * Sigma graph
 */
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
          x: 2,
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
    return (
      <div id="ground">
        <Controls sigma={this.sigma} />
      </div>
    );
  },
  componentWillUnmount: function () {

    // Killing sigma
    this.sigma.kill();
  },
});
