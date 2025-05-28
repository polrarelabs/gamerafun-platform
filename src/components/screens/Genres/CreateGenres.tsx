"use client";

import { Button } from "@components/shared";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { SCREEN_PX } from "@constant";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { GenresCProps } from "@store/game/type";
import { useFormik } from "formik";
import React, { memo, useEffect, useState } from "react";

const CreateGenres = () => {
  const { createGenres, loading, error } = useGame();
  const [types, setTypes] = useState<string>("create");

  const handleClickType = () => {
    if (types === "create") {
      setTypes("update");
    } else setTypes("create");
  };

  const initialValues: GenresCProps = {
    name: "",
    media: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      createGenres(values);
    },
  });

  useEffect(() => {
    if (loading === false && error === "") {
      console.log("create success");
    }
  }, [loading, error]);

  return (
    <Stack px={SCREEN_PX} gap={4}>
      <Stack width={"100%"} direction={"row"} justifyContent={"end"}>
        <Button variant="outlined" onClick={handleClickType}>
          {types === "create" ? "Create" : "Edit"}
        </Button>
      </Stack>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} gap={3}>
          <Stack direction={"row"} gap={2}>
            <TextFieldFormik label="Name" name="name" formik={formik} />
            <TextFieldFormik label="Media" name="media" formik={formik} />
          </Stack>
          <Stack direction={"row"} width={"100%"} justifyContent={"end"}>
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default memo(CreateGenres);
