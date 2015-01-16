/**
 * Agent Smith Graph Component
 * ============================
 *
 * Component rendering the sigma.js graph and refreshing it when needed.
 */
var React = require('react'),
    sigInst = require('../graph.js'),
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

    sigma.misc.animation.camera(
      this.props.camera,
      {ratio: camera.ratio / 1.5},
      {duration: 150}
    );
  },
  unzoom: function() {

    sigma.misc.animation.camera(
      this.props.camera,
      {ratio: camera.ratio * 1.5},
      {duration: 150}
    );
  },
  rescale: function() {

    sigma.misc.animation.camera(
      this.props.camera,
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
  displayName: 'Graph',
  componentDidMount: function() {

    // Creating renderer
    this.renderer = sigInst.addRenderer({
      camera: 'main',
      container: this.getDOMNode()
    });

    // Binding events
    sigInst.bind('clickNode', function(e) {
      controller.emit('node:information', e.data.node);
    });

    // Refreshing instance
    sigInst.refresh();
  },
  render: function() {

    return (
      <div id="ground">
        <Controls sigma={sigInst} camera={sigInst.cameras.main} />
      </div>
    );
  },
  componentWillUnmount: function() {
    sigInst.killRenderer(this.renderer);
  }
});
