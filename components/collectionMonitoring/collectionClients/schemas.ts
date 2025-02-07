import * as Yup from "yup";

export const create = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
});

export const update = Yup.object().shape({
  id: Yup.string().required("ID is a required field"),
  name: Yup.string().required("Name is a required field"),
});
