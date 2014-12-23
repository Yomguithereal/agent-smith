/**
 * Agent Smith Navigation Component
 * =================================
 *
 * Simple component enabling navigation.
 */
var React = require('react'),
    state = require('react-router').State;

var Item = React.createClass({
  render: function() {
    return (
      <a href={'#/' + this.props.url}
         className={this.props.active ? 'active' : ''}>
        <div>{this.props.label}</div>
      </a>
    );
  }
});

var items = [
  {
    url: '',
    label: '~',
  },
  {
    url: 'design',
    label: 'd'
  },
  {
    url: 'settings',
    label: 's'
  }
];

module.exports = React.createClass({
  mixins: [state],
  render: function() {
    var currentPath = this.getPathname();

    return (
      <nav>
        <div className="inner">
          {
            items.map(function(item) {
              return <Item key={item.label}
                           url={item.url}
                           label={item.label}
                           active={currentPath === '/' + item.url} />
            })
          }
        </div>
      </nav>
    );
  }
});
