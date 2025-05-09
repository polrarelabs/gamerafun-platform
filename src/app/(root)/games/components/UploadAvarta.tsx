"use client";

import { Button, Image } from "@components/shared";
import { Stack, styled } from "@mui/material";
import { useGallery } from "@store/game";
// import { PropsGallery } from "@store/game/action";
import React, { memo, useEffect } from "react";

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

const UploadAvarta = () => {
  const { dataGallery, errorGallery, loadingGallery, uploadGallery } =
    useGallery();

  const handleChange = (e) => {
    const file = e.target.files[0] as File;
    console.log("file", file);

    const data = new FormData();
    data.append("file", file);
    data.append("name", file.name);
    data.append("description", file.type);
    uploadGallery(data);
  };

  useEffect(() => {
    console.log("dataGallery", dataGallery);
  }, [dataGallery]);

  return (
    <>
      {dataGallery.url ? (
        <Stack
          component="label"
          sx={{
            position: "absolute",
            borderRadius: "1000px",
            // p: 10,
            width: 300,
            height: 300,
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Image
            src={dataGallery.url}
            alt={`data.url-${dataGallery.url}`}
            size="100%"
            aspectRatio={1 / 1}
            sizes="960px"
            containerProps={{
              sx: {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "1000px",
                "& img": {
                  objectFit: "cover",
                  objectPosition: "center",
                },
              },
            }}
          />
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => handleChange(event)}
            multiple
          />
        </Stack>
      ) : (
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          sx={{
            position: "absolute",
            borderRadius: "1000px",
            p: 10,
            width: 300,
            height: 300,
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
          }}
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => handleChange(event)}
            multiple
          />
        </Button>
      )}
    </>
  );
};

export default memo(UploadAvarta);
