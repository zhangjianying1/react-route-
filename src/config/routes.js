import auth from '../utils/auth.js'

function redirectToLogin(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/login')
  }
}

function redirectToDashboard(nextState, replaceState) {
  if (auth.loggedIn()) {
    replaceState(null, '/')
  }
}

export default {
  component: require('../components/App').default,
  childRoutes: [


    { path: 'logout',
      getComponents: (location, cb) => {
        return require.ensure([], (require) => {
          cb(null, require('../components/Logout').default)
        })
      }
    },
    { path: 'about',
      getComponents: (location, cb) => {
        return require.ensure([], (require) => {
          cb(null, require('../components/About').default)
        })
      }
    },

    { onEnter: redirectToDashboard,
      childRoutes: [
        // Unauthenticated routes
        // Redirect to dashboard if user is already logged in
        { path: '/login',
          getComponent: (location, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../components/Login').default)
            })
          }
        }
        // ...
      ]
    },

    { onEnter: redirectToLogin,
      childRoutes: [
        // Protected routes that don't share the dashboard UI
        { path: '/user/:id',
          getComponent: (location, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../components/User').default)
            })
          }
        }
        // ...
      ]
    },

    { path: '/',
      getComponent: (location, cb) => {
        // Share the path
        // Dynamically load the correct component
        if (!auth.loggedIn()) {
          return require.ensure([], (require) => {
            cb(null, require('../components/Dashboard').default)
          })
        }
        return require.ensure([], (require) => {
          cb(null, require('../components/Landing').default)
        })
      },
      indexRoute: {
        getComponent: (location, cb) => {
          // Only load if we're logged in
          if (auth.loggedIn()) {
            return require.ensure([], (require) => {
              cb(null, require('../components/PageOne').default)
            })
          }
          return cb()
        }
      },
      childRoutes: [
        { onEnter: redirectToLogin,
          childRoutes: [
            // Protected nested routes for the dashboard
            { path: '/page2',
              getComponent: (location, cb) => {
                require.ensure([], (require) => {
                  cb(null, require('../components/PageTwo').default)
                })
              }
            }
            // ...
          ]
        }
      ]
    }

  ]
}
