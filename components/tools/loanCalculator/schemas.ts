import * as Yup from "yup";

export const calculate = {
  amount: Yup.number()
    .typeError("Amount must be a number")
    .moreThan(-1, "Amount must be a positive number"),
  years: Yup.number()
    .typeError("Years must be a number")
    .moreThan(-1, "Years must be a positive number"),
  months: Yup.number()
    .typeError("Months must be a number")
    .moreThan(-1, "Months must be a positive number"),
  rate: Yup.number()
    .typeError("Rate must be a number")
    .moreThan(-1, "Rate must be a positive number"),
};
