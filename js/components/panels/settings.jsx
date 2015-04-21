/**
 * Agent Smith Settings Panel
 * ===========================
 *
 * Panel giving access to basic settings for the application.
 */
var React = require('react'),
    {RouteHandler} = require('react-router'),
    controller = require('../../controller.js');

module.exports = React.createClass({
  mixins: [controller.mixin],
  cursor: ['config'],
  editHost: function(e) {
    this.cursor.set('host', e.target.value);
    this.tree.commit();
  },
  editPort: function(e) {
    this.cursor.set('port', e.target.value);
    this.tree.commit();
  },
  render: function() {
    return (
      <div className="details">
        <h2>Settings</h2>
        <div className="detail">
          <label>Host</label>
          <input onChange={this.editHost} type="text" value={this.cursor.get('host')} />
        </div>
        <div className="detail">
          <label>Port</label>
          <input onChange={this.editPort} type="text" value={this.cursor.get('port')} />
        </div>
      </div>
    );
  }
});
