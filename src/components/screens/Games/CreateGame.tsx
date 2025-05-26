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
import { useGame } from "@store/game";
import { useGallery } from "@store/media";
import UploadAvarta, { PropsInfo } from "./UploadAvatar";
import { SCREEN_PX } from "@constant";
import InputEditor from "@components/shared/InputEditor";
import {
  ANDROID_URL,
  IOS_URL,
  MACOS_URL,
  validationSchema,
  WINDOW_URL,
} from "./helper";

interface PropsFormGame {
  name?: string;
}

const CreateGame = ({ name = "create" }: PropsFormGame) => {
  const { dataGallery, uploadGallery, isUpload, SetIsUpload } = useGallery();

  const [dataListImage, setDataListImage] = useState<PropsInfo[]>([]);

  const DownloadLinks = {
    windows: WINDOW_URL,
    macos: MACOS_URL,
    android: ANDROID_URL,
    ios: IOS_URL,
  };
  const {
    fetchGetGame,
    isCreate,
    setIsCreate,
    createGames,
    dataGetGameId: gameId,
    dataListGame,
    updateGames,
    getGameId,
  } = useGame();

  const [isDisable, setIdDisable] = useState<boolean>(true);

  const [media, setMedia] = useState<PropsMedia[]>([]);

  useEffect(() => {
    if (gameId && Object.keys(gameId).length > 0) {
      formik.resetForm({
        values: {
          gameId: gameId.id,
          name: gameId.name,
          description: gameId.description,
          status: gameId.status,
          website: gameId.website,
          downloadLinks: {
            windows: gameId?.downloadLink?.windows || "",
            macos: gameId?.downloadLink?.macos || "",
            android: gameId?.downloadLink?.android || "",
            ios: gameId?.downloadLink?.ios || "",
          },
          publisher: gameId.publisher || "",
          developer: gameId.developer || "",
          socials: {
            discord: gameId?.socials?.discord || "",
            telegram_chat: gameId?.socials?.telegram_chat || "",
            telegram_news: gameId?.socials?.telegram_news || "",
            linkedin: gameId?.socials?.linkedin || "",
            medium: gameId?.socials?.medium || "",
            twitter: gameId?.socials?.twitter || "",
            tiktok: gameId?.socials?.tiktok || "",
            youtube: gameId?.socials?.youtube || "",
          },
          schedule: {
            alpha: gameId?.schedule?.alpha || "",
            beta: gameId?.schedule?.beta || "",
            release: gameId?.schedule?.release || "",
          },
          support_os: gameId.support_os || [],
          platform: gameId.platform || [],
          genre: gameId.genre || [],
          chain: gameId.chain || [],
          media: gameId.media || [],
        },
      });
      setIdDisable(false);
    } else setIdDisable(true);
  }, [gameId]);

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
    content: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        const supportOs: string[] = formik.values.support_os;

        supportOs.forEach((item) => {
          const osKey = item.toLowerCase();
          if (osKey === "mac") {
            formik.values.downloadLinks.macos = DownloadLinks.macos;
          } else {
            formik.values.downloadLinks[osKey] = DownloadLinks[osKey];
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
      setMedia(arr);
      SetIsUpload(false);
    }
  }, [isUpload]);

  useEffect(() => {
    const lenMedia = media.length;
    const lenDataList = dataListImage.length;

    if (lenMedia === lenDataList && lenMedia > 0) {
      formik.values.media = media;
      if (name === "create") createGames(formik.values);
      else updateGames(formik.values);
      // console.log('call api', media);
      // console.log('formik.values', formik.values);
    }
  }, [media]);

  useEffect(() => {
    if (isCreate) {
      setIsCreate();
      // fetchGetGame();
      formik.resetForm();
    }
  }, [isCreate]);

  const handleClick = (id: number) => {
    getGameId(id);
  };

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
              {name !== "create" && (
                <SelectFormik
                  isMultiple={false}
                  label={"Game Id"}
                  name={"gameId"}
                  formik={formik}
                  OptionEnum={dataListGame}
                  handleClick={handleClick}
                />
              )}
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
              OptionEnum={SupportOs}
            />
            <SelectFormik
              label={"Platform"}
              name={"platform"}
              formik={formik}
              OptionEnum={Platform}
            />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <SelectFormik
              label={"Genre"}
              name={"genre"}
              formik={formik}
              OptionEnum={Genre}
            />
            <SelectFormik
              label={"Chain"}
              name={"chain"}
              formik={formik}
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
          <InputEditor name="content" label="Content" formik={formik} />
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
