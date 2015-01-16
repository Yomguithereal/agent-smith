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
    icon: 'table'
  },
  {
    url: 'design',
    icon: 'paint-brush'
  },
  {
    url: 'settings',
    icon: 'cogs'
  }
];

var Item = React.createClass({
  render: function() {
    var i = this.props.item;

    return (
      <a href={'#/' + i.url}
         className={this.props.active ? 'active' : ''}>
        <div>{i.label ? i.label : <i className={'fa fa-' + i.icon} />}</div>
      </a>
    );
  }
});

module.exports = React.createClass({
  displayName: 'Navigation',
  mixins: [state],
  render: function() {
    var currentPath = this.getPathname();

    return (
      <nav>
        <div className="inner">
          {
            ITEMS.map(function(item) {
              return <Item key={item.url}
                           item={item}
                           active={currentPath === '/' + item.url} />
            })
          }
        </div>
      </nav>
    );
  }
});
