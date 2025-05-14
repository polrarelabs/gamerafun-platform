import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useGetGameId } from "@store/game";
import LayoutModalReview from "./LayoutModalReview";
import LayoutAbout from "./LayoutAbout";
import { Image, Text } from "@components/shared";
const LayoutReview = () => {
  const { data, error, loading } = useGetGameId();
  return (
    <>
      <LayoutModalReview />
      <Stack>
        <Stack
          direction={"row"}
          my={4}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: 60, height: 60 }} src="/images/img-logo.png" />
            <Stack direction={"column"} spacing={1}>
              <Text fontSize={18} fontWeight={600}>
                Mostafa Salem
              </Text>
              <Text fontSize={16} fontWeight={400}>
                Head of Gaming Research
              </Text>
            </Stack>
          </Stack>
          <Text>Updated:06/09/2023 . Posted:15/10/2022</Text>
        </Stack>
        <Typography variant="h2" component="h2" gutterBottom sx={{ my: 2 }}>
          Introduce
        </Typography>
        <Typography variant="h2" component="h2" gutterBottom sx={{ my: 2 }}>
          GamePlay
        </Typography>
        <Image
          src="/images/Riftstorm_banner1_b0eb3c12c2.webp"
          alt="Riftstorm game banner"
          size="100%"
          containerProps={{
            sx: {
              height: "auto",
              width: "100%",
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
      </Stack>
      <LayoutAbout />
    </>
  );
};

export default LayoutReview;
