import * as Yup from "yup";

export const login = Yup.object().shape({
  username: Yup.string().required("Username is a required field"),
  password: Yup.string().required("Password is a required field"),
});

export const destroy = Yup.object().shape({
  id: Yup.string().required("ID is a required field"),
});