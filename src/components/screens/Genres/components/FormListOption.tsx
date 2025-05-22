/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Text } from "@components/shared";
import { Stack } from "@mui/material";
import { PlatformProps } from "@store/game";
import React, { memo, useEffect, useState } from "react";
import { HandleClickOption } from "./helper";
import CircleCheckIcon from "@icons/common/CircleCheckIcon";
import { palette } from "public/material";

interface PropForm {
  data: any | null;
  arrayKey: any[];
  setArray: (arrayKey: any[]) => void;
  name: string;
  isValue?: boolean;
}

const FormListOption = ({
  data,
  arrayKey,
  setArray,
  name,
  isValue = true,
}: PropForm) => {
  const [arrKeys, setArrKeys] = useState<string[]>([]);
  const [arrValues, setArrValues] = useState<number[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const arrKeys: string[] = data ? Object.keys(data) : [];
    const arrValues: number[] = data ? Object.values(data) : [];
    setArrKeys(arrKeys);
    setArrValues(arrValues);
  }, [data]);

  return (
    <Stack direction={"column"} gap={1}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={2}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={1}
        >
          <Text color="white" fontSize={"16px"} fontWeight={500}>
            {name}
          </Text>
          {arrayKey.length > 0 && (
            <Stack
              sx={{
                backgroundColor: palette.greenColorButton,
                borderRadius: "10000px",
                height: 20,
                width: 20,
              }}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                color={palette.greenColor}
                fontWeight={600}
                fontSize={"12px"}
              >
                {arrayKey.length}
              </Text>
            </Stack>
          )}
        </Stack>
        {arrKeys.length > 5 && (
          <Text
            color={palette.greenColor}
            fontSize={"16px"}
            fontWeight={500}
            sx={{
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
            onClick={() => setShow(!show)}
          >
            {show ? "Show Less" : "Show More"}
          </Text>
        )}
      </Stack>
      {arrKeys.length > 5 ? (
        <Stack direction={"column"} gap={0.5}>
          {show ? (
            <>
              {arrKeys.map((_, index) => {
                return (
                  <Stack
                    key={index}
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    onClick={() =>
                      HandleClickOption(arrKeys[index], arrayKey, setArray)
                    }
                    sx={{
                      backgroundColor: arrayKey.includes(arrKeys[index])
                        ? palette.colorGame?.bgColor
                        : undefined,
                      "&:hover": {
                        backgroundColor: arrayKey.includes(arrKeys[index])
                          ? palette.colorGame?.bgColor
                          : palette.colorGame?.bgColorHover,
                      },
                      borderRadius: "8px",
                      px: 2,
                      height: 40,
                    }}
                  >
                    <Stack direction={"row"} alignItems={"center"} gap={2}>
                      <Text color={palette.colorGray} fontSize={"14px"}>
                        {arrKeys[index]}
                      </Text>
                      {isValue && (
                        <Text color={palette.colorGray} fontSize={"14px"}>
                          {arrValues[index]}
                        </Text>
                      )}
                    </Stack>
                    {arrayKey.includes(arrKeys[index]) && (
                      <CircleCheckIcon
                        sx={{
                          color: palette.greenColor,
                          fontSize: 16,
                        }}
                      />
                    )}
                  </Stack>
                );
              })}
            </>
          ) : (
            <>
              {arrKeys.map((_, index) => {
                if (index < 6) {
                  return (
                    <Stack
                      key={index}
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      onClick={() =>
                        HandleClickOption(arrKeys[index], arrayKey, setArray)
                      }
                      sx={{
                        backgroundColor: arrayKey.includes(arrKeys[index])
                          ? palette.colorGame?.bgColor
                          : undefined,
                        "&:hover": {
                          backgroundColor: arrayKey.includes(arrKeys[index])
                            ? palette.colorGame?.bgColor
                            : palette.colorGame?.bgColorHover,
                        },
                        borderRadius: "8px",
                        px: 2,
                        height: 40,
                      }}
                    >
                      <Stack direction={"row"} alignItems={"center"} gap={2}>
                        <Text color={palette.colorGray} fontSize={"14px"}>
                          {arrKeys[index]}
                        </Text>
                        {isValue && (
                          <Text color={palette.colorGray} fontSize={"14px"}>
                            {arrValues[index]}
                          </Text>
                        )}
                      </Stack>
                      {arrayKey.includes(arrKeys[index]) && (
                        <CircleCheckIcon
                          sx={{
                            color: palette.greenColor,
                            fontSize: 16,
                          }}
                        />
                      )}
                    </Stack>
                  );
                }
              })}
            </>
          )}
        </Stack>
      ) : (
        <Stack direction={"column"} gap={0.5}>
          {arrKeys.map((_, index) => {
            return (
              <Stack
                key={index}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                onClick={() =>
                  HandleClickOption(arrKeys[index], arrayKey, setArray)
                }
                sx={{
                  backgroundColor: arrayKey.includes(arrKeys[index])
                    ? palette.colorGame?.bgColor
                    : undefined,
                  "&:hover": {
                    backgroundColor: arrayKey.includes(arrKeys[index])
                      ? palette.colorGame?.bgColor
                      : palette.colorGame?.bgColorHover,
                  },
                  borderRadius: "8px",
                  px: 2,
                  height: 40,
                }}
              >
                <Stack direction={"row"} alignItems={"center"} gap={2}>
                  <Text color={palette.colorGray} fontSize={"14px"}>
                    {arrKeys[index]}
                  </Text>
                  {isValue && (
                    <Text color={palette.colorGray} fontSize={"14px"}>
                      {arrValues[index]}
                    </Text>
                  )}
                </Stack>
                {arrayKey.includes(arrKeys[index]) && (
                  <CircleCheckIcon
                    sx={{
                      color: palette.greenColor,
                      fontSize: 16,
                    }}
                  />
                )}
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
};

export default memo(FormListOption);
