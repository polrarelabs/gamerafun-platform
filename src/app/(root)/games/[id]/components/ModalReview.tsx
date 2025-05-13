import DialogLayout from "@components/DialogLayout";
import { Button, Text } from "@components/shared";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { DialogContent, DialogTitle } from "@mui/material";
import { useCreateGameReview, useGetGameId } from "@store/game";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { use, useEffect } from "react";
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
    rating: yup.number().required("Rating là bắt buộc"),
  });
  const initialValues = {
    gameId: id,
    review: "",
    rating: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      // Call API to submit review
    },
  });
  // useEffect(() => {
  //   if (isCreate) {
  //     const gameId = Array.isArray(id) ? Number(id[0]) : Number(id);
  //     createGameReviews({ ...formik.values, gameId });
  //     setIsCreateReview(false);
  //   }
  // }, [id]);
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
        <Text textAlign={"left"} fontSize={"14px"} fontWeight={400}>
          Please describe what you liked or disliked about this game and whether
          you recommend it to others. Please remember to be polite and follow
          the Rules and Guidelines.
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <TextFieldFormik label="Your Review" name="review" formik={formik} />
          <Button color="primary" variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </DialogContent>
    </DialogLayout>
  );
};

export default ModalReview;
