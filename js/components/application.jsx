/**
 * Agent Smith Application Component
 * ==================================
 *
 * Top-level component managing the application view.
 */
var React = require('react'),
    {RouteHandler} = require('react-router'),
    Navigation = require('./navigation.jsx'),
    Graph      = require('./graph.jsx'),
    Query      = require('./query.jsx'),
    Mercury    = require('./mercury.jsx'),
    Statistics = require('./statistics.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div id="layout">

        <header>
          <div className="inner">
            <div id="logo">Agent Smith</div>
            <div id="query">
              <Query />
            </div>
          </div>
        </header>

        <Navigation />

        <aside>
          <div className="inner">
            <RouteHandler />
          </div>
        </aside>

        <div id="playground">
          <div className="inner">
            <Graph />
            <Mercury />
            <Statistics />
          </div>
        </div>

      </div>
    );
  }
});
