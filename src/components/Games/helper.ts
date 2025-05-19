import * as yup from "yup";
import dayjs from "dayjs";

export const validationSchema = yup.object({
  schedule: yup
    .object({
      alpha: yup.string().required("Alpha is required"),
      beta: yup.string().required("Beta is required"),
      release: yup.string().required("Release is required"),
    })
    .required("Date is required")
    .test(
      "alpha-beta-release",
      "Alpha, Beta, Release in order Alpha < Beta < Release",
      function (value) {
        const { alpha, beta, release } = value || {};
        if (!alpha || !beta || !release) return true;
        return (
          dayjs(alpha).isBefore(dayjs(beta)) &&
          dayjs(beta).isBefore(dayjs(release))
        );
      },
    ),
  name: yup.string().required("Name is required"),
});

export const WINDOW_URL = "https://github.com/x89-labs/be-base/actions";
export const MACOS_URL = "https://github.com/x89-labs/be-base/actions";
export const ANDROID_URL = "https://github.com/x89-labs/be-base/actions";
export const IOS_URL = "https://github.com/x89-labs/be-base/actions";

export const YOUTOBE_URL =
  "https://www.youtube.com/watch?v=pA31rxn3hYM&ab_channel=EndlessClouds";
