import { memo, useEffect, useMemo, useState } from "react";
import { alertClasses, Alert as MuiAlert, Stack } from "@mui/material";
import CloseIcon from "@icons/common/CloseIcon";
import { SnackbarItem, useSnackbar } from "@store/app";
import { typography } from "public/material";
import { IconButton, Text } from "@components/shared";
import useNow from "@hooks/useNow";

const Alert = (props: SnackbarItem) => {
  const {
    severity = "info",
    content = "",
    message,
    expiredIn = 5000,
    id,
  } = props;

  const [expired, setExpired] = useState<number>(expiredIn);
  const timeout = useMemo(() => expiredIn / 100, [expiredIn]);

  const { onRemoveSnackbar } = useSnackbar();

  const onRemove = () => {
    onRemoveSnackbar(id);
  };

  useEffect(() => {
    if (expired < 0) {
      onRemoveSnackbar(id);
    }
  }, [expired, id, onRemoveSnackbar]);

  useEffect(() => {
    const interval = setInterval(() => {
      setExpired((prevExpired) => prevExpired - timeout);
    }, timeout);
    return () => {
      clearTimeout(interval);
    };
  }, [expiredIn, timeout]);

  return (
    <MuiAlert
      severity={severity}
      sx={{
        minWidth: 350,
        maxWidth: 420,
        bgcolor: `${severity}.dark`,
        position: "relative",
        overflow: "hidden",
        "&:after": {
          position: "absolute",
          content: "''",
          width: `${(expired * 100) / expiredIn}%`,
          height: 4,
          bgcolor: `${severity}.light`,
          transition: `width 0.15s`,
          left: 0,
          top: 0,
        },
        ...typography.subtitle2,
        [`& .${alertClasses.icon}`]: {
          py: 1,
        },
        [`& .${alertClasses.action}`]: {
          py: 1,
        },
        [`& .${alertClasses.message}`]: {
          color: "common.white",
          pt: 0.5,
        },
      }}
      variant="outlined"
      action={
        <IconButton noPadding aria-label="close" onClick={onRemove}>
          <CloseIcon fontSize="small" sx={{ color: "common.white" }} />
        </IconButton>
      }
    >
      <Stack width="100%">
        <Text
          sx={{ wordBreak: "break-word" }}
          variant="subtitle2"
          color="common.white"
        >
          {message}
        </Text>
        <Text variant="body2" sx={{ wordBreak: "break-word" }} color="#F4EFEF">
          {content}
        </Text>
      </Stack>
    </MuiAlert>
  );
};

export default memo(Alert);
