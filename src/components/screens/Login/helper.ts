import * as yup from "yup";

export const validationSchema = yup.object({
  userName: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const URL_CALLBACK_X =
  "https://web3-common-service.polrare.co/api/auth/twitter/callback";
