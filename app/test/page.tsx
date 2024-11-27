"use client";

import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

const schema = Yup.object().shape({
  email: Yup.string().email("Please enter valid email").required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), "Password must match"])
    .required(),
});

const Test = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: ({email, password}) => {
        alert(email)
        alert(password)
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;
  console.log(errors)

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex w-[450px]">
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 mb-2"
            />
            {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 mb-2"
            />
            {errors.password && touched.password && (
              <div className="text-red-500">{errors.password}</div>
            )}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 mb-2"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="text-red-500">{errors.confirmPassword}</div>
            )}

            <button type="submit" className="bg-blue-500 text-white p-2">
                Submit
            </button>
          </form>

          <div className="flex flex-col w-full">
            <h1>Email: {values.email}</h1>
            <h1>Password: {values.password}</h1>
            <h1>Confirm Password: {values.confirmPassword}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
