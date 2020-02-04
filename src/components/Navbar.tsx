import React from 'react';
import { Mutation } from 'react-apollo'
import { gql } from "apollo-boost";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";

import { AppContext } from "../App";
import {
  URL_ABOUT,
  URL_COINBASE,
  URL_CONTACT,
  URL_LOGIN,
  URL_FORM,
  URL_HOME,
} from "../routes";

import { LogoutUser } from "./__generated__/LogoutUser";

const MENU = [
  { label: 'About', to: URL_ABOUT },
  { label: 'Form', to: URL_FORM },
  { label: "Contact", to: URL_CONTACT },
  { label: 'Coinbase', to: URL_COINBASE },
  /* login and logout are handled below, in the render method of Navbar */
];

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser {
      success
    }
  }
`;

interface NavItemProps {
  label: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, to }) => {
  return (
    <li className="nav-item hover:bg-blue-600">
      <NavLink to={to}
               className="px-4 py-3 flex items-center text-xs font-bold leading-snug text-white hover:underline"
               activeClassName="bg-blue-600"
      >
        {label}
      </NavLink>
    </li>
  );
};

const Navbar: React.FC<RouteComponentProps> = ({ history }) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <AppContext.Consumer>
      {({ loggedIn }) => {
        return (
          <nav className="relative navbar-expand-md bg-blue-500">
            <div className="flex flex-wrap justify-between">

              <div
                className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start hover:bg-blue-600">
                {/* brand */}
                <a href="/"
                   className="text-sm font-bold leading-relaxed inline-block mx-4 py-2 whitespace-no-wrap text-white">
                  Company Name
                </a>

                {/* responsive hamburger icon */}
                <div className="ml-auto md:hidden">
                  <button className="flex items-center px-3 py-2 border rounded" type="button"
                          onClick={() => setNavbarOpen(!navbarOpen)}>
                    <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <title>Menu</title>
                      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" fill="white" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* menu links */}
              <div className={"md:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden")}>
                <ul className="flex flex-col md:flex-row list-none md:ml-auto">
                  {MENU.map(({ label, to }) => <NavItem label={label} to={to} key={to} />)}
                  {!loggedIn
                    ? <NavItem label="Login" to={URL_LOGIN} />
                    : (
                      <Mutation<LogoutUser>
                        mutation={LOGOUT_USER}
                        onCompleted={() => {
                          history.push(URL_HOME);
                        }}
                      >
                        {(logoutUser, { client }) => (
                          <li className="nav-item hover:bg-blue-600">
                            {/* eslint-disable-next-line */}
                            <a onClick={() => logoutUser().then(() => client.resetStore())} href="#"
                               className="px-4 py-3 flex items-center text-xs font-bold leading-snug text-white"
                            >
                              Logout
                            </a>
                          </li>
                        )}
                      </Mutation>
                    )
                  }
                </ul>
              </div>

            </div>
          </nav>
        );
      }}
    </AppContext.Consumer>
  );
};

export default withRouter(Navbar);
