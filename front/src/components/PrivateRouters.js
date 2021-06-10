import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { AuthContext } from 'services/context'
import authCheck from 'services/auth-check'

const PrivateRouterWithSubRoutes = (route) => {
    let auth = authCheck();
    // const context = React.useContext(AuthContext)
    console.log("auth props", auth)
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props =>
                auth
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
export default PrivateRouterWithSubRoutes;