import React from 'react';

import {
  FieldComponent,
  FieldProps,
  FormValues,
  OptionChoice,
  SetFieldValue,
} from "./FieldComponent";
import { Input } from "./InputField";
import { Field, FieldProps as FormikFieldProps } from "formik";

export interface RadioFieldProps extends FieldProps {
  options: OptionChoice[];
  formValues: FormValues;
  setFieldValue: SetFieldValue;
}

const RadioComponent: React.FC<RadioFieldProps & FormikFieldProps > = ({
  options,
  formValues,
  setFieldValue,
  ...props
}) => {
  return (
    <FieldComponent
      {...props}
      render={({ form: { touched, errors }, field, className, ...props }) => {
      return (
      <div className="block w-full px-3">
        {options.map(option => (
          <label htmlFor={option.value} key={option.value}>
            <Input type="radio" name={field.name} value={option.value} id={option.value}
                   checked={formValues[field.name] === option.value}
                   onChange={() => setFieldValue(field.name, option.value)}
            /> <span className="ml-1 mr-6">{option.label}</span>
          </label>
        ))}
      </div>
      );
    }} />
  );
};

RadioComponent.defaultProps = {
  inputClassName: "py-3 px-3 border rounded bg-white text-gray-800 leading-tight focus:outline-none focus:shadow-outline",
};

export const RadioField: React.FC<RadioFieldProps> = props => {
  return <Field component={RadioComponent} {...props} />;
};

export default RadioField;
