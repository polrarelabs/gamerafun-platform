/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Select, Text, TextField } from "@components/shared";
import { Option } from "@constant/types";
import { IconButton, Stack } from "@mui/material";
import { typography } from "public/material";
import React, { memo, useEffect, useMemo, useState } from "react";

type AnyItem = Record<string, any>;

interface FieldConfig {
  key: string;
  label: string;
  type?: "text" | "number";
  select?: boolean;
}

interface FormArraysProps<T extends AnyItem> {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  fields: FieldConfig[];
  itemFactory: () => T;
  label: string;
  OptionEnum?: any;
}

function FormArrays<T extends AnyItem>({
  data,
  setData,
  fields,
  itemFactory,
  label,
  OptionEnum,
}: FormArraysProps<T>) {
  const [dataFake, setDataFake] = useState<T[]>([]);

  const Options: Option[] = useMemo(() => {
    return Object.keys(OptionEnum ? OptionEnum : []).map((key) => ({
      label: key,
      value: OptionEnum[key],
    }));
  }, []);

  const handleClick = () => {
    setDataFake((prev) => [...prev, itemFactory()]);
  };
  const handleChangePlatform = (
    selected: string[],
    index: number,
    key: any,
  ) => {
    const arr = [...dataFake];
    (arr[index] as any)[key] = selected[0] || "";
    setDataFake(arr);
  };

  const handleDelete = (index: number) => {
    const arr = [...dataFake];
    arr.splice(index, 1);
    setDataFake(arr);
  };

  const handleChangeField = (
    index: number,
    key: string,
    value: string | number,
  ) => {
    const arr = [...dataFake];
    (arr[index] as any)[key] = value;
    setDataFake(arr);
  };

  useEffect(() => {
    if (dataFake !== data) {
      setData(dataFake);
    }
  }, [dataFake]);

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" gap={2} alignItems="center">
        <Text>{label}</Text>
        <Button
          variant="outlined"
          size="small"
          onClick={handleClick}
          sx={{
            borderRadius: "8px !important",
            width: "max-content",
            padding: "4px 8px",
          }}
        >
          +
        </Button>
      </Stack>

      {dataFake.length > 0 && (
        <Stack direction="column" gap={2}>
          <Stack direction="row" gap={2}>
            {fields.map((field) => (
              <Stack key={field.key} flex={1}>
                <Text>{field.label}</Text>
              </Stack>
            ))}
          </Stack>

          {dataFake.map((item, index) => (
            <Stack key={index} direction="row" gap={2}>
              {fields.map((field) => {
                if (field.select) {
                  return (
                    <Stack key={field.key} flex={1}>
                      <Select
                        value={item[field.key]}
                        onChange={(val) =>
                          handleChangePlatform(
                            val as string[],
                            index,
                            field.key,
                          )
                        }
                        options={Options}
                        placeholder=""
                        showPlaceholder
                        isFilter
                        // error={!item.platform}
                        // disabled={isDisable}
                      />
                    </Stack>
                  );
                } else
                  return (
                    <Stack key={field.key} flex={1}>
                      <TextField
                        fullWidth
                        type={field.type || "text"}
                        value={item[field.key]}
                        onChangeText={(value) =>
                          handleChangeField(
                            index,
                            field.key,
                            field.type === "number"
                              ? Number(value ?? 0)
                              : (value ?? ""),
                          )
                        }
                        sx={{
                          ...typography.subtitle2,
                          height: "50px",
                          bgcolor: "background.paper",
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: "transparent",
                          "&:hover": { borderColor: "grey.400" },
                          "&:focus-within": { borderColor: "primary.main" },
                        }}
                      />
                    </Stack>
                  );
              })}
              <IconButton
                sx={{ height: 30, width: 30 }}
                onClick={() => handleDelete(index)}
              >
                -
              </IconButton>
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default memo(FormArrays) as typeof FormArrays;

// 'use client'

// import { Button, Text, TextField } from '@components/shared'
// import { IconButton, Stack } from '@mui/material'
// import { MissionCreationItems } from '@store/quests/type'
// import { typography } from "public/material"
// import React, { memo, useEffect, useState } from 'react'

// interface FormArraysState {
//     data: MissionCreationItems[],
//     setData: React.Dispatch<React.SetStateAction<MissionCreationItems[]>>
// }

// const FormArrays = ({
//     data,
//     setData
// }: FormArraysState) => {

//     const [dataFake, setDataFake] = useState<MissionCreationItems[]>([]);

//     const handleClick = () => {
//         setDataFake((prev) => [...prev, { name: "", type: "", target: 0 }]);
//     };
//     const handleDelete = (index: number) => {
//         const arr = [...dataFake];
//         arr.splice(index, 1);
//         setDataFake(arr);
//     };

//     const handleChangePath = (
//         event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//         index: number,
//         item: string
//     ) => {
//         const arr = [...dataFake];
//         (arr[index] as any)[item] = event.target.value;
//         setDataFake(arr);
//     };

//     useEffect(() => {
//         if (dataFake !== data) {
//             setData(dataFake)
//         }
//     }, [dataFake])

//     return <Stack direction="column" gap={2}>
//         <Stack direction="row" gap={2} flex={1} alignItems="center">
//             <Text>Missions</Text>
//             <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={handleClick}
//                 sx={{
//                     borderRadius: "8px !important",
//                     width: "max-content",
//                     padding: "4px 8px",
//                 }}
//             >
//                 +
//             </Button>

//         </Stack>
//         {dataFake.length > 0 && (
//             <Stack width="100%" direction="column" gap={2}>
//                 <Stack direction="row" gap={2} width="100%">
//                     <Stack flex={1}>
//                         <Text>Name</Text>
//                     </Stack>
//                     <Stack flex={1}>
//                         <Text>Type</Text>
//                     </Stack>
//                     <Stack flex={1}>
//                         <Text>Target</Text>
//                     </Stack>
//                 </Stack>

//                 {dataFake.map((item, index) => (
//                     <Stack key={index} direction="row" width="100%" gap={2}>
//                         <Stack flex={1} direction="row" gap={2} alignItems="center">
//                             <TextField
//                                 fullWidth
//                                 value={item.name}
//                                 onChangeText={(newValue) => {
//                                     handleChangePath(
//                                         {
//                                             target: { value: newValue ?? "" },
//                                         } as React.ChangeEvent<HTMLInputElement>,
//                                         index,
//                                         'name'
//                                     );
//                                 }}
//                                 sx={{
//                                     ...typography.subtitle2,
//                                     height: "50px",
//                                     bgcolor: "background.paper",
//                                     borderRadius: 2,
//                                     border: "1px solid",
//                                     borderColor: "transparent",
//                                     "&:hover": {
//                                         borderColor: "grey.400",
//                                     },
//                                     "&:focus-within": {
//                                         borderColor: "primary.main",
//                                     },
//                                 }}
//                             />
//                         </Stack>

//                         <Stack flex={1} direction="row" gap={2} alignItems="center">
//                             <TextField
//                                 fullWidth
//                                 value={item.type}
//                                 onChangeText={(newValue) => {
//                                     handleChangePath(
//                                         {
//                                             target: { value: newValue ?? "" },
//                                         } as React.ChangeEvent<HTMLInputElement>,
//                                         index,
//                                         'type'
//                                     );
//                                 }}
//                                 sx={{
//                                     ...typography.subtitle2,
//                                     height: "50px",
//                                     bgcolor: "background.paper",
//                                     borderRadius: 2,
//                                     border: "1px solid",
//                                     borderColor: "transparent",
//                                     "&:hover": {
//                                         borderColor: "grey.400",
//                                     },
//                                     "&:focus-within": {
//                                         borderColor: "primary.main",
//                                     },
//                                 }}
//                             />
//                         </Stack>

//                         <Stack flex={1} direction="row" gap={2} alignItems="center">
//                             <TextField
//                                 fullWidth
//                                 value={item.target}
//                                 onChangeText={(newValue) => {
//                                     handleChangePath(
//                                         {
//                                             target: { value: newValue ?? "" },
//                                         } as React.ChangeEvent<HTMLInputElement>,
//                                         index,
//                                         'target'
//                                     );
//                                 }}
//                                 sx={{
//                                     ...typography.subtitle2,
//                                     height: "50px",
//                                     bgcolor: "background.paper",
//                                     borderRadius: 2,
//                                     border: "1px solid",
//                                     borderColor: "transparent",
//                                     px: 1.5,
//                                     py: 1.1875,
//                                     "&:hover": {
//                                         borderColor: "grey.400",
//                                     },
//                                     "&:focus-within": {
//                                         borderColor: "primary.main",
//                                     },
//                                 }}
//                             />
//                             <IconButton
//                                 sx={{ height: 30, width: 30 }}
//                                 onClick={() => handleDelete(index)}
//                             >
//                                 -
//                             </IconButton>
//                         </Stack>

//                     </Stack>
//                 ))}
//             </Stack>
//         )}
//     </Stack>
// }

// export default memo(FormArrays)
