/* eslint-disable react/destructuring-assignment */

import { Field, FieldProps as FormikFieldProps } from "formik";
import React from "react";
import cx from "classnames";

import { FieldComponent, FieldProps } from "./FieldComponent";

const TextArea: React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>> = props => <textarea {...props} />;

export interface TextAreaFieldProps extends FieldProps {
  rows?: number;
  cols?: number;
}

const TextAreaFieldComponent: React.FC<TextAreaFieldProps & FormikFieldProps> = props => {
  return (
    <FieldComponent
      {...props}
      render={({ form: { touched, errors }, field, className, ...props }) => {
        const hasError = touched && touched[field.name] && errors[field.name];
        return (
          <TextArea {...field} {...props} className={cx(className, {
            "border-red-500": hasError,
          })} />
        );
      }}
    />
  );
};

export const TextAreaField: React.FC<TextAreaFieldProps> = props =>
  <Field component={TextAreaFieldComponent} {...props} />;

export default TextAreaField;
