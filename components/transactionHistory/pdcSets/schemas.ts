import * as Yup from "yup";

const rules = {
  name: Yup.string().trim().required("Name is a required field"),
  pay_to: Yup.string().trim().required("Pay To is a required field"),
  start: Yup.date()
    .typeError("Start Date must be a valid date")
    .required("Start Date is a required field")
    .min(new Date(), "Start Date must be a future date"),
  end: Yup.date()
    .typeError("End Date must be a valid date")
    .required("End Date is a required field")
    .min(Yup.ref("start"), "End Date must be after Start Date"),
  check_number: Yup.string()
    .trim()
    .required("Check Number is a required field"),
  type: Yup.string().trim().required("Type is a required field"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .moreThan(-1, "Amount must be a positive number"),
};

export const create = Yup.object().shape({
  ...rules,
});
