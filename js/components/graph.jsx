/**
 * Agent Smith Graph Component
 * ============================
 *
 * Component rendering the sigma.js graph and refreshing it when needed.
 */
var React = require('react'),
    controller = require('../controller.js');

/**
 * Controls
 */
var Controls = React.createClass({
  layout: function() {
    var sig = this.props.sigma;

    if (sig.isForceAtlas2Running())
      sig.stopForceAtlas2();
    else
      sig.startForceAtlas2();

    this.forceUpdate();
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
    var sig = this.props.sigma;

    return (
      <div id="tools">
        <div className="tool">
          <a onClick={this.layout} className={'fa ' + (sig.isForceAtlas2Running() ? 'playing' : 'pausing')}></a>
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
    this.sigma = new sigma({
      settings: {
        singleHover: true
      }
    });
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

    this.sigma.killForceAtlas2();

    this.sigma.graph.clear().read(graph);

    this.sigma.refresh();

    this.sigma.startForceAtlas2();
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
