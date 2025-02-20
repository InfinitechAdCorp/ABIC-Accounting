import * as Yup from "yup";

export const login = Yup.object().shape({
  username: Yup.string().trim().required("Username is a required field"),
  password: Yup.string().trim().required("Password is a required field"),
});

export const destroy = Yup.object().shape({
  id: Yup.string().trim().required("ID is a required field"),
  otp: Yup.string().trim().required("OTP is a required field"),
});

export const exportAsPDF = Yup.object().shape({
  range: Yup.object().shape({
    start: Yup.date()
      .typeError("Start Date must be a valid date")
      .required("Start Date is a required field"),
    end: Yup.date()
      .typeError("End Date must be a valid date")
      .required("End Date is a required field"),
  }),
});

export const filter = Yup.object().shape({
  range: Yup.object().shape({
    start: Yup.date()
      .typeError("Start Date must be a valid date")
      .required("Start Date is a required field"),
    end: Yup.date()
      .typeError("End Date must be a valid date")
      .required("End Date is a required field"),
  }),
});
