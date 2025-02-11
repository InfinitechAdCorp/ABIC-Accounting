import * as Yup from "yup";

export const create = Yup.object().shape({
  client: Yup.string().required("Client is a required field"),
  type: Yup.string().required("Type is a required field"),
  project: Yup.string().required("Project is a required field"),
  unit: Yup.string().required("Unit is a required field"),
  res: Yup.date()
    .typeError("Date Res must be a valid date")
    .required("Date Res is a required field"),
  terms: Yup.string().required("Terms is a required field"),
  consultant: Yup.string().required("Consultant is a required field"),
  manager: Yup.string().required("Manager is a required field"),
  list_price: Yup.number()
    .typeError("List Price must be a number")
    .moreThan(-1, "List Price must be a positive number"),
  total_price: Yup.number()
    .typeError("Total Price must be a number")
    .moreThan(-1, "Total Price must be a positive number"),
  status: Yup.string().required("Status is a required field"),
  source: Yup.string().required("Source is a required field"),
  extension: Yup.date().nullable(),
  closed: Yup.date().nullable(),
});

export const update = Yup.object().shape({
  id: Yup.string().required("ID is a required field"),
  client: Yup.string().required("Client is a required field"),
  type: Yup.string().required("Type is a required field"),
  project: Yup.string().required("Project is a required field"),
  unit: Yup.string().required("Unit is a required field"),
  res: Yup.date()
    .typeError("Date Res must be a valid date")
    .required("Date Res is a required field"),
  terms: Yup.string().required("Terms is a required field"),
  consultant: Yup.string().required("Consultant is a required field"),
  manager: Yup.string().required("Manager is a required field"),
  list_price: Yup.number()
    .typeError("List Price must be a number")
    .moreThan(-1, "List Price must be a positive number"),
  total_price: Yup.number()
    .typeError("Total Price must be a number")
    .moreThan(-1, "Total Price must be a positive number"),
  status: Yup.string().required("Status is a required field"),
  source: Yup.string().required("Source is a required field"),
  extension: Yup.date().nullable(),
  closed: Yup.date().nullable(),
});
