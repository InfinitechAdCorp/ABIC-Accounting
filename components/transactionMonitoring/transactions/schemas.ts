import * as Yup from "yup";

export const create = Yup.object().shape({
  date: Yup.date().required(),
  voucher: Yup.string().required(),
  check: Yup.string().required(),
  account_id: Yup.string().required(),
  particulars: Yup.string().required(),
  type: Yup.string().required(),
  amount: Yup.number().moreThan(-1),
});

export const update = Yup.object().shape({
  id: Yup.string().required(),
  date: Yup.date().required(),
  voucher: Yup.string().required(),
  check: Yup.string().required(),
  account_id: Yup.string().required(),
  particulars: Yup.string().required(),
  type: Yup.string().required(),
  amount: Yup.number().moreThan(-1),
});
