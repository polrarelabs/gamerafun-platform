import {
  MenuItem,
  Select,
  Stack,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import React, { memo } from "react";
import Text from "../shared/Text";
import { PropsInfo } from "@components/Games/UploadAvatar";
import { MediaPosition } from "@constant/enum";

interface PropsIndexText {
  setData: React.Dispatch<React.SetStateAction<PropsInfo[]>>;
  id: number;
  data: PropsInfo[];
  name: string;
  title: string;
}

const SelectPosition = ({ setData, id, data, name, title }: PropsIndexText) => {
  const handleChange = (event: SelectChangeEvent<number>) => {
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
      <Select name={name} onChange={handleChange} defaultValue={1} fullWidth>
        <MenuItem value={"COVER"}>COVER</MenuItem>
        <MenuItem value={"TRAILER"}>TRAILER</MenuItem>
        <MenuItem value={"SCREENSHOT"}>SCREENSHOT</MenuItem>
      </Select>
    </Stack>
  );
};

export default memo(SelectPosition);
