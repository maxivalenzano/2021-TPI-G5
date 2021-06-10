import React from 'react';
import { Route } from 'react-router-dom';

const RouterWithSubRoutes = (route) => {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => <route.component routes={route.routes} {...props} />}
        />
    );
}
export default RouterWithSubRoutes;