import { memo } from "react";
import { Stack, StackProps } from "@mui/material";

const PaperLayout = (props: StackProps) => {
  const { ...rest } = props;

  return <Stack bgcolor="background.paper" borderRadius={2} p={2} {...rest} />;
};

export default memo(PaperLayout);
