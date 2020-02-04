const proxy = require("http-proxy-middleware");

const GRAPHQL_AUTH_URL = process.env.REACT_APP_GRAPHQL_AUTH_URL || "/auth/graphql/";
const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || "/graphql/";
const API_URL = "/api";
const LOGOUT_URL = process.env.REACT_APP_LOGOUT_URL || "/logout";

const PROXY_PATHS = [
  // "/static",
  GRAPHQL_AUTH_URL,
  GRAPHQL_URL,
  API_URL,
  LOGOUT_URL,
];

module.exports = app => {
  app.use(
    proxy(PROXY_PATHS, {
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );
};
