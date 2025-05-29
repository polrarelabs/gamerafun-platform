import { Text } from "@components/shared";
import { thumbColor } from "@components/shared/helper";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { palette } from "public/material";
import React, { memo } from "react";
import { BsFillHexagonFill } from "react-icons/bs";

const UserReviews = () => {
  const { gameById } = useGame();
  return (
    <Stack direction={"column"} gap={4}>
      <Stack direction={"row"} gap={4}>
        <Stack position={"relative"}>
          <BsFillHexagonFill
            size={110}
            style={{
              color: thumbColor(gameById.rating, 0.2),
            }}
          />
          <Text
            color={thumbColor(gameById.rating)}
            position={"absolute"}
            left={"50%"}
            top={"50%"}
            sx={{
              translate: "-50% -50%",
              zIndex: 1,
            }}
            fontSize={"38px"}
            fontWeight={700}
          >
            {gameById.rating}
          </Text>
        </Stack>
        <Stack direction={"column"} justifyContent={"center"}>
          <Text color="white" fontWeight={700} fontSize={"32px"}>
            {gameById && gameById.rates && gameById.rates.length} users rated
            this game
          </Text>
          <Text color={palette.colorTextGray} fontSize={"21px"}>
            Mostly positive reviews
          </Text>
        </Stack>
      </Stack>
      <Stack></Stack>
    </Stack>
  );
};

export default memo(UserReviews);
