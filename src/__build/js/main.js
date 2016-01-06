webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(158);

	var _reactRouter = __webpack_require__(159);

	var _routes = __webpack_require__(208);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _reactDom.render)(_react2.default.createElement(_reactRouter.Router, { history: _reactRouter.browserHistory, routes: _routes2.default }), document.querySelector('#app'));

/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _auth = __webpack_require__(209);

	var _auth2 = _interopRequireDefault(_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function redirectToLogin(nextState, replaceState) {
	  if (!_auth2.default.loggedIn()) {
	    replaceState({
	      nextPathname: nextState.location.pathname
	    }, '/login');
	  }
	}

	function redirectToDashboard(nextState, replaceState) {
	  if (_auth2.default.loggedIn()) {
	    replaceState(null, '/');
	  }
	}

	exports.default = {
	  component: __webpack_require__(210).default,
	  childRoutes: [{ path: 'landing',
	    getComponents: function getComponents(location, callback) {
	      __webpack_require__.e/* nsure */(1, function (require) {
	        callback(null, __webpack_require__(211).default);
	      });
	    }
	  }, { path: 'logout',
	    getComponents: function getComponents(location, cb) {
	      return __webpack_require__.e/* nsure */(2, function (require) {
	        cb(null, __webpack_require__(212).default);
	      });
	    }
	  }, { path: 'about',
	    getComponents: function getComponents(location, cb) {
	      return __webpack_require__.e/* nsure */(3, function (require) {
	        cb(null, __webpack_require__(213).default);
	      });
	    }
	  }, { onEnter: redirectToDashboard,
	    childRoutes: [
	    // Unauthenticated routes
	    // Redirect to dashboard if user is already logged in
	    { path: '/login',
	      getComponent: function getComponent(location, cb) {
	        __webpack_require__.e/* nsure */(4, function (require) {
	          cb(null, __webpack_require__(214).default);
	        });
	      }
	    }
	    // ...
	    ]
	  }, { onEnter: redirectToLogin,
	    childRoutes: [
	    // Protected routes that don't share the dashboard UI
	    { path: '/user/:id',
	      getComponent: function getComponent(location, cb) {
	        __webpack_require__.e/* nsure */(5, function (require) {
	          cb(null, __webpack_require__(215).default);
	        });
	      }
	    }
	    // ...
	    ]
	  }, { path: '/',
	    getComponent: function getComponent(location, cb) {
	      // Share the path
	      // Dynamically load the correct component
	      if (!_auth2.default.loggedIn()) {
	        return __webpack_require__.e/* nsure */(6, function (require) {
	          cb(null, __webpack_require__(216).default);
	        });
	      }
	      return __webpack_require__.e/* nsure */(1/* duplicate */, function (require) {
	        cb(null, __webpack_require__(211).default);
	      });
	    },
	    indexRoute: {
	      getComponent: function getComponent(location, cb) {
	        // Only load if we're logged in
	        if (_auth2.default.loggedIn()) {
	          return __webpack_require__.e/* nsure */(7, function (require) {
	            cb(null, __webpack_require__(217).default);
	          });
	        }
	        return cb();
	      }
	    },
	    childRoutes: [{ onEnter: redirectToLogin,
	      childRoutes: [
	      // Protected nested routes for the dashboard
	      { path: '/page2',
	        getComponent: function getComponent(location, cb) {
	          __webpack_require__.e/* nsure */(8, function (require) {
	            cb(null, __webpack_require__(218).default);
	          });
	        }
	      }
	      // ...
	      ]
	    }]
	  }]
	};

/***/ },

/***/ 209:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  login: function login(email, pass, cb) {
	    var _this = this;

	    cb = arguments[arguments.length - 1];
	    if (localStorage.token) {
	      if (cb) cb(true);
	      this.onChange(true);
	      return;
	    }
	    pretendRequest(email, pass, function (res) {
	      if (res.authenticated) {
	        localStorage.token = res.token;
	        if (cb) cb(true);
	        _this.onChange(true);
	      } else {
	        if (cb) cb(false);
	        _this.onChange(false);
	      }
	    });
	  },

	  getToken: function getToken() {
	    return localStorage.token;
	  },

	  logout: function logout(cb) {
	    delete localStorage.token;
	    if (cb) cb();
	    this.onChange(false);
	  },

	  loggedIn: function loggedIn() {
	    return !!localStorage.token;
	  },

	  onChange: function onChange() {}
	};

	function pretendRequest(email, pass, cb) {
	  setTimeout(function () {
	    if (email === 'joe@example.com' && pass === 'password1') {
	      cb({
	        authenticated: true,
	        token: Math.random().toString(36).substring(7)
	      });
	    } else {
	      cb({ authenticated: false });
	    }
	  }, 0);
	}

/***/ },

/***/ 210:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(159);

	var _auth = __webpack_require__(209);

	var _auth2 = _interopRequireDefault(_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = _react2.default.createClass({
	  displayName: 'App',
	  getInitialState: function getInitialState() {
	    return {
	      loggedIn: _auth2.default.loggedIn()
	    };
	  },
	  updateAuth: function updateAuth(loggedIn) {
	    this.setState({
	      loggedIn: !!loggedIn
	    });
	  },
	  componentWillMount: function componentWillMount() {
	    _auth2.default.onChange = this.updateAuth;
	    _auth2.default.login();
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'ul',
	        null,
	        _react2.default.createElement(
	          'li',
	          null,
	          this.state.loggedIn ? _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/logout' },
	            'Log out'
	          ) : _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/login' },
	            'Sign in'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/about' },
	            'About'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/' },
	            'Home'
	          ),
	          ' (changes depending on auth status)'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/page2' },
	            'Page Two'
	          ),
	          ' (authenticated)'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/user/foo' },
	            'User: Foo'
	          ),
	          ' (authenticated)'
	        )
	      ),
	      this.props.children
	    );
	  }
	});

	exports.default = App;

/***/ }

});