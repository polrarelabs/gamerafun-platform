"use client";

import { Button, Text } from "@components/shared";
import { Stack, styled } from "@mui/material";
import React, { memo, useRef } from "react";
import { InfoImage } from "./components";
import { useGame } from "@store/game";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export interface PropsUpload {
  ratioWidth: number;
  ratioHeight: number;
  dataListImage: PropsInfo[];
  setDataListImage: React.Dispatch<React.SetStateAction<PropsInfo[]>>;
}

export interface PropsInfo {
  file: File;
  name: string;
  description?: string;
  position: string;
  widthImg: number;
  heightImg: number;
  url?: string;
}

const UploadAvarta = ({
  ratioWidth,
  ratioHeight,
  setDataListImage,
  dataListImage,
}: PropsUpload) => {
  const { errorsSizeImage, SetErrorsSizeImage } = useGame();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const files = e.target.files;
    if (!file || !files?.length) return;

    const message = getMessageCheckFile(files[0]);
    if (message) {
      SetErrorsSizeImage(message);
      if (inputRef?.current?.value) {
        inputRef.current.value = "";
      }
    } else {
      const imageUrl = URL.createObjectURL(file);
      const img = new window.Image();
      img.src = imageUrl;

      img.onload = () => {
        const actualRatio = img.width / img.height;
        const expectedRatio = ratioWidth / ratioHeight;
        const isValidRatio = Math.abs(actualRatio - expectedRatio) < 0.5;

        if (isValidRatio) {
          SetErrorsSizeImage(null);

          const array: PropsInfo[] = [...dataListImage];
          array.push({
            file: file,
            name: "",
            description: "",
            position: "",
            heightImg: img.height,
            widthImg: img.width,
          });
          setDataListImage(array);
        } else {
          SetErrorsSizeImage(
            `The image must follow a ${ratioWidth}:${ratioHeight} aspect ratio`,
          );
        }
      };
    }
  };

  return (
    <>
      <Stack position="relative" direction="row" height="100%" width="100%">
        <Stack flex={1} alignItems={"center"} gap={2} mt={2}>
          <Button
            component="label"
            variant="outlined"
            tabIndex={-1}
            sx={{
              borderRadius: "8px",
              p: 2,
              width: "max-content",
            }}
          >
            Upload image
            <VisuallyHiddenInput
              ref={inputRef}
              type="file"
              onChange={handleChange}
              accept="image/png"
            />
          </Button>
          {errorsSizeImage && (
            <Text
              color="red"
              sx={{
                width: "100%",
                textAlign: "center",
              }}
            >
              {errorsSizeImage}
            </Text>
          )}
        </Stack>
        {dataListImage.length > 0 && (
          <Stack
            flex={4}
            // direction={"column"}
            gap={2}
            display={"grid"}
            gridTemplateColumns={`repeat(5, 1fr)`}
          >
            {dataListImage.map((item, index) => {
              return (
                <InfoImage
                  key={index}
                  data={item}
                  id={index}
                  setDataList={setDataListImage}
                  dataList={dataListImage}
                />
              );
            })}
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default memo(UploadAvarta);

const MAX_SIZE = 10 * 1024 * 1024;

export const IMAGES_ACCEPT_INPUT = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/svg+xml",
  "image/webp",
];

const getMessageCheckFile = (file: File) => {
  const { type, size } = file;
  switch (true) {
    case !IMAGES_ACCEPT_INPUT.includes(type):
      return "Image is invalid";
    case size > MAX_SIZE:
      return "Image exceed 10MB";
    default:
      return undefined;
  }
};
