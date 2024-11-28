import * as Yup from "yup";

export const create = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  starting_balance: Yup.number()
    .typeError("Starting Balance must be a number")
    .moreThan(-1, "Starting Balance must be a positive number"),
});

export const update = Yup.object().shape({
  id: Yup.string().required("ID is a required field"),
  name: Yup.string().required("Name is a required field"),
  starting_balance: Yup.number()
    .typeError("Starting Balance must be a number")
    .moreThan(-1, "Starting Balance must be a positive number"),
});
