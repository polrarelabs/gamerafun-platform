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
  ScheduleStatus,
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
import {
  FormCreateGameProps,
  PlatformLinkProps,
  ScheduleProps,
} from "@store/game/type";
import { PlatformLink } from "./components";

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
    getGame,
    // isCreate,
    setIsCreate,
    createGame,
    gameById,
    game,
    updateGame,
    getGameById,
  } = useGame();

  const [isDisable, setIdDisable] = useState<boolean>(true);

  const [listPlatform, setListPlatform] = useState<PlatformLinkProps[]>([]);

  const [media, setMedia] = useState<string[]>([]);

  // useEffect(() => {
  //   if (gameId && Object.keys(gameId).length > 0) {
  //     formik.resetForm({
  //       values: {
  //         gameId: gameId.id,
  //         name: gameId.name,
  //         description: gameId.description,
  //         status: gameId.status,
  //         website: gameId.website,
  //         downloadLinks: {
  //           windows: gameId?.downloadLink?.windows || "",
  //           macos: gameId?.downloadLink?.macos || "",
  //           android: gameId?.downloadLink?.android || "",
  //           ios: gameId?.downloadLink?.ios || "",
  //         },
  //         publisher: gameId.publisher || "",
  //         developer: gameId.developer || "",
  //         socials: {
  //           discord: gameId?.socials?.discord || "",
  //           telegram_chat: gameId?.socials?.telegram_chat || "",
  //           telegram_news: gameId?.socials?.telegram_news || "",
  //           linkedin: gameId?.socials?.linkedin || "",
  //           medium: gameId?.socials?.medium || "",
  //           twitter: gameId?.socials?.twitter || "",
  //           tiktok: gameId?.socials?.tiktok || "",
  //           youtube: gameId?.socials?.youtube || "",
  //         },
  //         schedule: {
  //           alpha: gameId?.schedule?.alpha || "",
  //           beta: gameId?.schedule?.beta || "",
  //           release: gameId?.schedule?.release || "",
  //         },
  //         support_os: gameId.support_os || [],
  //         platform: gameId.platform || [],
  //         genre: gameId.genre || [],
  //         chain: gameId.chain || [],
  //         media: gameId.media || [],
  //       },
  //     });
  //     setIdDisable(false);
  //   } else setIdDisable(true);
  // }, [gameId]);

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
    playableOnDestop: false,
    genreName: [],
    statusGame: "" as ScheduleStatus,
    discord: "",
    telegramChat: "",
    telegramnews: "",
    medium: "",
    twitter: "",
    youtube: "",
    contact_phone: "",
    contact_email: "",
    contact_name: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        // const supportOs: string[] = formik.values.support_os;
        // supportOs.forEach((item) => {
        //   const osKey = item.toLowerCase();
        //   if (osKey === "mac") {
        //     formik.values.downloadLinks.macos = DownloadLinks.macos;
        //   } else {
        //     formik.values.downloadLinks[osKey] = DownloadLinks[osKey];
        //   }
        // });

        for (let i = 0; i < dataListImage.length; i++) {
          const data = new FormData();
          data.append("file", dataListImage[i].file);
          data.append("name", dataListImage[i].file.name);
          data.append("description", dataListImage[i].file.type);
          await uploadGallery(data);
        }

        console.log("formik.values", formik.values);
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
      if (name === "create") createGame(formik.values);
      else updateGame(formik.values);

      // console.log('call api', media);
      // console.log('formik.values', formik.values);
      console.log("formik.values", formik.values);
    }
  }, [media]);

  // useEffect(() => {
  //   if (isCreate) {
  //     setIsCreate();
  //     // fetchGetGame();
  //     formik.resetForm();
  //   }
  // }, [isCreate]);

  const handleClick = (id: number) => {
    getGameById(id);
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
                  OptionEnum={game}
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
                <TextFieldFormik
                  label="Developer"
                  name="developer"
                  formik={formik}
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
            />
            <SelectFormik
              label={"Playable On Destop"}
              name={"playableOnDestop"}
              formik={formik}
              OptionEnum={PlayableOnDestop}
              isMultiple={false}
            />
            <SelectFormik
              label={"Status Game"}
              name={"statusGame"}
              formik={formik}
              OptionEnum={ScheduleStatus}
              isMultiple={false}
            />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <SelectFormik
              label={"Support Os"}
              name={"support_os"}
              formik={formik}
              OptionEnum={SupportOs}
            />
            <SelectFormik
              label={"Genre"}
              name={"genreName"}
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
          <Stack direction={"row"} gap={2}>
            <TextFieldFormik label="Discord" name="discord" formik={formik} />
            <TextFieldFormik
              label="Telegram Chat"
              name="telegramChat"
              formik={formik}
            />
            <TextFieldFormik
              label="Telegram News"
              name="telegramnews"
              formik={formik}
            />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <TextFieldFormik label="Medium" name="medium" formik={formik} />
            <TextFieldFormik label="Twitter" name="twitter" formik={formik} />
            <TextFieldFormik label="Youtube" name="youtube" formik={formik} />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <TextFieldFormik
              label="Contact Phone"
              name="contact_phone"
              formik={formik}
            />
            <TextFieldFormik
              label="Contact Email"
              name="contact_email"
              formik={formik}
            />
            <TextFieldFormik
              label="Contact Name"
              name="contact_name"
              formik={formik}
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

          {/* <PlatformLink
            data={listPlatform}
            setData={setListPlatform}
          /> */}

          {/* <InputEditor name="content" label="Content" formik={formik} /> */}
        </Stack>
        <Stack></Stack>

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

const Status = {
  "1": 1,
  "2": 2,
  "3": 3,
};

const PlayableOnDestop = {
  true: true,
  false: false,
};
