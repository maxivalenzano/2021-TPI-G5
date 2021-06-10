import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes from 'config/routes';
import authRoutes from 'config/auth.routes';
import authCheck from 'services/auth-check'

const App = () => {
  let auth = authCheck();
  console.log("Cookies: ", auth)
  return (
    <BrowserRouter>
      <Switch>
        {
          authRoutes.map((route, index) => (
            <RouterWithSubRoutes key={index} {...route} />
          ))
        }

        {
          routes.map((route, index) => (
            <PrivateRouterWithSubRoutes key={index} auth={auth} {...route} />
          ))
        }
      </Switch>
    </BrowserRouter>
  );
}

const PrivateRouterWithSubRoutes = (route) => {
  // console.log("auth props", route)
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props =>
        route.auth
          ? <route.component routes={route.routes} {...props} />
          : <Redirect to={{
            pathname: '/auth',
            state: { from: props.location }
          }}
          />
      }
    />
  );
}

const RouterWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
