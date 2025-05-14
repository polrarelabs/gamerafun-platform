// import Link from "@components/Link";
import { Button, Image, Text } from "@components/shared";
import DiscordIcon from "@icons/DiscordIcon";
import FacebookIcon from "@icons/FacebookIcon";
import InstagramIcon from "@icons/InstagramIcon";
import TwitterIcon from "@icons/TwitterIcon";
import WebsiteIcon from "@icons/WebsiteIcon";
import YoutubeIcon from "@icons/YoutubeIcon";
import { Stack, Divider } from "@mui/material";
import { useGetGameId } from "@store/game";
import LayoutRelatedGames from "./LayoutRelatedGames";
import LayoutShare from "./LayoutShare";
import logoGame from "/public/images/img-logo.png";

const LayoutAbout = () => {
  const { data } = useGetGameId();
  return (
    <>
      <Stack my={4}>
        <Divider textAlign="left">ABOUT {data.name}</Divider>
      </Stack>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Stack direction={"column"} spacing={1}>
          <Text variant="body2">Studio</Text>
          <Text variant="h4">Multiverse</Text>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"column"} spacing={1}>
            <Text variant="body2">Website</Text>
            {/* <Link target="_blank" rel="noopener noreferrer"> */}
            <Text variant="h4">https://gam3s.gg/earth-from-another-sun/</Text>
            {/* </Link> */}
          </Stack>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Button
              sx={{
                backgroundColor: "grey[400]",
                borderColor: "white",
                borderRadius: "25%",
                width: "40px",
                height: "40px",
                "&:hover": {
                  backgroundColor: "grey[300]",
                },
              }}
            >
              <WebsiteIcon />
            </Button>

            <Button
              sx={{
                backgroundColor: "grey[400]",
                borderColor: "white",
                borderRadius: "25%",
                width: "40px",
                height: "40px",
                "&:hover": {
                  backgroundColor: "grey[300]",
                },
              }}
            >
              <TwitterIcon />
            </Button>
            <Button
              sx={{
                backgroundColor: "grey[400]",
                borderColor: "white",
                borderRadius: "25%",
                width: "40px",
                height: "40px",
                "&:hover": {
                  backgroundColor: "grey[300]",
                },
              }}
            >
              <DiscordIcon />
            </Button>
            <Button
              sx={{
                backgroundColor: "grey[400]",
                borderColor: "white",
                borderRadius: "25%",
                width: "40px",
                height: "40px",
                "&:hover": {
                  backgroundColor: "grey[300]",
                },
              }}
            >
              <InstagramIcon />
            </Button>
            <Button
              sx={{
                backgroundColor: "grey[400]",
                borderColor: "white",
                borderRadius: "25%",
                width: "40px",
                height: "40px",
                "&:hover": {
                  backgroundColor: "grey[300]",
                },
              }}
            >
              <YoutubeIcon />
            </Button>
            <Button
              sx={{
                backgroundColor: "grey[400]",
                borderColor: "white",
                borderRadius: "25%",
                width: "40px",
                height: "40px",
                "&:hover": {
                  backgroundColor: "grey[300]",
                },
              }}
            >
              <FacebookIcon />
            </Button>
          </Stack>
        </Stack>
        <Image
          src={logoGame}
          alt={`img-${logoGame}`}
          containerProps={{
            sx: {
              width: "100px",
              height: "100px",
              overflow: "hidden",
            },
          }}
        />
      </Stack>
      <LayoutShare />
      <LayoutRelatedGames />
    </>
  );
};

export default LayoutAbout;
