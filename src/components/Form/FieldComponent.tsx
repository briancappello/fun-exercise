/* eslint-disable react/destructuring-assignment */

import React from "react";
import { FieldProps as FormikFieldProps } from "formik";
import cx from "classnames";

interface BaseFieldProps {
  name: string;
  id?: string;
  value?: any;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface FieldProps extends BaseFieldProps {
  label?: string;
  hint?: string;
  prefix?: string;
  labelClassName?: string;
  prefixClassName?: string;
  inputClassName?: string;
}

export interface OptionChoice {
  value: string;
  label: string;
}
export interface FormValues {
  [key: string]: any;
}
export interface SetFieldValue {
  (field: any, value: any): void
}

type FieldComponentRenderFunctionProps = BaseFieldProps & FormikFieldProps;

interface FieldComponentRenderFunction {
  (props: FieldComponentRenderFunctionProps): React.ReactNode;
}

interface FieldComponentBaseProps extends FieldProps {
  render: FieldComponentRenderFunction;
  type?: string;
}

export type FieldComponentProps = FieldComponentBaseProps & FormikFieldProps;

export const FieldComponent: React.FC<FieldComponentProps> = ({
  field,
  prefix,
  label,
  hint,
  form,
  render,
  className,
  labelClassName,
  prefixClassName,
  inputClassName,
  ...props
}) => {
  if (props.type && (props.type === "radio" || props.type === "checkbox")) {
    return <>{render({ form, field, className: inputClassName, ...props })}</>;
  }

  const { touched, errors } = form;
  const hasError = touched && touched[field.name] && errors[field.name];
  return (
    <div className={className}>
      {label && (
        <label htmlFor={field.name} className={labelClassName} id={field.name}>
          {label}
        </label>
      )}
      <div>
        {prefix && <span className={prefixClassName}>{prefix}</span>}
        {render({ form, field, className: inputClassName, ...props })}
      </div>
      {hasError && <p className="mt-2 text-xs italic text-red-500">{errors[field.name]}</p>}
      {hint && <p className={cx("text-xs italic text-gray-800", {
        "mt-1": hasError,
        "mt-2": !hasError,
      })}>{hint}</p>}
    </div>
  );
};

FieldComponent.defaultProps = {
  className: "mb-4",
  labelClassName: "block uppercase text-gray-800 text-xs font-bold mb-2",
  inputClassName: "appearance-none block w-full py-3 px-3 border rounded bg-white text-gray-800 leading-tight focus:outline-none focus:shadow-outline",
};
