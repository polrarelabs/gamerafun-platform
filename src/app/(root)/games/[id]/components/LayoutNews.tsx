import { Stack } from "@mui/material";
import LayoutModalReview from "./LayoutModalReview";
import { Button, Image, Text } from "@components/shared";
import bgSlider from "public/images/banner.webp";
import LayoutAbout from "./LayoutAbout";

const LayoutNews = () => {
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
          <Button color="primary" variant="contained">
            BEST OF
          </Button>
        </Stack>
      </Stack>
      <LayoutAbout />
    </>
  );
};
export default LayoutNews;
