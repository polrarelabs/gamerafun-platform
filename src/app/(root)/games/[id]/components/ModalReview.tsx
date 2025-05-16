import DialogLayout from "@components/DialogLayout";
import { Button, Text } from "@components/shared";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import {
  Box,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Select,
} from "@mui/material";
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

  const handleCloseModalReview = () => {
    setOpen(false);
  };

  return (
    <DialogLayout
      open={open}
      onClose={handleCloseModalReview}
      sx={{ width: "70%", mx: "auto" }}
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
            <Typography
              sx={{
                minWidth: "100px",
              }}
            >
              Choose a rating:
            </Typography>
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
                      formik.values.scroce === num ? "green" : "#333",
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
          <Stack direction={"row"} gap={2} mt={2}>
            <Stack direction={"column"} gap={2}>
              <Text>Language</Text>
              <Select
                defaultValue="English"
                sx={{
                  width: "100%",
                  backgroundColor: "#333",
                  borderRadius: "8px",
                  "& .MuiSelect-select": {
                    padding: "10px",
                    color: "#fff",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#555",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#777",
                  },
                }}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Portuguese">Portuguese</option>
              </Select>
            </Stack>
            <Stack direction={"column"} gap={2}>
              <Text>I played this game for</Text>
              <Select
                defaultValue="0-1 hour"
                sx={{
                  width: "100%",
                  backgroundColor: "#333",
                  borderRadius: "8px",
                  "& .MuiSelect-select": {
                    padding: "10px",
                    color: "#fff",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#555",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#777",
                  },
                }}
              >
                <option value="0-1 hour">0-1 hour</option>
                <option value="1-5 hour">1-5 hour</option>
                <option value="5-20 hour">5-20 hour</option>
                <option value="20-50 hour">20-50 hour</option>
                <option value="50-100 hour">50-100 hour</option>
              </Select>
            </Stack>
          </Stack>
          <Button color="primary" variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </DialogContent>
    </DialogLayout>
  );
};

export default ModalReview;
