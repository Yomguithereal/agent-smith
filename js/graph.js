/**
 * Agent Smith Graph
 * ==================
 *
 * Module storing the app's main sigma instance.
 */
var defaults = require('./defaults.js'),
    controller = require('./controller.js');

var cursor = controller.select('graph'),
    designCursor = controller.select('design');
// timeout index for update when design properties change
var _timeout;

// Creating sigma instance
var instance = new sigma({
  settings: designCursor.get()
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
  var graph = cursor.get(),
      design = designCursor.get();

  // Killing ForceAtlas2
  instance.killForceAtlas2();
  
  // add settings from the design component
  instance.settings('labelThreshold', design.labelThreshold);
  instance.settings('minNodeSize', design.minNodeSize);
  instance.settings('maxNodeSize', design.maxNodeSize);  
  instance.refresh();
  
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

// Listening to design updates
designCursor.on('update', function() {
  clearTimeout(_timeout);
  _timeout = setTimeout(update, 500);
});

// Binding events
instance.bind('clickNode', function(e) {
  controller.emit('node:information', e.data.node);
});

module.exports = instance;
