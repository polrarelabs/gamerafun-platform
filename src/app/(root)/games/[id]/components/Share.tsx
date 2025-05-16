import { Button, Image, Text } from "@components/shared";
import WindowsIcon from "@icons/WindowsIcon";
import { Box, Stack } from "@mui/material";
import logoGame from "public/images/img-logo.png";
import { useState } from "react";
import ModalShare from "./ModalShare";
import { useGetGameId } from "@store/game";
import GetIconPlatfrom from "../../components/GetIconPlatfrom";

const Share = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data } = useGetGameId();
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
  interface InformationGame {
    label: string;
    value: React.ReactNode;
  }

  const informationGames: InformationGame[] = [
    {
      label: "Developer",
      value: <Text variant="h5">{data.developer}</Text>,
    },
    {
      label: "Networks",
      value: (
        <Image
          src={logoGame}
          alt={`img-${logoGame}`}
          width={24}
          height={24}
          containerProps={{
            overflow: "hidden",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      label: "Status",
      value: <Text variant="h5">{data.status}</Text>,
    },
    {
      label: "Platform",
      value: <GetIconPlatfrom array={data.platform} />,
    },
  ];
  return (
    <Stack
      direction={"column"}
      spacing={2}
      gap={2}
      sx={{
        backgroundColor: "#151c29",
        borderRadius: "16px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        my: 4,
        p: 4,
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
      {data.description ? (
        <Text variant="body2">{data.description}</Text>
      ) : (
        <Text variant="body2">Description game</Text>
      )}
      {data?.genre?.map((item, index) => (
        <Button
          key={index}
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
          {item}
        </Button>
      ))}
      <Stack px={2} gap={2}>
        {informationGames.map((item, idx) => (
          <Stack
            key={idx}
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Text variant="subtitle1">{item.label}</Text>
            <hr style={style} />
            {item.value}
          </Stack>
        ))}
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
    </Stack>
  );
};

export default Share;
