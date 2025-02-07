import * as Yup from "yup";

export const create = Yup.object().shape({
  t_client_id: Yup.string().required(
    "Client ID is a required field"
  ),
  date: Yup.date()
    .typeError("Date must be a valid date")
    .required("Date is a required field"),
  voucher: Yup.string().required("Voucher is a required field"),
  check: Yup.string().required("Check is a required field"),
  particulars: Yup.string().required("Particulars is a required field"),
  type: Yup.string().required("Type is a required field"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .moreThan(-1, "Amount must be a positive number"),
  status: Yup.string().required("Status is a required field"),
  proof: Yup.mixed().required("Proof is a required field")
});

export const update = Yup.object().shape({
  id: Yup.string().required("ID is a required field"),
  t_client_id: Yup.string().required(
    "Client ID is a required field"
  ),
  date: Yup.date()
    .typeError("Date must be a valid date")
    .required("Date is a required field"),
  voucher: Yup.string().required("Voucher is a required field"),
  check: Yup.string().required("Check is a required field"),
  particulars: Yup.string().required("Particulars is a required field"),
  type: Yup.string().required("Type is a required field"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .moreThan(-1, "Amount must be a positive number"),
  status: Yup.string().required("Status is a required field"),
  proof: Yup.mixed().nullable()
});

export const setStatus = Yup.object().shape({
  id: Yup.string().required("ID is a required field"),
  status: Yup.string().required("Status is a required field"),
});
