import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authCheck from 'services/auth-check'

const RouterWithSubRoutes = (route) => {
    let auth = authCheck();
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props =>
                auth
                    ? <Redirect to={{ pathname: '/' }} />
                    : <route.component routes={route.routes} {...props} />}
        />
    );
}
export default RouterWithSubRoutes;