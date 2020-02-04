import React from 'react';
import { ApolloProvider } from "react-apollo";
import { Route, Router, Switch } from "react-router-dom";

import configureClient from "./helpers/configureClient";
import history from "./helpers/history";
import App from "./App";
import { routes } from "./routes"

import "./index.css"

const client = configureClient();

const Root: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <App>
          <Switch>
            {Object.keys(routes).map(path =>
              <Route key={path} exact path={path} component={routes[path]}/>
            )}
          </Switch>
        </App>
      </Router>
    </ApolloProvider>
  );
};

export default Root;
