import * as Yup from "yup";

export const create = Yup.object().shape({
  client_id: Yup.string().required(),
  property: Yup.string().required(),
  location: Yup.string().required(),
  start: Yup.date().required(),
  end: Yup.date().required().min(Yup.ref("start")),
  advance: Yup.number().moreThan(-1),
  deposit: Yup.number().moreThan(-1),
  tenant_price: Yup.number().moreThan(-1),
  owner_income: Yup.number().moreThan(-1),
  abic_income: Yup.number().moreThan(-1),
  due: Yup.date().required().min(Yup.ref("start")).max(Yup.ref("end")),
});

export const update = Yup.object().shape({
  id: Yup.string().required(),
  client_id: Yup.string().required(),
  property: Yup.string().required(),
  location: Yup.string().required(),
  start: Yup.date().required(),
  end: Yup.date().required().min(Yup.ref("start")),
  advance: Yup.number().moreThan(-1),
  deposit: Yup.number().moreThan(-1),
  tenant_price: Yup.number().moreThan(-1),
  owner_income: Yup.number().moreThan(-1),
  abic_income: Yup.number().moreThan(-1),
  due: Yup.date().required().min(Yup.ref("start")).max(Yup.ref("end")),
});

export const markAsPaid = Yup.object().shape({
  id: Yup.string().required(),
});
