/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import RenderForm, { DataProps } from "@components/RenderForm";
import { Button, Snackbared, Text } from "@components/shared";
import DatePickerFormik from "@components/shared/DatePickerFormik";
import { SCREEN_PX } from "@constant";
import { ScheduleStatus, SupportOs } from "@constant/enum";
import { GAME_PATH } from "@constant/paths";
import { FormControl, FormHelperText, Stack } from "@mui/material";
import { useGame } from "@store/game";
import { FormCreateGameProps, PlatformLinkProps } from "@store/game/type";
import { useGallery } from "@store/media";
import { useFormik } from "formik";
import { memo, useEffect, useState } from "react";
import UploadAvarta, { PropsInfo } from "../../Media/UploadAvatar";
import { validationSchema } from "./helper";
import PlatformLink from "./PlatformLink";

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

  const data: DataProps[] = [
    {
      label: "Game Id",
      name: "id",
      handleClick: handleClick,
      nameDisplay: game.items,
      keyNameDisplay: "name",
      type: "select",
      isMultiple: false,
      show: name === "update" ? true : false,
    },
    {
      type: "text",
      label: "Name",
      name: "name",
    },
    {
      type: "text",
      label: "Description",
      name: "description",
    },
    {
      type: "text",
      label: "Website",
      name: "website",
    },
    {
      type: "text",
      label: "Publisher",
      name: "publisher",
    },
    {
      type: "text",
      label: "Developer",
      name: "developer",
    },
    {
      type: "select",
      label: "Status",
      name: "status",
      OptionEnum: Status,
      isMultiple: false,
    },
    {
      type: "select",
      label: "Playable On Desktop",
      name: "playableOnDesktop",
      OptionEnum: PlayableOnDesktop,
      isMultiple: false,
    },
    {
      type: "select",
      label: "Status Game",
      name: "statusGame",
      OptionEnum: ScheduleStatus,
      isMultiple: false,
    },
    {
      type: "select",
      label: "Support Os",
      name: "support_os",
      OptionEnum: SupportOs,
      isMultiple: false,
    },
    {
      type: "select",
      label: "Genre",
      name: "genreName",
      OptionEnum: genre,
      isMultiple: false,
    },
    {
      type: "select",
      label: "Chain",
      name: "chain",
      OptionEnum: SupportOs,
      isMultiple: false,
    },
    {
      type: "text",
      label: "Discord",
      name: "discord",
    },
    {
      type: "select",
      label: "Telegram Chat",
      name: "telegramChat",
      OptionEnum: SupportOs,
      isMultiple: false,
    },
    {
      type: "text",
      label: "Telegram News",
      name: "telegramNews",
    },
    {
      type: "text",
      label: "Medium",
      name: "medium",
    },
    {
      type: "select",
      label: "Twitter",
      name: "twitter",
      OptionEnum: SupportOs,
      isMultiple: false,
    },
    {
      type: "text",
      label: "Youtube",
      name: "youtube",
    },
    {
      type: "text",
      label: "Contact Phone",
      name: "contactPhone",
    },
    {
      type: "select",
      label: "Contact Email",
      name: "contactEmail",
      OptionEnum: SupportOs,
      isMultiple: false,
    },
    {
      type: "text",
      label: "Contact Name",
      name: "contactName",
    },
  ];

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
            <UploadAvarta
              ratioWidth={3}
              ratioHeight={2}
              setDataListImage={setDataListImage}
              dataListImage={dataListImage}
            />
          </Stack>

          <Stack
            display={"grid"}
            gridTemplateColumns={{ md: "repeat(3,1fr)", xs: "repeat(2,1fr)" }}
            gap={2}
          >
            {data.map((item, index) => {
              return (
                <RenderForm
                  key={index}
                  data={item}
                  formik={formik}
                  show={item.show!}
                />
              );
            })}
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
