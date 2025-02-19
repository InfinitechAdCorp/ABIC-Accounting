import * as Yup from "yup";

const aRRules = {
  number: Yup.string().trim().required("AR Number is a required field"),
};

export const createAR = Yup.object().shape({
  ...aRRules,
});

const bSRules = {
  number: Yup.string().trim().required("AR Number is a required field"),
};

export const createBS = Yup.object().shape({
  ...bSRules,
});
