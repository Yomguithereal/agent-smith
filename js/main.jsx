/**
 * Agent Smith Main Script
 * ========================
 *
 * Launching the application.
 */
var React = require('react'),
    Router = require('react-router'),
    async = require('async'),
    routes = require('./routes.jsx'),
    controller = require('./controller.js');

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});

// Running query if there is already a query in state
var selected = controller.get('panels', 'overview', 'selected');

// Always fetch labels and predicates before doing anything else
async.parallel([
  function fetchLabels(next) {
    controller.request('labels', d => next());
  },
  function fetchPredicates(next) {
    controller.request('predicates', d => next());
  }
], function(err) {

  // Committing data changes before continuing
  // TODO: commit to domino controller
  controller.state.commit();

  // Restoring last query
  if (selected)
    controller.emit('query:' + selected.type, selected.name);
  else
    if (controller.get('query'))
      controller.emit('query', controller.get('query'));
});

module.exports = controller;
