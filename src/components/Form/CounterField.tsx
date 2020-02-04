import React from 'react';
import cx from "classnames";

import { FieldProps, FormValues, SetFieldValue } from "./FieldComponent";
import { InputField } from "./InputField";

interface CounterFieldProps extends FieldProps {
  formValues: FormValues;
  setFieldValue: SetFieldValue;
}

export const CounterField: React.FC<CounterFieldProps> = ({
  name,
  className,
  formValues,
  setFieldValue,
  ...props
}) => {
  const value = formValues[name];
  const borderColor = "border-gray-400";
  const buttonClass = "font-semibold text-white h-full w-20 flex focus:outline-none cursor-pointer";
  return (
    <div className={className}>
      <div className={cx("flex flex-row border h-10 w-24 rounded-lg relative", borderColor)}>
        <button type="button"
                className={cx(buttonClass, borderColor, "rounded-l border-r bg-red-700 hover:bg-red-600")}
                onClick={() => setFieldValue(name, Math.max(0, value - 1))}
        >
          <span className="m-auto">-</span>
        </button>
        <InputField name={name} type="hidden" />
        <div className="bg-white w-24 text-xs md:text-base flex items-center justify-center cursor-default">
          <span>{value}</span>
        </div>

        <button type="button"
                className={cx(buttonClass, borderColor, "rounded-r border-l bg-blue-700 hover:bg-blue-600")}
                onClick={() => setFieldValue(name, value + 1)}
        >
          <span className="m-auto">+</span>
        </button>
      </div>
    </div>
  );
};

CounterField.defaultProps = {
  className: "mb-6",
};

export default CounterField;
