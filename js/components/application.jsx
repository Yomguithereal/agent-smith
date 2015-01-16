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
    Data       = require('./data.jsx'),
    Query      = require('./query.jsx'),
    Mercury    = require('./mercury.jsx'),
    Statistics = require('./statistics.jsx'),
    controller = require('../controller.js');

/**
 * Playground
 */
var Playground = React.createClass({
  mixins: [controller.mixin],
  cursor: ['mode'],
  render: function() {
    var mode = this.cursor.get();

    return (
      <div id="playground">
        <div className="inner">
          {mode === 'graph' ? <Graph /> : <Data />}
          <Mercury />
          <Statistics />
        </div>
      </div>
    );
  }
});

/**
 * Main application component
 */
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

      <Playground />

      </div>
    );
  }
});
