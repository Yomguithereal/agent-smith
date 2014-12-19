/**
 * Agent Smith Main Script
 * ========================
 *
 * Launching the application.
 */
var React = require('react'),
    Router = require('react-router'),
    routes = require('./routes.jsx'),
    controller = require('./controller.js');

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});

// Fetching data
controller.request('labels');
controller.request('predicates');
// controller.request('properties');

// Running query if there is already a query in state
if (controller.get('query'))
  controller.emit('query', controller.get('query'));

module.exports = controller;
