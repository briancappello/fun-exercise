import React from 'react';
import { Helmet } from "react-helmet";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import {
  CurrentUserQuery,
  CurrentUserQuery_me as CurrentUser,
} from "./__generated__/CurrentUserQuery";

import Navbar from 'components/Navbar';

export const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    me {
      id
      email
    }
  }
`;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div>
      <Helmet defaultTitle="Fun Exercise" titleTemplate="%s - Fun Exercise"/>
      <Navbar />
      <div className="px-10">
        {children}
      </div>
    </div>
  );
};

interface ContextProps {
  currentUser: CurrentUser | undefined;
  loggedIn: boolean;
}

export const AppContext = React.createContext<ContextProps>({
  currentUser: undefined,
  loggedIn: false,
});

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps & RouteComponentProps> = ({
  children,
  location,
  history,
}) => {
  return (
    <Query<CurrentUserQuery> query={CURRENT_USER_QUERY}>
      {({ loading, data }) => {
        if (loading) {
          return <AppLayout>Loading...</AppLayout>;
        }

        const me = data && data.me;
        const contextState = {
          loggedIn: !!me,
          currentUser: me || undefined,
        };

        return (
          <AppContext.Provider value={contextState}>
            <AppLayout>
              {children}
            </AppLayout>
          </AppContext.Provider>
        );
      }}
    </Query>
  );
};

export default withRouter(App);
