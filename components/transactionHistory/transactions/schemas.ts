import * as Yup from "yup";

const rules = {
  t_client_id: Yup.string().trim().required("Client ID is a required field"),
  date: Yup.date()
    .typeError("Date must be a valid date")
    .required("Date is a required field"),
  voucher: Yup.string().trim().nullable(),
  check: Yup.string().trim().nullable(),
  particulars: Yup.string().trim().required("Particulars is a required field"),
  type: Yup.string().trim().required("Type is a required field"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .moreThan(-1, "Amount must be a positive number"),
  status: Yup.string().trim().required("Status is a required field"),
  proof: Yup.mixed().nullable(),
};

export const create = Yup.object().shape({
  ...rules,
});

export const update = Yup.object().shape({
  ...rules,
  id: Yup.string().trim().required("ID is a required field"),
});

export const setStatus = Yup.object().shape({
  id: Yup.string().trim().required("ID is a required field"),
  status: Yup.string().trim().required("Status is a required field"),
});
