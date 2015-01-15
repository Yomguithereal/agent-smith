/**
 * Agent Smith Navigation Component
 * =================================
 *
 * Simple component enabling navigation.
 */
var React = require('react'),
    state = require('react-router').State;

const ITEMS = [
  {
    url: '',
    label: '~',
  },
  {
    url: 'stats',
    label: 's'
  },
  {
    url: 'design',
    label: 'd'
  },
  {
    url: 'settings',
    label: 'c'
  }
];

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

module.exports = React.createClass({
  mixins: [state],
  render: function() {
    var currentPath = this.getPathname();

    return (
      <nav>
        <div className="inner">
          {
            ITEMS.map(function(item) {
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
