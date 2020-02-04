/* eslint-disable react/destructuring-assignment */

import { Field, FieldProps as FormikFieldProps } from "formik";
import React from "react";
import cx from "classnames";

import { FieldComponent, FieldProps } from "./FieldComponent";

export const Input: React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = props =>
  <input {...props} />;

export interface InputFieldProps extends FieldProps {
  type?: string;
}

const InputFieldComponent: React.FC<InputFieldProps & FormikFieldProps> = props => (
  <FieldComponent
    {...props}
    render={({ form: { touched, errors }, field, className, ...props }) => {
      const hasError = touched && touched[field.name] && errors[field.name];
      return (
        <Input {...field} {...props} className={cx(className, {
          "border-red-500": hasError,
        })} />
      );
    }}
  />
);

InputFieldComponent.defaultProps = {
  type: "text",
};

export const InputField: React.FC<InputFieldProps> = props =>
  <Field component={InputFieldComponent} {...props} />;

export const TextField: React.FC<InputFieldProps> = ({ type, ...props }) =>
  <Field component={InputFieldComponent} type="text" {...props} />;

export const EmailField: React.FC<InputFieldProps> = ({ type, ...props }) =>
  <Field component={InputFieldComponent} type="email" {...props} />;

export const PasswordField: React.FC<InputFieldProps> = ({ type, ...props }) =>
  <Field component={InputFieldComponent} type="password" {...props} />;

export default InputField;
