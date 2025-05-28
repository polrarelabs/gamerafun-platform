"use client";

import { Button, Image, Text } from "@components/shared";
import { Stack } from "@mui/material";
import logoGame from "public/images/img-logo.png";
import { memo, useState } from "react";
import ModalShare from "./ModalShare";
import GetIcon from "./GetIcon";
import { palette } from "public/material";
import { useGame } from "@store/game";

const Share = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { gameById } = useGame();
  const handleClickModalShare = () => {
    setIsOpen(true);
  };
  const style = {
    width: "100%",
    borderStyle: "dotted",
    borderWidth: "1px 0 0 0",
    borderColor: palette.colorReview?.color,
    margin: 0,
  };
  interface InformationGame {
    label: string;
    value: React.ReactNode;
  }

  const informationGames: InformationGame[] = [
    {
      label: "Developer",
      value: <Text variant="h5">{gameById.developer}</Text>,
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
      value: <Text variant="h5">{gameById.status}</Text>,
    },
    {
      label: "Platform",
      value: <GetIcon array={gameById.support_os} />,
    },
  ];
  return (
    <Stack
      direction={"column"}
      spacing={2}
      gap={2}
      sx={{
        backgroundColor: palette.colorReview?.bgColor1,
        borderRadius: "16px",
        boxShadow: "0px 4px 4px black",
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
      {gameById.description ? (
        <Text variant="body2">{gameById.description}</Text>
      ) : (
        <Text variant="body2">Description game</Text>
      )}
      {gameById &&
        gameById.genreName &&
        gameById.genreName.map((item, index) => (
          <Button
            key={index}
            variant="contained"
            sx={{
              p: 2,
              borderRadius: "8px !important",
              width: "fit-content !important",
              height: "40px !impornt",
              color: `${palette.greenColorText} !important`,
              background: palette.greenColorButton,
              "&:hover": {
                color: "black !important",
                background: `${palette.greenColorText} !important`,
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
          color: `${palette.colorTextGray} !important`,
          background: `${palette.colorBgGray} !important`,
          "&:hover": {
            color: "black !important",
            background: `${palette.colorTextGray} !important`,
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

export default memo(Share);
