import InputText from "@components/Media/InputText";
import SelectPosition from "@components/Media/SelectPosition";
import { Image } from "@components/shared";
import EyeIcon from "@icons/EyeIcon";
import { Dialog, Stack } from "@mui/material";
import React, { useState } from "react";
import { PropsInfo } from "./UploadAvarta";
import TrashIcon from "@icons/TrashIcon";

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
          <EyeIcon
            sx={{
              color: hover ? "#989898" : "#A8A8A8",
              fontSize: 20,
              height: 20,
              width: 20,
              borderRadius: 1000,
              "&:hover": {
                color: "black",
                backgroundColor: "#DCDCDC",
              },
            }}
            onClick={handleClickOpen}
          />
          <TrashIcon
            sx={{
              color: hover ? "#989898" : "#A8A8A8",
              fontSize: 20,
              "&:hover": {
                color: "black",
              },
            }}
            onClick={handleDelete}
          />
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
