/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import DatePickerFormik from "@components/shared/DatePickerFormik";
import SelectFormik from "@components/shared/SelectFormik";
import TextFieldFormik from "@components/shared/TextFieldFormik";
import { ModeQuest, TypeQuest } from "@constant/enum";
import { Stack } from "@mui/material";
import {
  MissionCreationItems,
  QuestCreationRequest,
  RewardCreationItems,
} from "@store/quests/type";
import { useFormik } from "formik";
import { memo, useEffect, useState } from "react";
import { FormArrays } from "./components";
import { Button, Snackbared, Text } from "@components/shared";
import { SCREEN_PX } from "@constant";
import { useQuest } from "@store/quests";
import { QUESTS_PATH } from "@constant/paths";

const CreateQuest = () => {
  const { createQuest, isCreate, setCreate, error } = useQuest();

  const [openSnack, setOpenSnack] = useState<boolean>(false);

  const [missions, setMissions] = useState<MissionCreationItems[]>([]);
  const [rewards, setRewards] = useState<RewardCreationItems[]>([]);

  const initialValues: QuestCreationRequest = {
    name: "",
    description: "",
    status: 0,
    mode: "" as ModeQuest,
    missions: [],
    rewards: [],
    startTime: "",
    endTime: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      formik.values.missions = missions;
      formik.values.rewards = rewards;
      createQuest(values);
    },
  });

  useEffect(() => {
    if (isCreate) {
      setOpenSnack(true);
      formik.resetForm();
      setCreate();
    }
  }, [isCreate]);

  return (
    <Stack px={SCREEN_PX} gap={2}>
      <Text fontSize={"32px"} fontWeight={700}>
        Create Quest
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={2}>
          <Stack direction={"row"} gap={2}>
            <TextFieldFormik name="name" label="Name" formik={formik} />
            <TextFieldFormik
              name="description"
              label="Description"
              formik={formik}
            />
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
              name="mode"
              label="Mode"
              formik={formik}
              OptionEnum={ModeQuest}
              isMultiple={false}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <DatePickerFormik
              formik={formik}
              label="Start Time"
              name="startTime"
              scheduleError={
                formik.touched.startTime &&
                typeof formik.errors.startTime === "string"
              }
            />
            <DatePickerFormik
              formik={formik}
              label="End Time"
              name="endTime"
              scheduleError={
                formik.touched.endTime &&
                typeof formik.errors.endTime === "string"
              }
            />
          </Stack>
          <FormArrays<MissionCreationItems>
            label="Missions"
            data={missions}
            setData={setMissions}
            itemFactory={() => ({ name: "", type: "", target: 0 })}
            fields={[
              { key: "name", label: "Name" },
              { key: "type", label: "Type", select: true },
              { key: "target", label: "Target", type: "number" },
            ]}
            OptionEnum={TypeQuest}
          />

          <FormArrays<RewardCreationItems>
            label="Rewards"
            data={rewards}
            setData={setRewards}
            itemFactory={() => ({ type: "", amount: 0 })}
            fields={[
              { key: "type", label: "Type" },
              { key: "amount", label: "Amount", type: "number" },
            ]}
          />
        </Stack>

        <Stack direction={"row"} mt={4} justifyContent={"end"} gap={2}>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
      <Snackbared
        path={QUESTS_PATH}
        open={openSnack}
        setOpen={setOpenSnack}
        message={error ? "Error" : "Success"}
        status={error ? "error" : "success"}
      />
    </Stack>
  );
};

export default memo(CreateQuest);

const Status = {
  "1": 1,
  "2": 2,
  "3": 3,
};
