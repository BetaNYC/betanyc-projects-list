'use strict';

// App specific styles
require('./app.less');

// Global libraries
var React = require('react/addons');
var { PropTypes } = React;
window.Zepto = window.$ = require('zeptojs');

// Components
var NavBarComponent = require('./components/NavBarComponent');
var HomePage = require('pages/HomePage');
var DocumentTitle = require('react-document-title');
var { RouteHandler } = require('react-router');


var App;
export default App = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },

  render() {
    return (
      <DocumentTitle title='BetaNYC Projects - Building a better tomorrow'>
        <div className='App'>
          <NavBarComponent/>
          <RouteHandler {...this.props} />
        </div>
      </DocumentTitle>
    );
  }
});

