import { Stack, Box } from "@mui/material";
import CreateReview from "./CreateReview";
import { Button, Image, Text } from "@components/shared";
import bgSlider from "public/images/banner.webp";
import About from "./About";

const News = () => {
  return (
    <>
      <CreateReview />
      <Stack
        direction={"row"}
        spacing={2}
        gap={2}
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
          <Text fontSize={16} fontWeight={400}>
            4 DAYS AGO . 4 MIN READ
          </Text>
          <Text fontSize={18} fontWeight={600}>
            Best 5 NFT Games of May 2025
          </Text>
          <Text fontSize={16} fontWeight={400}>
            Explore the top five web3 games launching or updating in May 2025,
            including MapleStory N, Treeverse, and KAI Battle of Three Kingdoms,
            with blockchain features and cross-platform support.
          </Text>
          <Button
            variant="contained"
            sx={{
              p: 2,
              borderRadius: "8px !important",
              width: "fit-content !important",
              height: "40px !impornt",
              color: "#7dffac !important",
              background:
                "color-mix(in srgb, #33F57A, transparent 85%) !important",
              "&:hover": {
                color: "black !important",
                background: " #7dffac !important",
              },
            }}
            size={"small"}
          >
            BEST OF
          </Button>
        </Stack>
      </Stack>
      <About />
    </>
  );
};
export default News;
