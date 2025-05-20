"use client";

// import DialogLayout from "@components/DialogLayout";
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

import { SCREEN_PX } from "@constant";
import { useGame } from "@store/game";
import { PropsFormik, PropsMedia } from "@store/game/action";
import { useGallery } from "@store/media";
import { useFormik } from "formik";
import { memo, useEffect, useState } from "react";
import UploadAvatar, { PropsInfo } from "./UploadAvatar";
import { validationSchema } from "./helper";

interface ListIdGame {
  id: number;
  name: string;
}

const UpdateGame = () => {
  const { dataGallery, resetGallery } = useGallery();

  const [dataListImage, setDataListImage] = useState<PropsInfo[]>([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const [dataGameId, setDataGameId] = useState<ListIdGame[]>([]);

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
  const [isDisable, setIdDisable] = useState<boolean>(true);

  const {
    fetchGetGame,
    dataListGame: dataGame,
    updateGames,
    isUpdate,
    setIsUpdate,
    dataGetGameId: data,
    setStatusGet,
    getGameId,
  } = useGame();

  useEffect(() => {
    fetchGetGame();
  }, []);

  useEffect(() => {
    if (dataGame) {
      const arr: ListIdGame[] = [];
      for (let i = 0; i < dataGame.length; i++) {
        arr.push({
          id: dataGame[i].id,
          name: dataGame[i].name,
        });
      }
      return setDataGameId(arr);
    }
  }, [dataGame]);

  const initialValues: PropsFormik = {
    gameId: 0,
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
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      formik.resetForm({
        values: {
          gameId: data.id,
          name: data.name,
          description: data.description,
          status: data.status,
          website: data.website,
          downloadLinks: {
            windows: data?.downloadLink?.windows || "",
            macos: data?.downloadLink?.macos || "",
            android: data?.downloadLink?.android || "",
            ios: data?.downloadLink?.ios || "",
          },
          publisher: data.publisher || "",
          developer: data.developer || "",
          socials: {
            discord: data?.socials?.discord || "",
            telegram_chat: data?.socials?.telegram_chat || "",
            telegram_news: data?.socials?.telegram_news || "",
            linkedin: data?.socials?.linkedin || "",
            medium: data?.socials?.medium || "",
            twitter: data?.socials?.twitter || "",
            tiktok: data?.socials?.tiktok || "",
            youtube: data?.socials?.youtube || "",
          },
          schedule: {
            alpha: data?.schedule?.alpha || "",
            beta: data?.schedule?.beta || "",
            release: data?.schedule?.release || "",
          },
          support_os: data.support_os || [],
          platform: data.platform || [],
          genre: data.genre || [],
          chain: data.chain || [],
          media: data.media || [],
        },
      });
      setIdDisable(false);
    } else setIdDisable(true);
  }, [data]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (dataGallery.url) {
        const arr: PropsMedia[] = [];
        arr.push({
          url: dataGallery.url,
          type:
            dataGallery.mimetype === "image/png"
              ? MediaType.IMAGE
              : MediaType.VIDEO,
          position: MediaPosition.COVER,
        });
        formik.values.media = arr;
      }
      const supportOs: string[] = formik.values.support_os;
      supportOs.forEach((item) => {
        const osKey = item.toLowerCase();
        if (osKey === "mac") {
          formik.values.downloadLinks.macos = DownloadLinks.macos;
        } else {
          formik.values.downloadLinks[osKey] = DownloadLinks[osKey];
        }
      });
      updateGames(values);
    },
  });

  const handleClickItem = (gameId: number) => {
    getGameId(gameId);
  };

  useEffect(() => {
    if (isUpdate) {
      setIsUpdate();
      fetchGetGame();
      resetGallery();
      setStatusGet();
      formik.resetForm();
    }
  }, [isUpdate]);

  const isScheduleError =
    formik.touched.schedule && typeof formik.errors.schedule === "string";

  return (
    <Stack px={SCREEN_PX}>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} gap={3}>
          <Stack direction={"row"}>
            <Stack flex={2} position={"relative"}>
              <UploadAvatar
                ratioWidth={3}
                ratioHeight={2}
                setDataListImage={setDataListImage}
                dataListImage={dataListImage}
              />
            </Stack>
            <Stack direction={"column"} gap={3} flex={4}>
              <Stack flex={2} gap={1}>
                <Text>Select Game</Text>
                <FormControl
                  error={formik.touched.gameId && Boolean(formik.errors.gameId)}
                  fullWidth
                >
                  <Select
                    name="gameId"
                    value={formik.values.gameId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultValue={formik.values.gameId}
                  >
                    {dataGameId &&
                      dataGameId.map((item, index) => {
                        return (
                          <MenuItem
                            value={item.id}
                            key={index}
                            onClick={() => handleClickItem(item.id)}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  {formik.touched.gameId && formik.errors.gameId && (
                    <FormHelperText>{formik.errors.gameId}</FormHelperText>
                  )}
                </FormControl>
              </Stack>

              <Stack direction={"row"} gap={3}>
                <TextFieldFormik
                  label="Name"
                  name="name"
                  formik={formik}
                  isDisable={isDisable}
                />
                <TextFieldFormik
                  label="Description"
                  name="description"
                  formik={formik}
                  isDisable={isDisable}
                />
              </Stack>

              <Stack direction={"row"} gap={3}>
                <TextFieldFormik
                  label="Website"
                  name="website"
                  formik={formik}
                  isDisable={isDisable}
                />
                <TextFieldFormik
                  label="Publisher"
                  name="publisher"
                  formik={formik}
                  isDisable={isDisable}
                />
              </Stack>

              <Stack direction={"row"} gap={3}>
                <TextFieldFormik
                  label="Developer"
                  name="developer"
                  formik={formik}
                  isDisable={isDisable}
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
                      defaultValue={formik.values.status}
                      disabled={isDisable}
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
              isDisable={isDisable}
            />
            <SelectFormik
              label={"Platform"}
              name={"platform"}
              formik={formik}
              MenuProps={MenuProps}
              OptionEnum={Platform}
              isDisable={isDisable}
            />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <SelectFormik
              label={"Genre"}
              name={"genre"}
              formik={formik}
              MenuProps={MenuProps}
              OptionEnum={Genre}
              isDisable={isDisable}
            />
            <SelectFormik
              label={"Chain"}
              name={"chain"}
              formik={formik}
              MenuProps={MenuProps}
              OptionEnum={SupportChain}
              isDisable={isDisable}
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
                isDisable={isDisable}
              />
              <DatePickerFormik
                formik={formik}
                label="Beta"
                name="schedule.beta"
                scheduleError={isScheduleError}
                isDisable={isDisable}
              />
              <DatePickerFormik
                formik={formik}
                label="Release"
                name="schedule.release"
                scheduleError={isScheduleError}
                isDisable={isDisable}
              />
            </Stack>

            {formik.touched.schedule &&
              typeof formik.errors.schedule === "string" && (
                <FormHelperText>{formik.errors.schedule}</FormHelperText>
              )}
          </FormControl>
        </Stack>

        <Stack direction={"row"} mt={4} justifyContent={"end"} gap={2}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={isDisable}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default memo(UpdateGame);
