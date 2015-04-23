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
  editSetting: function(key, e) {
    this.cursor.set(key, e.target.value);
    this.tree.commit();
  },
  render: function() {
    return (
      <div className="details">
        <h2>Settings</h2>
        <div className="detail">
          <label>Host</label>
          <input onChange={this.editSetting.bind(this, 'host')} type="text" value={this.cursor.get('host')} />
        </div>
        <div className="detail">
          <label>Port</label>
          <input onChange={this.editSetting.bind(this, 'port')} type="text" value={this.cursor.get('port')} />
        </div>
        <div className="detail">
          <label>User</label>
          <input onChange={this.editSetting.bind(this, 'user')} type="text" value={this.cursor.get('user')} />
        </div>
        <div className="detail">
          <label>Password</label>
          <input onChange={this.editSetting.bind(this, 'pass')} type="password" value={this.cursor.get('pass')} />
        </div>
      </div>
    );
  }
});
