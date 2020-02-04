import ApolloClient from "apollo-boost";
import get from "lodash/get";
import { invariant } from "ts-invariant";
import { GRAPHQL_AUTH_URL, TOKEN_KEY } from "constants/env";
import { URL_HOME } from "routes";
import history from "./history";

const configureClient = () => {
  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  return new ApolloClient({
    uri: GRAPHQL_AUTH_URL,
    request: async operation => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (token) {
        operation.setContext({
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      }
    },
    onError: ({ graphQLErrors, networkError, operation }) => {
      if (networkError) {
        // Getting the current user can fail, that's expected
        if (operation.operationName === "CurrentUserQuery") {
          return;
        }

        invariant.warn(`[Network error]: ${networkError}`);

        // If we get a 401, we log out the user
        if (get(networkError, "statusCode") === 401) {
          removeToken();
          history.push(URL_HOME);
        }
      }

      if (graphQLErrors) {
        graphQLErrors.forEach(graphqlError => {
          // This is not supposed to be a string, but it is sometimes?
          // Maybe it's a graphene thang? Anyway, we'll handle it.
          if (typeof graphqlError === "string") {
            invariant.warn(`[GraphQL error]: Message: ${graphqlError}`);
          }
          // Default apollo-boost handling
          else {
            const { message, locations, path } = graphqlError;
            invariant.warn(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
          }
        });
      }
    },
  });
};

export default configureClient;
