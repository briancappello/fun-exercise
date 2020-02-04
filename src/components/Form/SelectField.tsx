/* eslint-disable react/destructuring-assignment */

import React from "react";
import { Field, FieldProps as FormikFieldProps } from "formik";
import cx from "classnames";

import { FieldComponent, FieldProps, OptionChoice } from "./FieldComponent";

const Select: React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>> = ({
  children,
  ...props
}) => <select {...props}>{children}</select>;

export interface SelectFieldProps extends FieldProps {
  options: OptionChoice[];
}

const SelectFieldComponent: React.FC<SelectFieldProps & FormikFieldProps> = props => (
  <FieldComponent
    {...props}
    render={({ form: { touched, errors }, field, className, children, ...props }) => {
      const hasError = touched && touched[field.name] && errors[field.name];
      return (
        <div className="relative">
          <Select {...field} {...props} className={cx(className, {
            "border-red-500": hasError,
          })}>
            {children}
          </Select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" fill="#444444" />
            </svg>
          </div>
        </div>
      );
    }}
  />
);

export const SelectField: React.FC<SelectFieldProps> = ({ options, ...props }) => {
  return (
    <Field component={SelectFieldComponent} {...props}>
      <option></option>
      {options.map(option => (
        <option value={option.value} key={option.value} label={option.label}>
          {option.label}
        </option>
      ))}
    </Field>
  );
};

export default SelectField;
