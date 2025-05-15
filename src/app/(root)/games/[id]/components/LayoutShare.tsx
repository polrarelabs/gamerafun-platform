import { Button, Image, Text } from "@components/shared";
import WindowsIcon from "@icons/WindowsIcon";
import { Box, Stack } from "@mui/material";
import logoGame from "public/images/img-logo.png";
import { useState } from "react";
import ModalShare from "./ModalShare";

const LayoutShare = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClickModalShare = () => {
    setIsOpen(true);
  };
  const style = {
    width: "100%",
    borderStyle: "dotted",
    borderWidth: "1px 0 0 0",
    borderColor: "#ccc",
    margin: 0,
  };
  return (
    <Box
      sx={{
        BackgroundColor: "rgba(27, 35, 50, 0.5)",
        borderRadius: "16px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        my: 4,
      }}
    >
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
      <Text variant={"body2"}>Description Game </Text>
      <Button
        variant="contained"
        sx={{
          p: 2,
          borderRadius: "8px !important",
          height: "40px !important",
          color: "#7dffac !important",
          background: "color-mix(in srgb, #33F57A, transparent 85%) !important",
          "&:hover": {
            color: "black !important",
            background: " #7dffac !important",
          },
        }}
        size={"small"}
      >
        ADVENTURE
      </Button>
      <Stack padding={2}>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            my: 2,
          }}
        >
          <Text variant="subtitle1">Developer</Text>
          <hr style={style} />
          <Text variant="h5">Multiverse</Text>
        </Stack>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            my: 2,
          }}
        >
          <Text variant="subtitle1">Networks</Text>
          <hr style={style} />
          <Image
            src={logoGame}
            alt={`img-${logoGame}`}
            containerProps={{
              width: "36px",
              height: "36px",
              overflow: "hidden",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Stack>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            my: 2,
          }}
        >
          <Text variant="subtitle1">Status</Text>
          <hr style={style} />
          <Text variant="h5">Alpha</Text>
        </Stack>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            my: 2,
          }}
        >
          <Text variant="subtitle1">Networks</Text>
          <hr style={style} />
          <Button
            sx={{
              "&:hover": {
                translateY: "-0.125rem",
                animation: "0.25s ease-in-out",
                transition: "all 0.25s ease-in-out",
              },
            }}
          >
            <WindowsIcon />{" "}
          </Button>
        </Stack>
      </Stack>
      <Button
        variant="contained"
        sx={{
          borderRadius: "8px !important",
          height: "40px !important",
          color: "rgb(172, 187, 204) !important",
          background: "rgba(152,170,192,0.16) !important",
          "&:hover": {
            color: "black !important",
            background: "rgb(172, 187, 204) !important",
          },
        }}
        size={"small"}
        fullWidth
        onClick={() => handleClickModalShare()}
      >
        Share
      </Button>
      <ModalShare open={isOpen} setOpen={setIsOpen} />
    </Box>
  );
};

export default LayoutShare;
