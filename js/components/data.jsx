/**
 * Agent Smith Data Component
 * ===========================
 *
 * Component displaying data returned by a cypher query.
 */
var React = require('react'),
    controller = require('../controller.js');

/**
 * Item Display
 */
var DataRow = React.createClass({
  render: function() {
    function renderItem(item, i) {
      var pp = JSON.stringify(item, null, 2)
        .replace(/\n/g, '<br>')
        .replace(/<br>  /g, '<br>&nbsp;&nbsp;');

      return <td key={i} dangerouslySetInnerHTML={{__html: pp}} />;
    }

    return (
      <tr>
        {this.props.row.map(renderItem)}
      </tr>
    );
  }
});

/**
 * Main Component
 */
module.exports = React.createClass({
  displayName: 'Data',
  mixins: [controller.mixin],
  cursor: ['table'],
  renderHeader: function(title) {
    return <th key={title}>{title}</th>;
  },
  renderRow: function(row, i) {
    return <DataRow key={i} row={row} />;
  },
  render: function() {
    var table = this.cursor.get();

    if (!table)
      return <em>There is no data to display, M. Anderson.</em>;

    return (
      <div className="data-table">
        <table>
          <thead>
            <tr>
              {table.headers.map(this.renderHeader)}
            </tr>
          </thead>
          <tbody>
            {table.rows.map(this.renderRow)}
          </tbody>
        </table>
      </div>
    );
  }
});
