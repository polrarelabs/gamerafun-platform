"use client";

import { Text } from "@components/shared";
import SearchIcon from "@icons/SearchIcon";
import { InputBase, OutlinedInput, Stack } from "@mui/material";
import React from "react";

const BrowserGame = () => {
  return (
    <Stack direction="row" gap={2}>
      <Stack direction={"column"} gap={2} flex={4}>
        {/* <Stack>
                    <Text
                        color='white'
                        fontSize={'20px'}
                        fontWeight={700}
                    >
                        Browse Games
                    </Text>
                </Stack>
                <Stack
                    p={2}
                    borderRadius={'6px'}
                    width={'226px'}
                    bgcolor={'#2456'}
                >
                    <Stack
                        sx={{
                            bgcolor: '#546744',
                            aspectRatio: 1,
                            width: '100%',
                            borderRadius: '6px'
                        }}
                    />
                    <Stack>
                        <Text
                            color='white'

                        >
                            Title
                        </Text>
                    </Stack>
                </Stack> */}
      </Stack>
      <Stack direction={"column"} gap={2} flex={1}>
        <InputBase
          placeholder="Please enter text"
          startAdornment={
            <SearchIcon
              sx={{
                height: 20,
                width: 20,
                mr: 1,
              }}
            />
          }
          sx={{
            border: "none !important",
            backgroundColor: "#1f2937",
            padding: "8px 16px",
            borderRadius: "6px",
          }}
        />
        <Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text color="white" fontSize={"16px"} fontWeight={500}>
              Platform
            </Text>
            <Text>Show More</Text>
          </Stack>
          <Stack direction={"column"} gap={2}>
            {}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BrowserGame;
