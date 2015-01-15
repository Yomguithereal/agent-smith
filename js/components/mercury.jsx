/**
 * Agent Smith Mercury Component
 * ==============================
 *
 * Component rendering a message error when your query is far to be correct.
 */
var React = require('react'),
    controller = require('../controller.js');

module.exports = React.createClass({
  mixins: [controller.mixin],
  componentWillMount: function() {
    var self = this;

    this.control.on('error', function(e) {
      self.setState({
        display: true,
        title: e.data.title,
        message: e.data.message
      });
    });

    // TODO: optimize
    this.control.on('query', this.hide);
    this.control.on('query:label', this.hide);
    this.control.on('query:predicate', this.hide);
  },
  getInitialState: function() {
    return {
      title: null,
      message: null,
      display: false
    }
  },
  show: function() {
    this.setState({
      display: true
    });
  },
  hide: function() {
    this.setState({
      display: false
    });
  },
  render: function() {
    return (
      <div id="mercury" className={this.state.display ? 'open': ''}>
        <div className="inner">
          <h3>{this.state.title}</h3>
          <div>{this.state.message}</div>
          <div className="action close" onClick={this.hide}>
            <i className="fa fa-times" />
          </div>
        </div>
      </div>
    );
  }
});
