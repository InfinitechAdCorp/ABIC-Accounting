import * as Yup from "yup";

const rules = {
  name: Yup.string().trim().required("Name is a required field"),
  pay_to: Yup.string().trim().required("Pay To is a required field"),
  start: Yup.date()
    .typeError("Start Date must be a valid date")
    .required("Start Date is a required field"),
  end: Yup.date()
    .typeError("End Date must be a valid date")
    .required("End Date is a required field"),
  check: Yup.string().trim().required("Check is a required field"),
  type: Yup.string().trim().required("Type is a required field"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .moreThan(-1, "Amount must be a positive number"),
};

export const create = Yup.object().shape({
  ...rules,
});
