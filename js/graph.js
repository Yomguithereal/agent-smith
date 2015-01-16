/**
 * Agent Smith Graph
 * ==================
 *
 * Module storing the app's main sigma instance.
 */
var defaults = require('./defaults.js'),
    controller = require('./controller.js');

var cursor = controller.select('graph');

// Creating sigma instance
var instance = new sigma({
  settings: defaults.sigma
});

// Creating camera
var camera = instance.addCamera('main');

// Helper functions
function rescale() {
  sigma.misc.animation.camera(
    instance.cameras.main,
    {x: 0, y: 0, angle: 0, ratio: 1},
    {duration: 150}
  );
}

function update() {
  var graph = cursor.get();

  // Killing ForceAtlas2
  instance.killForceAtlas2();

  // Reading new graph
  instance.graph.clear().read(graph);

  // Degree for size
  instance.graph.nodes().forEach(function(n) {
    n.size = instance.graph.degree(n.id);
  });

  rescale();
  instance.startForceAtlas2(defaults.forceAtlas2);
}

// Listening to graph updates
cursor.on('update', update);

// Binding events
instance.bind('clickNode', function(e) {
  controller.emit('node:information', e.data.node);
});

module.exports = instance;
