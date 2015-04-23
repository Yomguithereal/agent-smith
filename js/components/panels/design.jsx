/**
 * Agent Smith Design Panel
 * =========================
 *
 * Panel giving enabling the user to set some design options.
 */
var React = require('react'),
    {RouteHandler} = require('react-router'),
    controller = require('../../controller.js');

module.exports = React.createClass({
  mixins: [controller.mixin],
  cursor: ['design'],
  editLabelThreshold: function(e) {
    if(!isNaN(e.target.value)){
      this.cursor.set('labelThreshold', e.target.value);
      this.tree.commit();
    }
  },
  editMinNodeSize: function(e) {
    if(!isNaN(e.target.value)){
      this.cursor.set('minNodeSize', e.target.value);
      this.tree.commit();
    }
  },
  editMaxNodeSize: function(e) {
    if(!isNaN(e.target.value)){
      this.cursor.set('maxNodeSize', e.target.value);
      this.tree.commit();
    }
  },
  render: function() {
    return (
      <div className="details">
        <h2>design</h2>
        <div className="detail">
          <label>threshold</label>
          <input onChange={this.editLabelThreshold} step="0.1" min="0" type="number" value={this.cursor.get('labelThreshold')} />
        </div>
        <div className="detail">
          <label>min node size</label>
          <input onChange={this.editMinNodeSize} step="0.1" min="0" type="number" value={this.cursor.get('minNodeSize')} />
        </div>
        <div className="detail">
          <label>max node size</label>
          <input onChange={this.editMaxNodeSize} step="0.1" min="0" type="number" value={this.cursor.get('maxNodeSize')} />
        </div>
      </div>
    )
  }
});
