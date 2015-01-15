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
  componentWillMount: function() {
    var self = this;

    this.cursor = controller.select('graph');

    // Binding graph rendering to model update
    this.listener = function() {
      self.renderGraph();
      self.forceUpdate();
    };

    this.cursor.on('update', this.listener);

    // Creating the need sigma graph
    // TODO: move this elsewhere
    // TODO: port edge labels to webgl
    this.sigma = new sigma({
      settings: {
        singleHover: true,
        minNodeSize: 1.5,
        maxNodeSize: 5,
        labelThreshold: 5.2,
        font: 'Source Code Pro'
      }
    });

    // Creating camera
    this.camera = this.sigma.addCamera('main');
  },
  componentDidMount: function() {

    // Creating renderer
    this.renderer = this.sigma.addRenderer({
      camera: 'main',
      container: this.getDOMNode()
    });

    // Binding events
    this.sigma.bind('clickNode', function(e) {
      controller.emit('node:information', e.data.node);
    });

    // Refreshing instance
    this.sigma.refresh();
  },
  renderGraph: function() {
    var graph = this.cursor.get();

    if (!graph)
      return;

    var sig = this.sigma;

    sig.killForceAtlas2();

    sig.graph.clear().read(graph);

    // Applying outdegree for size
    sig.graph.nodes().forEach(function(n) {
      n.size = sig.graph.degree(n.id);
    });

    sig.refresh();

    // Rescaling
    var camera = sig.cameras.main;

    sigma.misc.animation.camera(
      camera,
      {x: 0, y: 0, angle: 0, ratio: 1},
      {duration: 150}
    );

    sig.startForceAtlas2();
  },
  render: function() {
    return (
      <div id="ground">
        <Controls sigma={this.sigma} />
      </div>
    );
  },
  componentWillUnmount: function () {

    // Unbinding listener
    this.cursor.off('update', this.listener);

    // Killing sigma
    this.sigma.kill();
  },
});
