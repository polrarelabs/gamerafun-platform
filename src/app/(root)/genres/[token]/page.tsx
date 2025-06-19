import {
  GenresDetail,
  GenresDetailBreadcumb,
} from "@components/screens/genre-detail";
import { Stack } from "@mui/material";
import { memo } from "react";

const GenresDetails = () => {
  return (
    <Stack py={4} direction={"column"} gap={4}>
      <GenresDetailBreadcumb />
      <GenresDetail />
    </Stack>
  );
};

export default memo(GenresDetails);
