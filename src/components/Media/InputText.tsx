import { Stack, TextField } from "@mui/material";
import React, { memo } from "react";
import Text from "../shared/Text";
import { PropsInfo } from "@components/Media/UploadAvatar";

interface PropsIndexText {
  setData: React.Dispatch<React.SetStateAction<PropsInfo[]>>;
  id: number;
  data: PropsInfo[];
  name: string;
  title: string;
}

const InputText = ({ setData, id, data, name, title }: PropsIndexText) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const arr: PropsInfo[] = [...data];
    const arrId: PropsInfo = {
      ...arr[id],
      [name]: event.target.value,
    };
    arr[id] = arrId;
    setData(arr);
  };

  return (
    <Stack gap={1} direction={"column"} width={"100%"}>
      <Text>{title}</Text>
      <TextField
        fullWidth
        name={name}
        placeholder={`Enter ${name} here...`}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default memo(InputText);
