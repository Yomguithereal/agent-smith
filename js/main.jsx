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

// Fetching labels
controller.request('labels');

module.exports = controller;
