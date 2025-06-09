/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button, Snackbared, Text, UploadImage } from "@components/shared";
import SelectFormik from "@components/shared/SelectFormik";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { SCREEN_PX } from "@constant";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { GenresCProps } from "@store/game/type";
import { useGallery } from "@store/media";
import { useFormik } from "formik";
import { memo, useEffect, useState } from "react";

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

  const { dataGallery } = useGallery();

  const handleClick = (id: number) => {
    getGenresById(id);
  };

  const [openSnack, setOpenSnack] = useState<boolean>(false);

  useEffect(() => {
    getGenres({});
  }, []);

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
    if (dataGallery) {
      formik.values.media = dataGallery.url;
    }
  }, [dataGallery]);

  useEffect(() => {
    if (types === "update") {
      if (genreById && Object.keys(genreById).length > 0) {
        formik.resetForm({
          values: {
            id: genreById.id,
            name: genreById.name,
            media: genreById.media,
          },
        });
        setDisable(false);
      } else {
        setDisable(true);
        formik.resetForm({
          values: {
            name: "",
            media: "",
          },
        });
      }
    } else {
      setDisable(false);
      formik.resetForm({
        values: {
          name: "",
          media: "",
        },
      });
    }
  }, [types, genreById]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (dataGallery) {
        formik.values.media = dataGallery.url;
      }
      if (formik.values.media && formik.values.media.length > 0) {
        if (types === "create") {
          createGenres(values);
          formik.resetForm();
        } else {
          updateGenres(values);
          formik.resetForm();
        }
      }
    },
  });

  useEffect(() => {
    if (loading === false && error === "") {
      setOpenSnack(true);
    }
  }, [loading, error]);

  return (
    <Stack px={SCREEN_PX} gap={4}>
      <Stack width={"100%"} direction={"row"} justifyContent={"end"}>
        <Text fontSize={"32px"} fontWeight={700}>
          {types === "create" ? "Create Genres" : "Update Genres"}
        </Text>
        <Button variant="outlined" onClick={handleClickType}>
          {types === "create" ? "Edit" : "Create"}
        </Button>
      </Stack>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} gap={3}>
          <Stack>
            <UploadImage ratioHeight={2} ratioWidth={3} />
          </Stack>

          {types === "update" && (
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
            </Stack>
          )}
          <Stack direction={"row"} gap={2}>
            <TextFieldFormik
              label="Name"
              name="name"
              formik={formik}
              isDisable={disable}
            />
          </Stack>
          <Stack direction={"row"} width={"100%"} justifyContent={"end"}>
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
      <Snackbared
        open={openSnack}
        setOpen={setOpenSnack}
        message={(error ?? "").length > 0 ? "Error" : "Success"}
        // path={(error ?? '').length ? null : GAME_PATH}
        status={(error ?? "").length > 0 ? "error" : "success"}
      />
    </Stack>
  );
};

export default memo(CreateGenres);
