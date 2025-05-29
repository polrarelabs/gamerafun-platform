"use client";
import { Avatar } from "@mui/material";
import React, { memo } from "react";

interface AvatarsProps {
  src?: string;
}

const Avatars = () => {
  return (
    <Avatar
      // alt="Remy Sharp"
      // src="/static/images/avatar/1.jpg"
      sx={{ width: 56, height: 56 }}
    />
  );
};

export default memo(Avatars);
