import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import routes from "config/routes";
import authRoutes from "config/auth.routes";
import PrivateRouterWithSubRoutes from "components/PrivateRouters";
import RouterWithSubRoutes from "components/RouterWithSubRoutes";

const App = () => {
  // console.log("Cookies: ", auth)
  return (
    <BrowserRouter>
      <Switch>
        {authRoutes.map((route, index) => (
          <RouterWithSubRoutes key={index} {...route} />
        ))}

        {routes.map((route, index) => (
          <PrivateRouterWithSubRoutes key={index} {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
