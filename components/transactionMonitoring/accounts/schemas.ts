import * as Yup from "yup";

export const create = Yup.object().shape({
  name: Yup.string().required(),
  starting_balance: Yup.number().moreThan(-1),
});

export const update = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
  starting_balance: Yup.number().moreThan(-1),
});
