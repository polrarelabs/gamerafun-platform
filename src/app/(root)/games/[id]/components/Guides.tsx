import { Avatar, Box, Stack } from "@mui/material";
import CreateReview from "./CreateReview";
import { Image, Text } from "@components/shared";
import bgSlider from "public/images/banner.webp";
import About from "./About";
const Guides = () => {
  return (
    <>
      <CreateReview />
      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          my: 2,
        }}
      >
        <Box
          sx={{
            width: "200px",
            height: "200px",
            overflow: "hidden",
            borderRadius: "16px",
            border: "1px",
            borderColor:
              "linear-gradient(180deg,rgba(189, 189, 189, 1) 0%, rgba(87, 87, 87, 0.5) 100%)",
          }}
        >
          <Image
            src={bgSlider}
            alt={`img - ${bgSlider}`}
            containerProps={{
              sx: {
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
        </Box>
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
      <About />
    </>
  );
};
export default Guides;
