/**
 * Agent Smith Routes
 * ===================
 *
 * Route definitions for the application.
 */
var React = require('react'),
    {Route, DefaultRoute, NotFoundRoute} = require('react-router'),
    Application = require('./components/application.jsx'),
    Overview = require('./components/panels/overview.jsx'),
    Design = require('./components/panels/design.jsx'),
    Info = require('./components/panels/info.jsx'),
    Stats = require('./components/panels/stats.jsx'),
    Settings = require('./components/panels/settings.jsx');

module.exports = (
  <Route handler={Application} path="/">
  	<DefaultRoute handler={Overview} />
    <NotFoundRoute handler={Overview} />
    <Route name="info" handler={Info} />
    <Route name="design" handler={Design} />
    <Route name="stats" handler={Stats} />
    <Route name="settings" handler={Settings} />
  </Route>
);
