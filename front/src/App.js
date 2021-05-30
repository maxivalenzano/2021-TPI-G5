import React from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from 'config/routes';
import Login from 'pages/Login'
import Footer from 'components/Footer'

function App() {

  const login = true;

  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />
          <Footer
            title="Los cracks"
            description="Página diseñada para la matería de DACS"
          />
        </Route>

        {login &&
          routes.map((route, index) => (
          <RouterWithSubRoutes key={index} {...route} />
          ))
        }
      </Switch>
    </Router>
  );
}

function RouterWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  )
}

export default App;
