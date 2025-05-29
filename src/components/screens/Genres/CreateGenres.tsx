"use client";

import { Button } from "@components/shared";
import SelectFormik from "@components/shared/SelectFormik";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { SCREEN_PX } from "@constant";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { GenresCProps } from "@store/game/type";
import { useFormik } from "formik";
import React, { memo, useEffect, useState } from "react";

const CreateGenres = () => {
  const {
    createGenres,
    loading,
    error,
    genreById,
    getGenresById,
    genreItems,
    getGenres,
    updateGenres,
  } = useGame();

  const handleClick = (id: number) => {
    console.log(id);

    getGenresById(id);
  };

  useEffect(() => {
    getGenres({});
  }, []);

  useEffect(() => {
    console.log(genreItems);
  }, [genreItems]);

  const [types, setTypes] = useState<string>("create");
  const [disable, setDisable] = useState<boolean>(false);
  const handleClickType = () => {
    if (types === "create") {
      setTypes("update");
    } else setTypes("create");
  };

  const initialValues: GenresCProps = {
    name: "",
    media: "",
  };

  useEffect(() => {
    if (types === "update") {
      if (genreById && Object.keys(genreById).length > 0) {
        formik.resetForm({
          values: {
            id: genreById.id,
            name: genreById.name,
            // shortDescription: genreById.shortDescription,
            media: genreById.media,
          },
        });
        setDisable(false);
      } else {
        setDisable(true);
        formik.resetForm({
          values: {
            name: "",
            // shortDescription: genreById.shortDescription,
            media: "",
          },
        });
      }
    } else {
      setDisable(false);
      formik.resetForm({
        values: {
          name: "",
          // shortDescription: genreById.shortDescription,
          media: "",
        },
      });
    }
  }, [types, genreById]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (types === "create") {
        createGenres(values);
        formik.resetForm();
      } else {
        updateGenres(values);
        formik.resetForm();
      }
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
          {types === "create" ? "Edit" : "Create"}
        </Button>
      </Stack>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} gap={3}>
          {types === "update" ? (
            <>
              <Stack direction={"row"} gap={2}>
                <SelectFormik
                  isMultiple={false}
                  label={"Select Genres"}
                  name={"id"}
                  formik={formik}
                  OptionEnum={genreItems}
                  handleClick={handleClick}
                  nameDisplay={genreItems}
                  keyNameDisplay="name"
                />
                {/* <TextFieldFormik
                  label="Name"
                  name="name"
                  formik={formik}
                  isDisable={disable}
                /> */}
              </Stack>
              <Stack direction={"row"} gap={2}>
                {/* <TextFieldFormik
                  label="Short Description"
                  name="shortDescription"
                  formik={formik}
                  isDisable={disable}
                /> */}
                <TextFieldFormik
                  label="Name"
                  name="name"
                  formik={formik}
                  isDisable={disable}
                />
                <TextFieldFormik
                  label="Media"
                  name="media"
                  formik={formik}
                  isDisable={disable}
                />
              </Stack>
            </>
          ) : (
            <Stack direction={"row"} gap={2}>
              <TextFieldFormik
                label="Name"
                name="name"
                formik={formik}
                isDisable={disable}
              />
              <TextFieldFormik
                label="Media"
                name="media"
                formik={formik}
                isDisable={disable}
              />
            </Stack>
          )}
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
