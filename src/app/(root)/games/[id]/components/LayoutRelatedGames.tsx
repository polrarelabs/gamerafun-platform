import { Stack } from "@mui/material";
import { useGame, useGetGameId } from "@store/game";
import GetIcon from "../../components/GetIcon";
import { Image, Text } from "@components/shared";
import img from "public/images/img-logo.png";
import { useEffect, useState } from "react";

const LayoutRelatedGames = () => {
  const { data, fetchGetGame } = useGame();
  const { data: dataGameById } = useGetGameId();
  const [hover, setHover] = useState<boolean>(false);
  useEffect(() => {
    if (dataGameById?.genre && dataGameById.genre.length > 0) {
      fetchGetGame({ genre: dataGameById.genre });
    }
  }, []);
  return (
    <>
      {data?.map((item, index) => {
        return (
          <Stack
            key={index}
            position={"relative"}
            p={"6px"}
            borderRadius={"16px"}
            bgcolor={"#2456"}
            gap={2}
            border={"1px solid rgba(156, 163, 175, 0.39)"}
            sx={{
              transition: "translate 0.2s ease-in-out",
              "&:hover": {
                translate: "0 -6px",
                cursor: "pointer",
              },
            }}
            direction={"row"}
            justifyContent={"space-between"}
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
          >
            <Stack direction={"column"} gap={2}>
              <Stack>
                <Image
                  src={item.media[0] ? item.media[0].url : img}
                  alt={`img-${img}`}
                  size="100%"
                  aspectRatio={3 / 2}
                  sizes="960px"
                  containerProps={{
                    sx: {
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      borderRadius: "16px",

                      border: "1px",
                      borderColor:
                        "linear-gradient(180deg,rgba(189, 189, 189, 1) 0%, rgba(87, 87, 87, 0.5) 100%)",
                      "& img": {
                        objectFit: "cover",
                        objectPosition: "center",
                        transition: "all 0.5s ease-in-out",
                      },
                    },
                  }}
                />
              </Stack>
              <Stack py="0.5rem" gap={1}>
                <Text
                  fontSize={"18px"}
                  color="white"
                  textAlign={"center"}
                  fontWeight={700}
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 1,
                  }}
                >
                  {item.name}
                </Text>
                <Text color="#9CA3AF" fontSize={"12px"} textAlign={"center"}>
                  {item.description ? item.description : "description"}
                </Text>
                <GetIcon array={item.support_os} />
              </Stack>
            </Stack>

            <Stack
              bgcolor={"#4B556380"}
              py="2px"
              sx={{
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
              }}
            >
              <Text color="#D1D5D8" fontSize={"12px"} textAlign={"center"}>
                Title
              </Text>
            </Stack>
          </Stack>
        );
      })}
    </>
  );
};

export default LayoutRelatedGames;
