/**
 * Agent Smith Routes
 * ===================
 *
 * Route definitions for the application.
 */
var React = require('react'),
    {Route, DefaultRoute} = require('react-router'),
    Application = require('./components/application.jsx'),
    Overview = require('./components/panels/overview.jsx'),
    Design = require('./components/panels/design.jsx'),
    Settings = require('./components/panels/settings.jsx');

module.exports = (
  <Route handler={Application} path="/">
  	<DefaultRoute handler={Overview} />
    <Route name="design" handler={Design} />
    <Route name="settings" handler={Settings} />
  </Route>
);
