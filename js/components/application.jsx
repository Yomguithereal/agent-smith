/**
 * Agent Smith Application Component
 * ==================================
 *
 * Top-level component managing the application view.
 */
var React = require('react'),
    {RouteHandler} = require('react-router');

module.exports = React.createClass({
  render: function() {
    return (
      <div id="layout">

        // Header
        <header>
          <div className="inner">
            <div id="logo">Agent Smith</div>
            <div id="query">
              <textarea rows="1" placeholder="neo4j query ..." ng-model="query"></textarea>
            </div>
          </div>
        </header>

        // Menu
        <nav>
          <div className="inner">
            <a href="/" ><div>~</div></a>
            <a href="/settings" className="active"><div>s</div></a>
            <a href="/design"><div>d</div></a>
            <a href="/agent-smith"><div>w</div></a>
          </div>
        </nav>

        // Sidebar
        <aside>
          <div className="inner">
            <RouteHandler />
          </div>
        </aside>

        // Sigma playground
        <div id="playground">
          <div className="inner">
            <div sigma id="ground" data="network"></div>
          </div>
        </div>

      </div>
    );
  }
});
