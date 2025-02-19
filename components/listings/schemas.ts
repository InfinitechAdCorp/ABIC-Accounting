import * as Yup from "yup";

const rules = {
  client: Yup.string().trim().required("Client is a required field"),
  type: Yup.string().trim().required("Type is a required field"),
  project: Yup.string().trim().required("Project is a required field"),
  unit: Yup.string().trim().required("Unit is a required field"),
  res: Yup.date()
    .typeError("Date Res must be a valid date")
    .required("Date Res is a required field"),
  terms: Yup.string().trim().required("Terms is a required field"),
  consultant: Yup.string().trim().required("Consultant is a required field"),
  manager: Yup.string().trim().required("Manager is a required field"),
  list_price: Yup.number()
    .typeError("List Price must be a number")
    .moreThan(-1, "List Price must be a positive number"),
  total_price: Yup.number()
    .typeError("Total Price must be a number")
    .moreThan(-1, "Total Price must be a positive number"),
  status: Yup.string().trim().required("Status is a required field"),
  source: Yup.string().trim().required("Source is a required field"),
  extension: Yup.date()
    .typeError("Extension must be a valid date")
    .min(Yup.ref("closed"), "Extension must be after Closed Date")
    .nullable(),
  closed: Yup.date()
    .typeError("Closed Date must be a valid date")
    .min(Yup.ref("res"), "Closed Date must be after Date Res")
    .nullable(),
};

export const create = Yup.object().shape({
  ...rules,
});

export const update = Yup.object().shape({
  ...rules,
  id: Yup.string().trim().required("ID is a required field"),
});
