"use client";

import { Button } from "@components/shared";
import DatePickerFormik from "@components/shared/DatePickerFormik";
import SelectFormik from "@components/shared/SelectFormik";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { Genre, ScheduleStatus, SupportChain, SupportOs } from "@constant/enum";
import { FormControl, FormHelperText, Stack } from "@mui/material";

import { SCREEN_PX } from "@constant";
import { useGame } from "@store/game";
import { FormCreateGameProps, PlatformLinkProps } from "@store/game/type";
import { useGallery } from "@store/media";
import { useFormik } from "formik";
import { memo, useEffect, useState } from "react";
import { PlatformLink } from "./components";
import {
  ANDROID_URL,
  IOS_URL,
  MACOS_URL,
  validationSchema,
  WINDOW_URL,
} from "./helper";
import UploadAvarta, { PropsInfo } from "./UploadAvatar";

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

  useEffect(() => {
    if (gameById && Object.keys(gameById).length > 0) {
      formik.resetForm({
        values: {
          id: gameById.id,
          name: gameById.name,
          description: gameById.description,
          status: gameById.status,
          website: gameById.website,
          publisher: gameById.publisher,
          developer: gameById.developer,
          schedule: {
            alpha: gameById.schedule.alpha,
            beta: gameById.schedule.beta,
            release: gameById.schedule.release,
          },
          support_os: gameById.support_os,
          chain: gameById.chain,
          platformLink: gameById.platformLink,
          mediaUrl: gameById.mediaUrl,
          playableOnDestop: gameById.playableOnDestop,
          genreName: gameById.genreName,
          statusGame: gameById.statusGame,
          discord: gameById.discord,
          telegramChat: gameById.telegramChat,
          telegramNews: gameById.telegramNews,
          medium: gameById.medium,
          twitter: gameById.twitter,
          youtube: gameById.youtube,
          contactPhone: gameById.contactPhone,
          contactEmail: gameById.contactEmail,
          contactName: gameById.contactName,
        },
      });
      setIdDisable(false);
    } else setIdDisable(true);
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
    playableOnDestop: false,
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

        formik.values.platformLink = listPlatform;

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
                  name={"id"}
                  formik={formik}
                  OptionEnum={game.items}
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
              name="telegramNews"
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
              name="contactPhone"
              formik={formik}
            />
            <TextFieldFormik
              label="Contact Email"
              name="contactEmail"
              formik={formik}
            />
            <TextFieldFormik
              label="Contact Name"
              name="contactName"
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
