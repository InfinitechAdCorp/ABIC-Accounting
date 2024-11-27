import * as Yup from "yup";

export const create = Yup.object().shape({
  name: Yup.string().required(),
});

export const update = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
});

export const destroy = Yup.object().shape({
  id: Yup.string().required(),
});