/**
 * Agent Smith Application Component
 * ==================================
 *
 * Top-level component managing the application view.
 */
var React = require('react'),
    {RouteHandler} = require('react-router'),
    Graph = require('./graph.jsx'),
    Query = require('./query.jsx');

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

        <nav>
          <div className="inner">
            <a href="/" ><div>~</div></a>
            <a href="/settings" className="active"><div>s</div></a>
            <a href="/design"><div>d</div></a>
            <a href="/agent-smith"><div>w</div></a>
          </div>
        </nav>

        <aside>
          <div className="inner">
            <RouteHandler />
          </div>
        </aside>

        <div id="playground">
          <div className="inner">
            <Graph />
          </div>
        </div>

      </div>
    );
  }
});
