import React from "react";

import { CounterField, EmailField, RadioField, SelectField, TextAreaField, TextField } from "components/Form";
import { Form, Formik } from "formik";
import * as yup from "yup";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  zipcode: string;
  message: string;
  radio: string;
  counter: number;
}

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  state: "",
  zipcode: "",
  message: "",
  radio: "",
  counter: 0,
};

const formSchema = yup.object().shape({
  // firstName: yup.string().required("Please enter your first name"),
  // lastName: yup.string().required("Please enter your last name"),
  // email: yup.string().required("Please enter your email"),
  // city: yup.string().required("Please enter your city"),
  // state: yup.string().required("Please select your state"),
  // zipcode: yup.string().required("Please enter your zipcode"),
  // message: yup.string().required("Please enter a message"),
});

const SampleForm: React.FC = () => {
  return (
    <Formik<FormValues>
      initialValues={INITIAL_VALUES}
      validationSchema={formSchema}
      onSubmit={async (values, { setStatus, setSubmitting }) => {
        console.log(values)
      }}
    >
      {({ isSubmitting, isValid, status, values, setFieldValue }) => (
        <Form>
          <h1 className="py-5 text-xl font-bold">Form!</h1>
          <div className="bg-white shadow-md rounded px-8 pb-8 mb-4 flex flex-col my-2">

            {/* row(firstName, lastName) */}
            <div className="-mx-3 md:flex mb-3">
              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                <TextField name="firstName" label="First name" placeholder="Jane" />
              </div>
              <div className="md:w-1/2 px-3">
                <TextField name="lastName" label="Last name" placeholder="Doe" />
              </div>
            </div>

            {/* row(email) */}
            <div className="-mx-3 md:flex mb-3">
              <div className="md:w-full px-3">
                <EmailField name="email" label="Email" placeholder="you@example.com"
                            hint="What's up dog?"
                />
              </div>
            </div>{/* end_row(email) */}

            {/* row(city, state, zipcode)
              *
              * for three full-width form element rows: omit the className "flex"
              * or for inline form elements w/ automatic width: use className "flex"
              * NOTE: auto-width requires child elements have className "flex-1"
             */}
            <div className="-mx-3 flex mb-2">
              <div className="flex-1 px-3 mb-3 md:mb-0">
                <TextField name="city" label="City" placeholder="Denver" />
              </div>
              <div className="flex-1 px-3 mb-3 md:mb-0">
                <SelectField name="state" label="State" options={[
                  { value: "CO", label: "Colorado" },
                  { value: "CT", label: "Connecticut" },
                  { value: "VT", label: "Vermont" },
                ]} />
              </div>
              <div className="flex-1 px-3">
                <TextField name="zipcode" label="Zipcode" placeholder="00000" />
              </div>
            </div>

            <div className="-mx-3 md:flex mb-2">
              <div className="w-full px-3">
                <TextAreaField name="message" label="Message" rows={4} placeholder="Hello world..." />
              </div>
            </div>

            <div className="-mx-3 md:flex mb-2">
              <RadioField name="radio" label="tune in" options={[
                { value: "one", label: "One" },
                { value: "two", label: "Two" },
              ]} formValues={values} setFieldValue={setFieldValue} />
            </div>

            <CounterField formValues={values} setFieldValue={setFieldValue} name="counter" />

            {/* submit button */}
            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
                <button type="submit"
                        className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
              <div className="md:w-2/3" />
            </div>
          </div>
        </Form>
      )}

    </Formik>
  );
};

export default SampleForm;
