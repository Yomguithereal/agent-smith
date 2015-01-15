/**
 * Agent Smith Mercury Component
 * ==============================
 *
 * Component rendering a message error when your query is far to be correct.
 */
var React = require('react'),
    controller = require('../controller.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      display: false
    }
  },
  close: function() {
    this.setState({
      display: false
    });
  },
  render: function() {
    return (
      <div id="mercury" className={this.state.display ? 'open': ''}>
        <div className="inner">
          <h3>Hello react</h3>
          <div>Your awesome error message</div>
          <div className="action close" onClick={this.close}><i className="fa fa-times"></i></div>
        </div>
      </div>
    );
  }
});
