"use client";

import { memo, ReactNode } from "react";
import {
  Dialog,
  dialogClasses,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  DialogTitleProps,
  Stack,
  StackProps,
  SxProps,
} from "@mui/material";

export type DialogLayoutProps = {
  headerProps?: DialogTitleProps & StackProps;
  contentProps?: DialogContentProps & StackProps;
  renderHeader?: ReactNode;
  paperSx?: SxProps;
  widthDialog?: number;
  onClose: () => void;
} & Omit<DialogProps, "onClose">;

const DialogLayout = (props: DialogLayoutProps) => {
  const {
    renderHeader,
    headerProps,
    contentProps,
    children,
    paperSx,
    sx,
    onClose: onCloseProp,
    widthDialog,
    ...rest
  } = props;

  // const onClose = (_: {}, reason: "backdropClick" | "escapeKeyDown") => {
  //   if (onCloseProp && reason !== "backdropClick") {
  //     onCloseProp();
  //   }
  // };

  const onClose = (_: {}, _reason: "backdropClick" | "escapeKeyDown") => {
    if (onCloseProp) {
      onCloseProp();
    }
  };

  return (
    <Dialog
      disableScrollLock
      scroll="paper"
      sx={{
        [`& .${dialogClasses.paper}`]: {
          position: "relative",
          maxWidth: widthDialog ? widthDialog : 960,
          width: "100%",
          backgroundImage: "none",
          bgcolor: "background.paper",
          ...paperSx,
        },
        ...sx,
      }}
      onClose={onClose}
      {...rest}
    >
      {!!renderHeader && (
        <DialogTitle component={Stack} {...headerProps}>
          {renderHeader}
        </DialogTitle>
      )}
      <DialogContent {...contentProps}>{children}</DialogContent>
    </Dialog>
  );
};

export default memo(DialogLayout);
