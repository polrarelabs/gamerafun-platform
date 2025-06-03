"use client";

import { Text } from "@components/shared";
import { Stack } from "@mui/material";
import { palette } from "public/material";
import React, { memo, useEffect, useState } from "react";

interface ClockProps {
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
}

const Clock = ({ day = 0, hour = 0, minute = 0, second = 0 }: ClockProps) => {
  const totalSecondsInit = day * 86400 + hour * 3600 + minute * 60 + second;
  const [totalSeconds, setTotalSeconds] = useState(totalSecondsInit);

  useEffect(() => {
    setTotalSeconds(day * 86400 + hour * 3600 + minute * 60 + second);
  }, [hour, minute, second, day]);

  useEffect(() => {
    if (totalSeconds <= 0) return;
    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [totalSeconds]);

  // Sửa lại cách tính ngày, giờ, phút, giây
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return (
    <Stack direction={"row"} gap={1}>
      <Stack
        p={"6px 12px"}
        direction={"row"}
        alignItems={"center"}
        gap={1}
        sx={{
          background: palette.colorModalShare?.bgColor1,
          borderRadius: "4px",
          width: "fit-content",
        }}
      >
        <Text color="white" fontSize={"28px"}>
          {`${d.toString().padStart(2, "0")}`}
        </Text>
        <Text
          color={palette.colorReview?.textCopy}
          fontSize={"14px"}
          textTransform={"uppercase"}
        >
          days
        </Text>
      </Stack>
      <Stack
        p={"6px 12px"}
        direction={"row"}
        alignItems={"center"}
        gap={1}
        sx={{
          background: palette.colorModalShare?.bgColor1,
          borderRadius: "4px",
          width: "fit-content",
        }}
      >
        <Text color="white" fontSize={"28px"}>
          {`${h.toString().padStart(2, "0")}`}
        </Text>
        <Text color="white" fontSize={"28px"}>
          {`:`}
        </Text>
        <Text color="white" fontSize={"28px"}>
          {`${m.toString().padStart(2, "0")}`}
        </Text>

        <Text color="white" fontSize={"28px"}>
          {`:`}
        </Text>

        <Text color="white" fontSize={"28px"}>
          {`${s.toString().padStart(2, "0")}`}
        </Text>
      </Stack>
    </Stack>
  );
};

export default memo(Clock);

// 'use client'

// import React, { memo, useEffect } from 'react'

// interface ClockState {
//     second: number,
//     setSecond: React.Dispatch<React.SetStateAction<number>>,
//     minute: number,
//     setMinute: React.Dispatch<React.SetStateAction<number>>,
//     hour: number,
//     setHour: React.Dispatch<React.SetStateAction<number>>,
// }

// const Clock = ({
//     second, setSecond, minute, setMinute, hour, setHour
// }: ClockState) => {

//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (hour === 0 && minute === 0 && second === 0) {
//                 clearInterval(interval);
//                 return;
//             }
//             if (second > 0) {
//                 setSecond(prev => prev - 1);
//             } else {
//                 if (minute > 0) {
//                     setMinute(prev => prev - 1);
//                     setSecond(59);
//                 } else if (hour > 0) {
//                     setHour(prev => prev - 1);
//                     setMinute(59);
//                     setSecond(59);
//                 }
//             }
//         }, 1000);
//         return () => clearInterval(interval);
//     }, [second, minute, hour, setSecond, setMinute, setHour]);

//     return (
//         <div>
//             {`${hour.toString().padStart(2, '0')}:${minute
//                 .toString()
//                 .padStart(2, '0')}:${second.toString().padStart(2, '0')}`}
//         </div>
//     )
// }

// export default memo(Clock)

// 'use client'

// import React, { memo } from 'react'

// interface ClockState {
//     second: number,
//     setSecond: React.Dispatch<React.SetStateAction<number>>,
//     minute: number,
//     setMinute: React.Dispatch<React.SetStateAction<number>>,
//     hour: number,
//     setHour: React.Dispatch<React.SetStateAction<number>>,
// }

// const Clock = ({
//     second, setSecond, minute, setMinute, hour, setHour
// }: ClockState) => {

//     const interval = setInterval(() => {
//         if (second > 0) {
//             setSecond(pre => pre - 1)
//         }
//     }, 1000)

//     return (
//         <div>

//         </div>
//     )
// }

// export default memo(Clock)
