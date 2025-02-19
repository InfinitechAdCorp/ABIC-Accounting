import * as Yup from "yup";

const rules = {
  name: Yup.string().trim().required("Name is a required field"),
};

export const create = Yup.object().shape({
  ...rules,
});

export const update = Yup.object().shape({
  ...rules,
  id: Yup.string().trim().required("ID is a required field"),
});
