import * as Yup from "yup";

export const create = Yup.object().shape({
  client_id: Yup.string().required("Client ID is a required field"),
  property: Yup.string().required("Property is a required field"),
  location: Yup.string().required("Location is a required field"),
  start: Yup.date()
    .typeError("Start Date must be a valid date")
    .required("Start Date is a required field"),
  end: Yup.date()
    .typeError("End Date must be a valid date")
    .required("End Date is a required field")
    .min(Yup.ref("start"), "End Date must be after Start Date"),
  advance: Yup.number()
    .typeError("Advance must be a number")
    .moreThan(-1, "Advance must be a positive number"),
  deposit: Yup.number()
    .typeError("Deposit must be a number")
    .moreThan(-1, "Deposit must be a positive number"),
  tenant_price: Yup.number()
    .typeError("Tenant Price must be a number")
    .moreThan(-1, "Tenant Price must be a positive number"),
  owner_income: Yup.number()
    .typeError("Owner Income must be a number")
    .moreThan(-1, "Owner Income must be a positive number"),
  abic_income: Yup.number()
    .typeError("ABIC Income must be a number")
    .moreThan(-1, "ABIC Income must be a positive number"),
  due: Yup.date()
    .typeError("Due Date must be a valid date")
    .required("Due Date is a required field")
    .min(Yup.ref("start"), "Due Date must be after Start Date")
    .max(Yup.ref("end"), "Due Date must be before Due Date"),
});

export const update = Yup.object().shape({
  id: Yup.string().required("ID is a required field"),
  client_id: Yup.string().required("Client ID is a required field"),
  property: Yup.string().required("Property is a required field"),
  location: Yup.string().required("Location is a required field"),
  start: Yup.date()
    .typeError("Start Date must be a valid date")
    .required("Start Date is a required field"),
  end: Yup.date()
    .typeError("End Date must be a valid date")
    .required("End Date is a required field")
    .min(Yup.ref("start"), "End Date must be after Start Date"),
  advance: Yup.number()
    .typeError("Advance must be a number")
    .moreThan(-1, "Advance must be a positive number"),
  deposit: Yup.number()
    .typeError("Deposit must be a number")
    .moreThan(-1, "Deposit must be a positive number"),
  tenant_price: Yup.number()
    .typeError("Tenant Price must be a number")
    .moreThan(-1, "Tenant Price must be a positive number"),
  owner_income: Yup.number()
    .typeError("Owner Income must be a number")
    .moreThan(-1, "Owner Income must be a positive number"),
  abic_income: Yup.number()
    .typeError("ABIC Income must be a number")
    .moreThan(-1, "ABIC Income must be a positive number"),
  due: Yup.date()
    .typeError("Due Date must be a valid date")
    .required("Due Date is a required field")
    .min(Yup.ref("start"), "Due Date must be after Start Date")
    .max(Yup.ref("end"), "Due Date must be before Due Date"),
});

export const markAsPaid = Yup.object().shape({
  id: Yup.string().required("ID is a required field"),
});
