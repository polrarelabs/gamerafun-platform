/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar } from "@mui/material";
import React, { memo } from "react";

interface AvatarsProps {
  src?: string;
  sx?: any;
}

const Avatars = ({ src, sx }: AvatarsProps) => {
  return (
    <Avatar
      alt={`${src}/avatar`}
      src={src}
      sx={{
        width: 56,
        height: 56,
        ...sx,
      }}
    />
  );
};

export default memo(Avatars);
