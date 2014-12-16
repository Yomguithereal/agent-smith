var React = require('react');

console.log('Yeah');

var App = React.createClass({
  render: function() {
    return <div>Hello</div>;
  }
});

var test = [0, 2, 3].map(x => x + 1);
console.log('hry')

var sigma = require('./lib/sigma.js');
console.log(sigma.instances(0));
