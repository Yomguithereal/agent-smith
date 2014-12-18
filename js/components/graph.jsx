/**
 * Agent Smith Graph Component
 * ============================
 *
 * Component rendering the sigma.js graph and refreshing it when needed.
 */
var React = require('react'),
    sigma = require('../lib/sigma.js'),
    controller = require('../controller.js');

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
  mixins: [controller.mixin],
  cursor: ['graph'],
  componentWillMount: function() {

    // Creating the need sigma graph
    this.sigma = new sigma();
    this.camera = this.sigma.addCamera('main');
  },
  componentDidMount: function() {
    this.renderer = this.sigma.addRenderer({
      camera: 'main',
      container: this.getDOMNode()
    });
    this.sigma.refresh();
  },
  renderGraph: function() {
    var graph = this.cursor.get();

    if (!graph)
      return;

    this.sigma.graph.clear().read(graph);

    this.sigma.refresh();
  },
  render: function() {
    this.renderGraph();

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
