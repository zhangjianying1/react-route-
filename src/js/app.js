import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router } from 'react-router'
import routes from './config/routes'

render(<Router history={browserHistory} routes={routes}/>, document.getElementById('app'))
//var component = getUrlQuery('component');
//
//if('login' === component) {
//    require.ensure([], function(require) {
//        var dialog = require('./components/login');
//        // todo ...
//    });
//}
//
//if('toast' === component) {
//    require.ensure([], function(require) {
//        var toast = require('./components/toast');
//        // todo ...
//    });
//}
//function getUrlQuery(){
//    var search = location.search.substring(1);
//    return search.replace('component=', '');
//}