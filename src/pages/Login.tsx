import { Formik, Form } from "formik";
import { gql } from "apollo-boost";
import React from "react";
import { Mutation, MutationFn } from "react-apollo";
// import { Link } from "react-router-dom";
import * as yup from "yup";
import { GRAPHQL_AUTH_URL } from "constants/env";
// import { FORGOT_PASSWORD_URL } from "routes";
import { EmailField, FormStatus, PasswordField } from "components/Form";
import { LoginUser, LoginUserVariables } from "./__generated__/LoginUser";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const loginFormSchema = yup.object().shape({
  email: yup.string().required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

interface FormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  loginUser: MutationFn<LoginUser, LoginUserVariables>;
  onSuccess: (values: FormValues) => void;
  onError?: (err: Error) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginUser,
  onSuccess,
  onError,
}) => {
  return (
    <Formik<FormValues>
      initialValues={INITIAL_VALUES}
      validationSchema={loginFormSchema}
      onSubmit={async (values, { setStatus, setSubmitting }) => {
        try {
          const result = await loginUser({ variables: values });
          if (result && result.data && result.data.loginUser) {
            const { success, message } = result.data.loginUser;
            if (success) {
              setStatus({ formSuccess: "Successfully logged in, redirecting..." });
              onSuccess(values);
            } else {
              setStatus({ formError: message });
            }
          }
        } catch (err) {
          setStatus({ formError: err });
          onError && onError(err)
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, status }) => (
        <div className="w-full max-w-xs mx-auto">
          <Form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="font-bold text-4xl pb-5">Login</h1>
            <FormStatus status={status} className="my-4" />
            <EmailField name="email"
                        label="Email"
                        placeholder="you@example.com" />
            <PasswordField name="password"
                           label="Password"
                           placeholder="************" />
            <div className="flex items-center justify-between">
              {/* login */}
              <button type="submit"
                      disabled={isSubmitting || !isValid}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>

              {/* forgot password? */}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className="font-bold text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export const LOGIN_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      success
      message
    }
  }
`;

interface LoginFormContainerProps {
  onSuccess?: (values: FormValues) => void;
  onError?: (err: Error) => void;
}

const LoginFormContainer: React.FC<LoginFormContainerProps> = ({ onSuccess, ...props }) => {
  const onSuccessFn = onSuccess || function () {
    window.location.href = '/';
  };

  return (
    <Mutation<LoginUser, LoginUserVariables>
      mutation={LOGIN_MUTATION}
      context={{ uri: GRAPHQL_AUTH_URL }}
    >
      {loginUser => <LoginForm loginUser={loginUser} onSuccess={onSuccessFn} {...props} />}
    </Mutation>
  );
};

export default LoginFormContainer;
