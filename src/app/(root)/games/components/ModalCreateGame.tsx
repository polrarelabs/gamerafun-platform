"use client";

import DialogLayout from "@components/DialogLayout";
import { Button, Text } from "@components/shared";
import DatePickerFormik from "@components/shared/DatePickerFormik";
import SelectFormik from "@components/shared/SelectFormik";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { Genre, Platform, SupportChain, SupportOs } from "@constant/enum";
import {
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";

import { useFormik } from "formik";
import React, { Fragment, memo, useEffect } from "react";
import * as yup from "yup";
import UploadAvarta from "./UploadAvarta";
import { PropsFormik, PropsMedia } from "@store/game/action";
import { useCreateGame, useGallery, useGame } from "@store/game";
import { setToken } from "@api/helpers";

interface PropsDialog {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreateGame = ({ open, setOpen }: PropsDialog) => {
  const { dataGallery } = useGallery();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const DownloadLinks = {
    windows: "https://github.com/x89-labs/be-base/actions",
    macos: "https://github.com/x89-labs/be-base/actions",
    android: "https://github.com/x89-labs/be-base/actions",
    ios: "https://github.com/x89-labs/be-base/actions",
  };

  const { isCreate, setIsCreate, createGames } = useCreateGame();
  const { fetchGetGame } = useGame();

  const validationSchema = yup.object({
    schedule: yup
      .object({
        alpha: yup.string().required("Alpha là bắt buộc"),
        beta: yup.string().required("Beta là bắt buộc"),
        release: yup.string().required("Release là bắt buộc"),
      })
      .required("Lịch phát hành không được để trống")
      .test(
        "alpha-beta-release",
        "Alpha Beta Release theo thứ tự Alpha < Beta < Release",
        function (value) {
          const { alpha, beta, release } = value || {};
          if (!alpha || !beta || !release) return true;
          return (
            dayjs(alpha).isBefore(dayjs(beta)) &&
            dayjs(beta).isBefore(dayjs(release))
          );
        },
      ),
    name: yup.string().required("Name là bắt buộc"),
  });

  const initialValues: PropsFormik = {
    name: "",
    description: "",
    status: 1,
    website: "",
    downloadLinks: {
      windows: "",
      macos: "",
      android: "",
      ios: "",
    },
    publisher: "",
    developer: "",
    socials: {
      discord: "",
      telegram_chat: "",
      telegram_news: "",
      linkedin: "",
      medium: "",
      twitter: "",
      tiktok: "",
      youtube: "",
    },
    schedule: {
      alpha: "",
      beta: "",
      release: "",
    },
    support_os: [],
    platform: [],
    genre: [],
    chain: [],
    media: [],
  };
  console.log("create");

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const supportOs: string[] = formik.values.support_os;

      if (dataGallery.url) {
        const arr: PropsMedia[] = [];
        arr.push({
          id: dataGallery.id,
          url: dataGallery.url,
          type: dataGallery.mimetype,
          position: 0,
        });
        formik.values.media = arr;
      }

      supportOs.forEach((item) => {
        const osKey = item.toLowerCase();
        if (osKey === "mac") {
          formik.values.downloadLinks.macos = DownloadLinks.macos;
          // formik.setFieldValue('downloadLinks.macos', DownloadLinks.macos);
        } else {
          formik.values.downloadLinks[osKey] = DownloadLinks[osKey];
          // formik.setFieldValue(`downloadLinks.${osKey}`, DownloadLinks[osKey]);
        }
      });

      console.log("values", values);

      await createGames(values);
    },
  });

  useEffect(() => {
    if (isCreate) {
      setOpen(false);
      setIsCreate();
      fetchGetGame();
      formik.resetForm();
    }
  }, [isCreate]);

  const handleClose = () => {
    setOpen(false);
  };

  const isScheduleError =
    formik.touched.schedule && typeof formik.errors.schedule === "string";

  return (
    <DialogLayout open={open} onClose={handleClose} widthDialog={1440}>
      <DialogTitle marginBottom={4}>
        <Text textAlign={"center"} fontSize={"20px"} fontWeight={700}>
          Create Game
        </Text>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction={"column"} gap={3}>
            <Stack direction={"row"}>
              <Stack flex={2} position={"relative"}>
                <UploadAvarta />
              </Stack>
              <Stack direction={"column"} gap={3} flex={4}>
                <Stack direction={"row"} gap={3}>
                  <TextFieldFormik label="Name" name="name" formik={formik} />
                  <TextFieldFormik
                    label="Description"
                    name="description"
                    formik={formik}
                  />
                </Stack>

                <Stack direction={"row"} gap={3}>
                  <TextFieldFormik
                    label="Website"
                    name="website"
                    formik={formik}
                  />
                  <TextFieldFormik
                    label="Publisher"
                    name="publisher"
                    formik={formik}
                  />
                </Stack>

                <Stack direction={"row"} gap={3}>
                  <TextFieldFormik
                    label="Developer"
                    name="developer"
                    formik={formik}
                  />
                  <Stack flex={2} gap={1}>
                    <Text>Status</Text>
                    <FormControl
                      error={
                        formik.touched.status && Boolean(formik.errors.status)
                      }
                      fullWidth
                    >
                      <Select
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        defaultValue={1}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </Select>
                      {formik.touched.status && formik.errors.status && (
                        <FormHelperText>{formik.errors.status}</FormHelperText>
                      )}
                    </FormControl>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Stack direction={"row"} gap={2}>
              <SelectFormik
                label={"Support Os"}
                name={"support_os"}
                formik={formik}
                MenuProps={MenuProps}
                OptionEnum={SupportOs}
              />
              <SelectFormik
                label={"Platform"}
                name={"platform"}
                formik={formik}
                MenuProps={MenuProps}
                OptionEnum={Platform}
              />
            </Stack>
            <Stack direction={"row"} gap={2}>
              <SelectFormik
                label={"Genre"}
                name={"genre"}
                formik={formik}
                MenuProps={MenuProps}
                OptionEnum={Genre}
              />
              <SelectFormik
                label={"Chain"}
                name={"chain"}
                formik={formik}
                MenuProps={MenuProps}
                OptionEnum={SupportChain}
              />
            </Stack>
            <FormControl
              error={
                formik.touched.schedule &&
                typeof formik.errors.schedule === "string"
              }
              fullWidth
            >
              <Stack direction="row" gap={2}>
                <DatePickerFormik
                  formik={formik}
                  label="Alpha"
                  name="schedule.alpha"
                  scheduleError={isScheduleError}
                />
                <DatePickerFormik
                  formik={formik}
                  label="Beta"
                  name="schedule.beta"
                  scheduleError={isScheduleError}
                />
                <DatePickerFormik
                  formik={formik}
                  label="Release"
                  name="schedule.release"
                  scheduleError={isScheduleError}
                />
              </Stack>

              {formik.touched.schedule &&
                typeof formik.errors.schedule === "string" && (
                  <FormHelperText>{formik.errors.schedule}</FormHelperText>
                )}
            </FormControl>
          </Stack>

          <Stack direction={"row"} mt={4} justifyContent={"end"} gap={2}>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
            <Button onClick={handleClose} variant="contained" color="warning">
              Close
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </DialogLayout>
  );
};

export default ModalCreateGame;
