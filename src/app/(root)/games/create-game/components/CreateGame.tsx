"use client";

import { Button, Text } from "@components/shared";
import DatePickerFormik from "@components/shared/DatePickerFormik";
import SelectFormik from "@components/shared/SelectFormik";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import {
  Genre,
  MediaPosition,
  MediaType,
  Platform,
  SupportChain,
  SupportOs,
} from "@constant/enum";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

import { useFormik } from "formik";
import React, { memo, useEffect, useState } from "react";
import { PropsFormik, PropsMedia } from "@store/game/action";
import { useCreateGame, useGame } from "@store/game";
import { useGallery } from "@store/media";
import { validationSchema } from "./ValidationSchema";
import UploadAvarta, { PropsInfo } from "./UploadAvarta";
import { SCREEN_PX } from "@constant";

const CreateGame = () => {
  const { dataGallery, uploadGallery, isUpload, SetIsUpload } = useGallery();

  const [dataListImage, setDataListImage] = useState<PropsInfo[]>([]);

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

  const [media, setMedia] = useState<PropsMedia[]>([]);

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

  const formik = useFormik({
    initialValues,
    // validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        const supportOs: string[] = formik.values.support_os;

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

        for (let i = 0; i < dataListImage.length; i++) {
          const data = new FormData();
          data.append("file", dataListImage[i].file);
          data.append("name", dataListImage[i].name);
          data.append("description", dataListImage[i].file.type);
          await uploadGallery(data);
        }
      } catch (error) {
        throw error;
      }
    },
  });

  useEffect(() => {
    if (isUpload) {
      const arr = [...media];
      arr.push({
        url: dataGallery.url,
        type:
          dataGallery.mimetype === "image/png"
            ? MediaType.IMAGE
            : MediaType.VIDEO,
        position: MediaPosition.COVER,
      });
      console.log(arr);
      setMedia(arr);
      SetIsUpload(false);
    }
  }, [isUpload]);

  useEffect(() => {
    const lenMedia = media.length;
    const lenDataList = dataListImage.length;

    if (lenMedia === lenDataList && lenMedia > 0) {
      formik.values.media = media;
      createGames(formik.values);
      // console.log('call api', media);
      // console.log('formik.values', formik.values);
    }
  }, [media]);

  useEffect(() => {
    if (isCreate) {
      setIsCreate();
      fetchGetGame();
      formik.resetForm();
    }
  }, [isCreate]);

  const isScheduleError =
    formik.touched.schedule && typeof formik.errors.schedule === "string";

  return (
    <Stack px={SCREEN_PX}>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} gap={3}>
          <Stack direction={"column"}>
            <Stack flex={2} position={"relative"} mb={4}>
              <UploadAvarta
                ratioWidth={3}
                ratioHeight={2}
                setDataListImage={setDataListImage}
                dataListImage={dataListImage}
              />
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
        </Stack>
      </form>
    </Stack>
  );
};

export default memo(CreateGame);
