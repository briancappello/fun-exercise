import React from "react";
import { Transition } from "react-transition-group";
import get from "lodash/get";

import Alert from "components/Alert";

const DURATION = 300;
const defaultStyle = {
  transition: `opacity ${DURATION}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles: { [index: string]: React.CSSProperties } = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};
interface FormStatusProps {
  status: {
    formSuccess?: string;
    formError?: string;
  };
  className?: string;
}

const FormStatus: React.FC<FormStatusProps> = ({ status, className }) => {
  const formSuccess = status && status.formSuccess;
  const formError = status && status.formError;

  if (!formError && !formSuccess) {
    return null;
  }

  return (
    <div className={className}>
      {formSuccess && (
        <Transition in={!!formSuccess} timeout={DURATION}>
          {state => (
            <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
              <Alert theme="success" className="mb-4">
                {formSuccess}
              </Alert>
            </div>
          )}
        </Transition>
      )}
      {formError && (
        <Transition in={!!formError} timeout={DURATION}>
          {state => (
            <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
              <Alert theme="error" className="mb-4">
                {get(formError, "message", formError)}
              </Alert>
            </div>
          )}
        </Transition>
      )}
    </div>
  );
};

export default FormStatus;
