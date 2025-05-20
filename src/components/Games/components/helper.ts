import * as yup from "yup";

export const GetColor = (value: number) => {
  const percent = value / 10;
  const colorStops = [
    { stop: 0, color: [184, 84, 85] },
    { stop: 0.5, color: [229, 155, 44] },
    { stop: 1, color: [1, 183, 98] },
  ];

  let start = colorStops[0];
  let end = colorStops[1];

  for (let i = 0; i < colorStops.length - 1; i++) {
    if (percent >= colorStops[i].stop && percent <= colorStops[i + 1].stop) {
      start = colorStops[i];
      end = colorStops[i + 1];
      break;
    }
  }

  const range = end.stop - start.stop;
  const factor = (percent - start.stop) / range;

  const interpolated = start.color.map((startVal, i) =>
    Math.round(startVal + (end.color[i] - startVal) * factor),
  );

  return `rgb(${interpolated.join(",")})`;
};

export const ValidationSchema = yup.object({
  review: yup
    .string()
    .required("Review is required")
    .min(30, "Review minimun 30 characters")
    .max(500, "Review maximun 500 characters"),
  scroce: yup.number().required("Rating is required"),
});

export const YOUR_URL = "https://gam3s.gg/earth-from-another-sun/";
