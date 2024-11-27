import * as Yup from "yup";

export const addClientSchema = Yup.object().shape({
  name: Yup.string().required().min(5),
});
