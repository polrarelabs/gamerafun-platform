import DialogLayout from "@components/DialogLayout";
import { Button, Text } from "@components/shared";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { Box, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useCreateGameReview, useGetGameId } from "@store/game";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import * as yup from "yup";
interface PropsModalReview {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalReview = ({ open, setOpen }: PropsModalReview) => {
  const { id } = useParams();
  const { isCreate, setIsCreateReview, createGameReviews } =
    useCreateGameReview();
  const { data } = useGetGameId();
  const ValidationSchema = yup.object({
    review: yup
      .string()
      .required("Review là bắt buộc")
      .min(30, "Review tối thiểu 30 ký tự")
      .max(500, "Review tối đa 500 ký tự"),
    scroce: yup.number().required("Rating là bắt buộc"),
  });
  const initialValues = {
    gameId: Array.isArray(id) ? Number(id[0]) : Number(id),
    review: "",
    scroce: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      createGameReviews(values);
    },
  });
  const handleSelect = (num: number) => {
    formik.setFieldValue("scroce", num);
  };

  useEffect(() => {
    if (isCreate) {
      setIsCreateReview();
      setOpen(false);
      formik.resetForm();
    }
  }, [isCreate]);

  return (
    <DialogLayout
      open={open}
      onClose={() => setOpen(false)}
      sx={{ width: "50%", mx: "auto" }}
    >
      <DialogTitle marginBottom={4}>
        <Text textAlign={"left"} fontSize={"20px"} fontWeight={700}>
          Write a review for {data.name}
        </Text>
      </DialogTitle>
      <DialogContent>
        <Text
          textAlign={"left"}
          fontSize={"14px"}
          fontWeight={400}
          sx={{
            marginTop: "5px !important",
          }}
        >
          Please describe what you liked or disliked about this game and whether
          you recommend it to others. Please remember to be polite and follow
          the Rules and Guidelines.
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <TextFieldFormik label="Your Review" name="review" formik={formik} />
          <Box display="flex" alignItems="center" gap={2} mt={2} mb={2}>
            <Typography>Choose a rating:</Typography>
            <Box display="flex" gap={1}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <Button
                  key={num}
                  variant="contained"
                  onClick={() => handleSelect(num)}
                  sx={{
                    minWidth: 40,
                    height: 40,
                    backgroundColor:
                      formik.values.scroce === num ? "green" : "transparent",
                    color: formik.values.scroce === num ? "#fff" : "#ccc",
                    border: "1px solid #555",
                    "&:hover": {
                      backgroundColor:
                        formik.values.scroce === num ? "pink" : "#333",
                    },
                  }}
                >
                  {num}
                </Button>
              ))}
            </Box>
          </Box>
          {formik.touched.scroce && formik.errors.scroce && (
            <Typography color="error" fontSize={12} mb={1}>
              {formik.errors.scroce}
            </Typography>
          )}
          <Button color="primary" variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </DialogContent>
    </DialogLayout>
  );
};

export default ModalReview;
