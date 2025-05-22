"use client";

import InputText from "@components/Media/InputText";
import SelectPosition from "@components/Media/SelectPosition";
import { Image } from "@components/shared";
import EyeIcon from "@icons/common/EyeIcon";
import { Dialog, Stack } from "@mui/material";
import React, { useState } from "react";
import { PropsInfo } from "../UploadAvatar";
import TrashIcon from "@icons/common/TrashIcon";
import { palette } from "public/material";

interface PropsInfoInmage {
  data: PropsInfo;
  id: number;
  setDataList: React.Dispatch<React.SetStateAction<PropsInfo[]>>;
  dataList: PropsInfo[];
}

const InfoImage = ({ data, id, setDataList, dataList }: PropsInfoInmage) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [hover, setHover] = useState<boolean>(false);
  const handleDelete = () => {
    dataList.splice(id, 1);
  };

  const IconAction = [
    {
      ICON: EyeIcon,
      onClick: handleClickOpen,
    },
    {
      ICON: TrashIcon,
      onClick: handleDelete,
    },
  ];

  return (
    <Stack direction={"row"} alignItems={"center"} gap={2} width={"100%"}>
      <Stack
        position={"relative"}
        sx={{
          borderRadius: "8px",
          width: 150,
          height: 100,
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src={URL.createObjectURL(data.file)}
          alt="preview"
          size="100%"
          aspectRatio={3 / 2}
          sizes="960px"
          containerProps={{
            sx: {
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: "8px",
              "& img": {
                objectFit: "cover",
                objectPosition: "center",
              },
            },
          }}
        />
        <Stack
          position={"absolute"}
          left={"50%"}
          sx={{
            translate: "-50% -50%",
          }}
          bottom={-2}
          direction={"row"}
          gap={2}
          alignItems={"center"}
        >
          {IconAction.map(({ ICON, onClick }, index) => {
            return (
              <ICON
                key={index}
                sx={{
                  color: hover ? palette.colorIconHover : palette.colorIcon,
                  fontSize: 20,
                  height: 20,
                  width: 20,
                  borderRadius: 1000,
                  "&:hover": {
                    color: "black",
                    backgroundColor: palette.colorBgHover,
                  },
                }}
                onClick={onClick}
              />
            );
          })}
        </Stack>
      </Stack>
      <InputText
        id={id}
        setData={setDataList}
        data={dataList}
        name="name"
        title="Name"
      />
      <InputText
        id={id}
        setData={setDataList}
        data={dataList}
        name="description"
        title="Description"
      />
      <SelectPosition
        id={id}
        setData={setDataList}
        data={dataList}
        name="position"
        title="Position"
      />
      <Dialog fullWidth open={open} onClose={handleClose} maxWidth={"xl"}>
        <Stack
          sx={{
            borderRadius: "8px",
            width: data.widthImg,
            height: data.heightImg,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          onClick={handleClickOpen}
        >
          <Image
            src={URL.createObjectURL(data.file)}
            alt="preview"
            size="100%"
            aspectRatio={3 / 2}
            sizes="960px"
            containerProps={{
              sx: {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "8px",
                "& img": {
                  objectFit: "cover",
                  objectPosition: "center",
                },
              },
            }}
          />
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default InfoImage;
