/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button, Snackbared, Text } from "@components/shared";
import DatePickerFormik from "@components/shared/DatePickerFormik";
import SelectFormik from "@components/shared/SelectFormik";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { ScheduleStatus, SupportChain, SupportOs } from "@constant/enum";
import { FormControl, FormHelperText, Stack } from "@mui/material";
import { SCREEN_PX } from "@constant";
import { GAME_PATH } from "@constant/paths";
import { useGame } from "@store/game";
import { FormCreateGameProps, PlatformLinkProps } from "@store/game/type";
import { useGallery } from "@store/media";
import { useFormik } from "formik";
import { memo, useEffect, useState } from "react";
import { validationSchema } from "./helper";
import UploadAvarta, { PropsInfo } from "../../Media/UploadAvatar";
import PlatformLink from "./PlatformLink";
import { DataProps } from "@components/RenderForm";

interface PropsFormGame {
  name?: string;
}

const CreateGame = ({ name = "create" }: PropsFormGame) => {
  const { dataGallery, uploadGallery, isUpload, SetIsUpload } = useGallery();

  const [dataListImage, setDataListImage] = useState<PropsInfo[]>([]);
  const {
    getGame,
    createGame,
    gameById,
    game,
    updateGame,
    getGameById,
    loading,
    error,
    gameCount,
    getGameCount,
  } = useGame();

  useEffect(() => {
    getGameCount();
  }, []);

  const [genre, setGenre] = useState<PropsFormGame>();

  useEffect(() => {
    if (gameCount) {
      const key = gameCount.genre ? Object.keys(gameCount.genre) : [];

      if (key.length > 0) {
        const obj = Object.fromEntries(key.map((item, _index) => [item, item]));
        setGenre(obj);
      }
    }
  }, [gameCount]);

  const [isDisable, setIdDisable] = useState<boolean>(false);

  const [listPlatform, setListPlatform] = useState<PlatformLinkProps[]>([]);

  const [media, setMedia] = useState<string[]>([]);

  const [openSnack, setOpenSnack] = useState<boolean>(false);

  useEffect(() => {
    getGame({ pageIndex: 1, pageSize: 10 });
  }, []);

  useEffect(() => {
    if (name === "update") {
      if (gameById && Object.keys(gameById).length > 0) {
        formik.resetForm({ values: { ...gameById } });
        if (gameById.platformLink?.length > 0) {
          setListPlatform(gameById.platformLink);
        }
        setIdDisable(false);
      } else {
        setIdDisable(true);
      }
    }
  }, [gameById]);

  const initialValues: FormCreateGameProps = {
    name: "",
    description: "",
    status: 0,
    website: "",
    publisher: "",
    developer: "",
    schedule: {
      alpha: "",
      beta: "",
      release: "",
    },
    support_os: [],
    chain: [],
    platformLink: [],
    mediaUrl: [],
    playableOnDesktop: false,
    genreName: [],
    statusGame: "" as ScheduleStatus,
    discord: "",
    telegramChat: "",
    telegramNews: "",
    medium: "",
    twitter: "",
    youtube: "",
    contactPhone: "",
    contactEmail: "",
    contactName: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    // onSubmit: (values) => {
    //   formik.values.platformLink = listPlatform;
    //   console.log(values);
    // }
    onSubmit: async () => {
      try {
        formik.values.platformLink = listPlatform;
        for (let i = 0; i < dataListImage.length; i++) {
          const data = new FormData();
          data.append("file", dataListImage[i].file);
          data.append("name", dataListImage[i].file.name);
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
      arr.push(dataGallery.url);
      setMedia(arr);
      SetIsUpload(false);
    }
  }, [isUpload]);

  useEffect(() => {
    const lenMedia = media.length;
    const lenDataList = dataListImage.length;

    if (lenMedia === lenDataList && lenMedia > 0) {
      formik.values.mediaUrl = media;
      if (String(formik.values.playableOnDesktop) === "true") {
        formik.values.playableOnDesktop = true;
      } else formik.values.playableOnDesktop = false;
      if (name === "create") createGame(formik.values);
      else if (name === "update") updateGame(formik.values);
    }
  }, [media]);

  useEffect(() => {
    if (loading === false && error === "") {
      setOpenSnack(true);
    }
  }, [loading, error]);

  const handleClick = (id: number) => {
    getGameById(id);
  };

  // const data: DataProps[] = [
  //   {
  //     label: "Game Id"
  //   }
  // ]

  const isScheduleError =
    formik.touched.schedule && typeof formik.errors.schedule === "string";

  return (
    <Stack px={SCREEN_PX}>
      <Text fontSize={"32px"} fontWeight={700}>
        {name === "create" ? "Create Game" : "Update Game"}
      </Text>
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
                  name={"id"}
                  formik={formik}
                  handleClick={handleClick}
                  nameDisplay={game.items}
                  keyNameDisplay="name"
                />
              )}
              <Stack direction={"row"} gap={3}>
                <TextFieldFormik label="Name" name="name" formik={formik} />
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
                <TextFieldFormik
                  label="Developer"
                  name="developer"
                  formik={formik}
                  isDisable={isDisable}
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack direction={"row"} gap={2}>
            <SelectFormik
              label={"Status"}
              name={"status"}
              formik={formik}
              OptionEnum={Status}
              isMultiple={false}
              isDisable={isDisable}
            />
            <SelectFormik
              label="Playable On Desktop"
              name="playableOnDesktop"
              formik={formik}
              OptionEnum={PlayableOnDesktop}
              isMultiple={false}
            />

            <SelectFormik
              label={"Status Game"}
              name={"statusGame"}
              formik={formik}
              OptionEnum={ScheduleStatus}
              isMultiple={false}
              isDisable={isDisable}
            />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <SelectFormik
              label={"Support Os"}
              name={"support_os"}
              formik={formik}
              OptionEnum={SupportOs}
              isDisable={isDisable}
            />
            <SelectFormik
              label={"Genre"}
              name={"genreName"}
              formik={formik}
              OptionEnum={genre}
              isDisable={isDisable}
            />
            <SelectFormik
              label={"Chain"}
              name={"chain"}
              formik={formik}
              OptionEnum={SupportChain}
              isDisable={isDisable}
            />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <TextFieldFormik
              label="Discord"
              name="discord"
              formik={formik}
              isDisable={isDisable}
            />
            <TextFieldFormik
              label="Telegram Chat"
              name="telegramChat"
              formik={formik}
              isDisable={isDisable}
            />
            <TextFieldFormik
              label="Telegram News"
              name="telegramNews"
              formik={formik}
              isDisable={isDisable}
            />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <TextFieldFormik
              label="Medium"
              name="medium"
              formik={formik}
              isDisable={isDisable}
            />
            <TextFieldFormik
              label="Twitter"
              name="twitter"
              formik={formik}
              isDisable={isDisable}
            />
            <TextFieldFormik
              label="Youtube"
              name="youtube"
              formik={formik}
              isDisable={isDisable}
            />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <TextFieldFormik
              label="Contact Phone"
              name="contactPhone"
              formik={formik}
              isDisable={isDisable}
            />
            <TextFieldFormik
              label="Contact Email"
              name="contactEmail"
              formik={formik}
              isDisable={isDisable}
            />
            <TextFieldFormik
              label="Contact Name"
              name="contactName"
              formik={formik}
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

          <PlatformLink data={listPlatform} setData={setListPlatform} />

          {/* <InputEditor name="content" label="Content" formik={formik} /> */}
        </Stack>
        <Stack></Stack>

        <Stack direction={"row"} mt={4} justifyContent={"end"} gap={2}>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
      <Snackbared
        open={openSnack}
        setOpen={setOpenSnack}
        message={(error ?? "").length > 0 ? "Error" : "Success"}
        path={(error ?? "").length ? null : GAME_PATH}
        status={(error ?? "").length > 0 ? "error" : "success"}
      />
    </Stack>
  );
};

export default memo(CreateGame);

const Status = {
  "1": 1,
  "2": 2,
  "3": 3,
};

const PlayableOnDesktop = {
  True: "true",
  False: "false",
};
