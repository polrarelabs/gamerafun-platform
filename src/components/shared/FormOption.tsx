/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Stack } from "@mui/material";
import React, { memo, useState } from "react";
import Text from "./Text";
import CircleCheckIcon from "@icons/common/CircleCheckIcon";
import { palette } from "public/material";
import { HandleClickOption } from "@components/screens/Genres/components/helper";

interface FormOptionProps {
  label: string[];
  data: any;
  title: string;
  arrayKey: any[];
  setArray: (arrayKey: any[]) => void;
  isValue?: boolean;
}

const FormOption = ({
  label,
  data,
  title,
  arrayKey,
  setArray,
  isValue = true,
}: FormOptionProps) => {
  const GetValue = (key: string) => {
    if (data && key) {
      return data[key] ? data[key] : 0;
    }
    return;
  };

  const [show, setShow] = useState<boolean>(false);

  return (
    <Stack direction={"column"} gap={1}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={1}
        pl={2}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={1}
        >
          <Text color="white" fontSize={"16px"} fontWeight={500}>
            {title}
          </Text>
          {arrayKey.length > 0 && (
            <Stack
              sx={{
                backgroundColor: "primary.darkChannel",
                borderRadius: "10000px",
                height: 20,
                width: 20,
              }}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text color={"primary.main"} fontWeight={600} fontSize={"12px"}>
                {arrayKey.length}
              </Text>
            </Stack>
          )}
        </Stack>
        {label && label.length > 5 && (
          <Text
            color={"primary.main"}
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

      <Stack>
        {label.length > 5 ? (
          <Stack direction={"column"} gap={0.5}>
            {show ? (
              <>
                {label.map((item, index) => {
                  return (
                    <Stack
                      key={index}
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      onClick={() =>
                        HandleClickOption(item, arrayKey, setArray)
                      }
                      sx={{
                        backgroundColor: arrayKey.includes(item)
                          ? palette.colorGame?.bgColor
                          : undefined,
                        "&:hover": {
                          backgroundColor: arrayKey.includes(item)
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
                          {item}
                        </Text>
                        {isValue && (
                          <Text color={palette.colorGray} fontSize={"14px"}>
                            {GetValue(item)}
                          </Text>
                        )}
                      </Stack>
                      {arrayKey.includes(item) && (
                        <CircleCheckIcon
                          sx={{
                            color: "primary.main",
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
                {label.map((item, index) => {
                  if (index < 6) {
                    return (
                      <Stack
                        key={index}
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        onClick={() =>
                          HandleClickOption(item, arrayKey, setArray)
                        }
                        sx={{
                          backgroundColor: arrayKey.includes(item)
                            ? palette.colorGame?.bgColor
                            : undefined,
                          "&:hover": {
                            backgroundColor: arrayKey.includes(item)
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
                            {item}
                          </Text>
                          {isValue && (
                            <Text color={palette.colorGray} fontSize={"14px"}>
                              {GetValue(item)}
                            </Text>
                          )}
                        </Stack>
                        {arrayKey.includes(item) && (
                          <CircleCheckIcon
                            sx={{
                              color: "primary.main",
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
            {label.map((item, index) => {
              return (
                <Stack
                  key={index}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  onClick={() => HandleClickOption(item, arrayKey, setArray)}
                  sx={{
                    backgroundColor: arrayKey.includes(item)
                      ? palette.colorGame?.bgColor
                      : undefined,
                    "&:hover": {
                      backgroundColor: arrayKey.includes(item)
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
                      {item}
                    </Text>
                    {isValue && (
                      <Text color={palette.colorGray} fontSize={"14px"}>
                        {GetValue(item)}
                      </Text>
                    )}
                  </Stack>
                  {arrayKey.includes(item) && (
                    <CircleCheckIcon
                      sx={{
                        color: "primary.main",
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
    </Stack>
  );
};

export default memo(FormOption);
