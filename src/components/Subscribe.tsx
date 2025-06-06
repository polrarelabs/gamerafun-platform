"use client";

import { Button, Text, TextField } from "@components/shared";
import { SCREEN_PX } from "@constant";
import { InputAdornment, Stack } from "@mui/material";
import { palette } from "public/material";
import { memo, useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <Stack py={4} flex={1} width={"100%"}>
      <Stack
        direction={{ sm: "row", xs: "column" }}
        justifyContent={{ md: "space-between" }}
        alignItems={{ md: "center" }}
        gap={1}
        border={`1px solid ${palette.colorRelate?.bgColorSub}`}
        p={{ md: "56px 40px", xs: "40px 28px" }}
        bgcolor={palette.colorRelate?.bgColorSub}
        borderRadius={"5px"}
        flex={1}
      >
        <Stack
          direction={"column"}
          gap={1}
          width={{ lg: "30%", md: "40%", sm: "50%", xs: "100%" }}
        >
          <Text
            color={palette.greenColorText}
            fontSize={"16px"}
            textAlign={{ xs: "center", sm: "start" }}
          >
            Keep up with the GAM3 scene
          </Text>
          <Text
            color={"white"}
            fontSize={"24px"}
            fontWeight={700}
            textAlign={{ xs: "center", sm: "start" }}
            sx={{
              textShadow: palette.colorRelate?.textShadow,
            }}
          >
            Sign up for our newsletter and get the latest news and updates.
          </Text>
        </Stack>
        <Stack
          width={{ lg: "25%", md: "35%", sm: "45%", xs: "100%" }}
          justifyContent={"center"}
        >
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  sx={{
                    background: `${palette.colorGame?.colorBtnNew} !important`,
                    color: "black !important",
                    "&:hover": {
                      background: `${palette.colorGame?.btnChat} !important`,
                    },
                    borderRadius: "5px !important",
                    padding: "12px 24px !important",
                    fontWeight: `${700} !important`,
                  }}
                >
                  Subscribe
                </Button>
              </InputAdornment>
            }
            placeholder={`Email Address`}
            sx={{
              height: "68px",
              background: `${palette.colorRelate?.colorBtn} !important`,
              border: `1px solid ${palette.colorRelate?.bgColorSub} !important`,
              "&:hover": {
                border: `1px solid ${palette.colorGame?.colorBtnNew} !important`,
              },
              "&:active": {
                border: `1px solid ${palette.colorGame?.colorBtnNew} !important`,
              },
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(Subscribe);
