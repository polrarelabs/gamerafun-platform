import { Avatar, Stack } from "@mui/material";
import LayoutModalReview from "./LayoutModalReview";
import { Image, Text } from "@components/shared";
import bgSlider from "public/images/Riftstorm_banner1_b0eb3c12c2.webp";
import LayoutAbout from "./LayoutAbout";
const LayoutGuides = () => {
  return (
    <>
      <LayoutModalReview />
      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          my: 2,
        }}
      >
        <Image
          src={bgSlider}
          alt={`img - ${bgSlider}`}
          containerProps={{
            sx: {
              height: "auto",
              width: "200px",
              overflow: "hidden",
              borderRadius: "16px",
              border: "1px",
              borderColor:
                "linear-gradient(180deg,rgba(189, 189, 189, 1) 0%, rgba(87, 87, 87, 0.5) 100%)",
              "& img": {
                objectFit: "cover",
                objectPosition: "center",
                transition: "all 0.5s ease-in-out",
              },
            },
          }}
        />
        <Stack direction={"column"} spacing={1}>
          <Text fontSize={18} fontWeight={600}>
            Mostafa Salem
          </Text>
          <Text fontSize={16} fontWeight={400}>
            Head of Gaming Research
          </Text>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: 36, height: 36 }} src="/images/img-logo.png" />
            <Stack direction={"column"} spacing={1}>
              <Text fontSize={18} fontWeight={600}>
                Larc
              </Text>
              <Text fontSize={16} fontWeight={400}>
                Content Writer
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <LayoutAbout />
    </>
  );
};
export default LayoutGuides;
