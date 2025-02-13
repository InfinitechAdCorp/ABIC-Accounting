import * as Yup from "yup";

export const convert = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount must be a number")
    .moreThan(-1, "Amount must be a positive number"),
  fromCurrency: Yup.string().required("Currency From is a required field"),
  toCurrency: Yup.string().required("Currency To is a required field"),
});
