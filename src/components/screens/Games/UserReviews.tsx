import { AverageStar, Text } from "@components/shared";
import { Stack } from "@mui/material";
import { useGame } from "@store/game";
import { palette } from "public/material";
import { memo } from "react";
import CardReview from "./components/CardReview";

const UserReviews = () => {
  const { gameById } = useGame();
  return (
    <Stack direction={"column"} gap={4}>
      <Stack direction={"row"} gap={4} position={"relative"}>
        <Stack position={"relative"} justifyContent={"center"}>
          <AverageStar
            size={110}
            value={gameById.rating}
            isBg={false}
            color={true}
            fontSize={38}
            onReview={true}
          />
        </Stack>
        <Stack direction={"column"} justifyContent={"center"} flex={3}>
          <Text color="white" fontWeight={700} fontSize={"32px"}>
            {gameById && gameById.rates && gameById.rates.length} users rated
            this game
          </Text>
          <Text color={palette.colorTextGray} fontSize={"21px"}>
            Mostly positive reviews
          </Text>
        </Stack>
      </Stack>

      <Stack>
        {gameById &&
          gameById.rates &&
          gameById.rates.length > 0 &&
          gameById.rates.map((item, index) => {
            return <CardReview key={index} data={item} />;
          })}
      </Stack>
    </Stack>
  );
};

export default memo(UserReviews);
